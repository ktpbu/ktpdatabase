import argparse
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import json
import os
import pandas as pd
from pathlib import Path
import re
from requests_html import HTMLSession

from supabase import create_client

load_dotenv(dotenv_path=Path(__file__).resolve().parent.parent / ".env")


# NOTE
"""
I PURPOSELY DID NOT IMPLEMENT ASYNCHRONOUS PROGRAMMING 
OR MULTITHREADING TO PRESERVE THE ORDER OF THE COURSES 
"""


# defines the source urls to scrape for each subject
course_urls = {
    "biomedical-eng": "https://www.bu.edu/academics/eng/courses/biomedical-engineering/",
    "computer-science": "https://www.bu.edu/academics/cas/courses/computer-science/",
    "data-science": "https://www.bu.edu/academics/cds/courses/",
    "economics": "https://www.bu.edu/academics/cas/courses/economics/",
    "electrical-computer-eng": "https://www.bu.edu/academics/eng/courses/electrical-computer-engineering/",
    "eng-core": "https://www.bu.edu/academics/eng/courses/engineering-core/",
    "mathematics-statistics": "https://www.bu.edu/academics/cas/courses/mathematics-statistics/",
    "mechanical-eng": "https://www.bu.edu/academics/eng/courses/mechanical-engineering/",
}


def get_course_info(subject):
    url = course_urls[subject]

    # gets the last page number to scrape
    session = HTMLSession()
    first_page = session.get(url)
    soup = BeautifulSoup(first_page.html.raw_html, "html.parser")
    pagination = soup.find("div", {"class": "pagination"})
    pages = pagination.find_all("span")
    last_page = int(pages[-1].text)

    # scrapes the courses on an individual page
    def fetch_course_page(page_number):
        with session.get(f"{url}/{page_number}") as page:
            soup = BeautifulSoup(page.html.raw_html, "html.parser")
            course_feed = soup.find("ul", {"class": "course-feed"})
            courses = course_feed.find_all("li", recursive=False)
            data = [get_data(course, subject) for course in courses]
            data = [item for item in data if item]
            return data

    subject_course_info = []
    page_number = 1

    # scrapes all relevant pages
    while page_number <= last_page:
        page_data = fetch_course_page(page_number)
        subject_course_info.extend(page_data)
        page_number += 1

    if not subject_course_info:
        raise Exception(f"failed to scrape {url}")

    # updates local data store with course info
    if not os.path.exists("data/courses"):
        os.makedirs("data/courses")
    with open(f"data/courses/{subject}_course_info.json", "w") as f:
        json.dump(subject_course_info, f, indent=4, ensure_ascii=False)

    print(f"finished scraping {subject} course info")

    return subject_course_info


def get_data(course, subject):

    try:
        # scrapes course code and name
        identifier = course.find("strong").text.split(": ")
        code = identifier[0][-6:].replace(" ", "")
        if len(identifier) == 2:
            name = identifier[1]
        else:
            # special case found in names like ENGEC417
            name = ": ".join(identifier[1:])

        undergrad_prereqs = ""
        undergrad_coreqs = ""
        grad_prereqs = ""
        grad_coreqs = ""

        if subject == "data-science":
            # scrapes requisite courses
            reqs = course.find_all("span", recursive=False)
            for req in reqs:
                if req.text.startswith("Undergraduate Prerequisites"):
                    undergrad_prereqs = req.text.split(": ")[1]
                elif req.text.startswith("Undergraduate Corequisites"):
                    undergrad_coreqs = req.text.split(": ")[1]
                elif req.text.startswith("Graduate Prerequisites"):
                    grad_prereqs = req.text.split(": ")[1]
                elif req.text.startswith("Graduate Corequisites"):
                    grad_coreqs = req.text.split(": ")[1]

            # scrapes course description
            description = "".join(
                re.sub(" +", " ", str(item).replace("\t", "").strip())
                for item in course.contents
                if isinstance(item, str)
            )

        # cs, econ, bme
        else:
            # special content case for ENGME304
            if subject == "mechanical-eng" and code == "ME304":
                content = "".join(
                    re.sub(" +", " ", str(item).replace("\t", "").strip())
                    for item in course.contents
                    if isinstance(item, str)
                ).split(" -")
            else:
                content = "".join(
                    re.sub(" +", " ", str(item).replace("\t", "").strip())
                    for item in course.contents
                    if isinstance(item, str)
                ).split(" - ")

            # scrapes requisite courses
            description = ""
            reqs = content[:-1]

            # special requisite cases for engineering
            if (
                subject == "biomedical-eng"
                and code in set(["BE493"])
                or subject == "electrical-computer-eng"
                and code in set(["EC521", "EC565", "EC578", "EC591", "EC719"])
                or subject == "eng-core"
                and code in set(["EK335", "EK408"])
                or subject == "mechanical-eng"
                and code == "ME360"
            ):
                reqs = reqs[0].split(" ; ")

            # special requisite case for ENGME304
            if subject == "mechanical-eng" and code == "ME304":
                reqs = reqs[0].split(";")
                reqs = [req.strip() for req in reqs]

            # special requisite case for ENGEK301
            if subject == "eng-core" and code == "EK301":
                undergrad_prereqs = "(CASPY211)"
                undergrad_coreqs = "(CASMA225) ENGEK122/EK125"
                grad_prereqs = "(METPY211 OR CASPY251)"
                grad_coreqs = "(METMA225)"
            else:
                for req in reqs:
                    if req.startswith("Undergraduate Prerequisites"):
                        # special requisite case for CASMA242
                        if subject == "mathematics-statistics" and code == "MA242":
                            undergrad_prereqs = req.split(
                                "Undergraduate Prerequisites "
                            )[1]
                        else:
                            undergrad_prereqs = req.split(": ")[1]
                    elif req.startswith("Undergraduate Corequisites"):
                        undergrad_coreqs = req.split(": ")[1]
                    elif req.startswith("Graduate Prerequisites"):
                        grad_prereqs = req.split(": ")[1]
                    elif req.startswith("Graduate Corequisites"):
                        grad_coreqs = req.split(": ")[1]
                    # special case found in descriptions like ENGEC522
                    else:
                        description = description + req + " - "

            # scrapes course description
            description = description + content[-1]

        # creates json formatted object for course
        course_info = {
            "code": code,
            "subject": subject,
            "name": name,
            "undergrad_prereqs": undergrad_prereqs,
            "undergrad_coreqs": undergrad_coreqs,
            "grad_prereqs": grad_prereqs,
            "grad_coreqs": grad_coreqs,
            "description": description,
            "level": "undergrad" if int(code[-3:]) < 500 else "grad",
        }

        return course_info
    except Exception as e:
        print(f"error scraping {course}: ", e)


def delete_course_info_in_supabase(supabase):

    # deletes course info in supabase
    try:
        supabase.table("course_info").delete().gt("id", -1).execute()
        print("successfully deleted course info in supabase")
    except Exception as e:
        print("failed to delete course info in supabase: ", e)


def insert_course_info_in_supabase(supabase, course_info):

    # inserts course info in supabase
    try:
        supabase.table("course_info").insert(course_info).execute()
        print("successfully inserted course info in supabase")
    except Exception as e:
        print("failed to insert course info in supabase: ", e)


def main(update=False):

    # scrapes course info
    course_info = []
    try:
        for subject in course_urls.keys():
            subject_course_info = get_course_info(subject)
            course_info.extend(subject_course_info)
    except Exception as e:
        print("error scraping course info: ", e)

    course_info = [{**course} for course in course_info]

    # saves course info as a local csv file for testing and observation
    try:
        if not os.path.exists("./data"):
            os.makedirs("./data")
        df = pd.DataFrame(course_info)
        df.to_csv("./data/course_info.csv")
        print(f"course info saved at ./data/course_info.csv")
    except Exception as e:
        print(f"failed to saved course info as csv:", e)

    # updates course info in supabase if necessary
    if update:
        try:
            supabase_url = os.environ.get("SUPABASE_URL")
            supabase_key = os.environ.get("SUPABASE_KEY")
            supabase = create_client(supabase_url, supabase_key)
            print("connected to supabase")
        except Exception as e:
            print("failed to connect to supabase: ", e)

        delete_course_info_in_supabase(supabase)
        insert_course_info_in_supabase(supabase, course_info)
    else:
        print("\ndid not update course info in supabase")


def single_subject_test():

    try:
        get_course_info("eng-core")
    except Exception as e:
        print("error scraping course info: ", e)


if __name__ == "__main__":

    parser = argparse.ArgumentParser(description="course scraper script")
    parser.add_argument(
        "--update",
        action="store_true",
        help="Updates the course info in supabase",
    )

    args = parser.parse_args()

    if args.update:
        update = True
    else:
        update = False

    main(update)
