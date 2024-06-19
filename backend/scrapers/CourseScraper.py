from bs4 import BeautifulSoup
from dotenv import load_dotenv
import os
from pathlib import Path
from requests_html import HTMLSession

from supabase import create_client

load_dotenv(dotenv_path=Path(__file__).resolve().parent.parent / ".env")

try:
    supabase_url = os.environ.get("SUPABASE_URL")
    supabase_key = os.environ.get("SUPABASE_KEY")
    supabase = create_client(supabase_url, supabase_key)
except:
    print("failed to connect to Supabase")

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
            courses = course_feed.find_all("li")
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

    print(f"finished scraping {subject} course info")
    return subject_course_info


def get_data(course, subject):
    # gets the text of the course
    info = course.text.replace("\t", "").split("\n")
    info = [i for i in info if i != ""]

    if len(info) != 1:
        try:
            # scrapes course entry value
            entry = info[0].split(":")[0].replace(" ", "")

            # scrapes course identifier value
            identifier = info[0].split(":")[0][-6:].replace(" ", "")

            # scrapes course name
            name = info[0].split(":")[1][1:]

            # scrapes course prereqs (if existing) and course content values
            if len(info) == 3:
                prereqs = info[1]
                content = info[2]
            else:
                prereqs = ""
                content = info[1]
            content = content.split("  BU Hub   Learn More ")[0]

            # creates json formatted object for course
            course_info = {
                "code": identifier.strip(),
                "subject": subject,
                "name": name.strip(),
                "prereqs": prereqs.strip(),
                "content": content.strip(),
                "level": "undergrad" if int(identifier.strip()[-3:]) < 500 else "grad",
            }

            return course_info
        except:
            print(f"error scraping {course}")


def delete_course_info_in_database():
    try:
        supabase.table("course-info").delete().gt("id", -1).execute()
        print("successfully deleted course info in database")
    except Exception as e:
        print("failed to delete course info in database", e)


def insert_course_info_in_database(course_info):
    try:
        supabase.table("course-info").insert(course_info).execute()
        print("successfully inserted course info in database")
    except Exception as e:
        print("failed to insert course info in database: ", e)


def scrape(subject):
    subject_course_info = get_course_info(subject)
    return subject_course_info


def main():
    course_info = []
    try:
        for subject in course_urls.keys():
            subject_course_info = scrape(subject)
            course_info.extend(subject_course_info)
    except Exception as e:
        print("error scraping course info", e)
    course_info = [{**course, "id": index} for index, course in enumerate(course_info)]
    delete_course_info_in_database()
    insert_course_info_in_database(course_info)


if __name__ == "__main__":
    main()
