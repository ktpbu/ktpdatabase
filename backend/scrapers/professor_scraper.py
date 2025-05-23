import argparse
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import json
import os
import pandas as pd
from pathlib import Path
from requests_html import HTMLSession
from supabase import create_client

load_dotenv(dotenv_path=Path(__file__).resolve().parent.parent / ".env")


# defines the source urls to scrape for each subject
professor_urls = {
    "computer-science": "https://www.bu.edu/cs/people/faculty/",
    "data-science": "https://www.bu.edu/cds-faculty/culture-community/faculty/",
    "economics": "https://www.bu.edu/econ/people/faculty/",
    "engineering": "https://www.bu.edu/eng/academics/departments-and-divisions/biomedical-engineering/people/?affiliation=primary-affiliated-faculty&layout=list&num=1",
    "mathematics-statistics": "https://www.bu.edu/math/people/faculty/",
}


def get_professor_info(subject):

    session = HTMLSession()
    url = professor_urls[subject]
    page = session.get(url)
    soup = BeautifulSoup(page.html.raw_html, "html.parser")

    # scrapes professors based on the subject
    if subject == "computer-science" or subject == "data-science":
        subject_professor_info = [
            professor.text
            for professor in soup.find_all(
                "h6", {"class": "profile-name profile-name-advanced"}
            )
        ]
    elif subject == "economics" or subject == "mathematics-statistics":
        subject_professor_info = [
            professor.text
            for professor in soup.find_all(
                "h6", {"class": "profile-name profile-name-basic"}
            )
        ]
    elif subject == "engineering":
        # gets the last page number to scrape
        pages = [num for num in soup.find_all("a", {"class": "page-numbers button"})]
        last_page = int(pages[-1].text.strip())

        # scrapes the professors on an individual page
        def fetch_professor_page(page_number):
            with session.get(f"{url[:-1]}{page_number}") as page:
                soup = BeautifulSoup(page.html.raw_html, "html.parser")
                page_professors = [
                    professor.text.strip()
                    for professor in soup.find_all(
                        "h4", {"class": "bu-filtering-result-item-title"}
                    )
                ]
                page_professors = [
                    professor.split(",")[0] for professor in page_professors
                ]

                return page_professors

        subject_professor_info = []
        page_number = 1

        # scrapes all relevant pages
        while page_number <= last_page:
            subject_professor_info.extend(fetch_professor_page(page_number))
            page_number += 1

    # sorts professors alphabetically by last name
    subject_professor_info = sorted(subject_professor_info, key=lambda x: x.split()[-1])

    # creates professor - subject objects
    subject_professor_info = [
        {"name": professor, "subject": subject} for professor in subject_professor_info
    ]

    # updates local data store with professor info
    if not os.path.exists("data/professors"):
        os.makedirs("data/professors")
    with open(f"data/professors/{subject}_prof_info.json", "w") as f:
        json.dump(subject_professor_info, f, indent=4, ensure_ascii=False)

    print(f"Finished scraping {subject} professors")

    return subject_professor_info


def delete_professor_info_in_supabase(supabase):

    # deletes existing professor info in database
    try:
        supabase.table("professor_info").delete().gt("id", -1).execute()
        print("Successfully deleted professor info in supabase")
    except Exception as e:
        print("Failed to delete professor info in supabase: ", e)


def insert_professor_info_in_supabase(supabase, professors):

    # inserts professor info in supabase
    try:
        supabase.table("professor_info").insert(professors).execute()
        print("Successfully inserted professor info in supabase")
    except Exception as e:
        print("Failed to insert professor info in supabase: ", e)


def main(update=False):

    # scrapes professor info
    professor_info = []
    try:
        for subject in professor_urls.keys():
            subject_professor_info = get_professor_info(subject)
            professor_info.extend(subject_professor_info)
    except Exception as e:
        raise Exception("Error scraping professor info: ", e)

    professor_info = [{**professor} for professor in professor_info]
    for index, professor in enumerate(professor_info):
        professor["id"] = index

    # saves course info as a local csv file for testing and observation
    try:
        if not os.path.exists("./data"):
            os.makedirs("./data")
        df = pd.DataFrame(professor_info)
        df.to_csv("./data/professor_info.csv")
        print(f"Professor info saved at ./data/professor_info.csv")
    except Exception as e:
        print(f"Failed to saved professor info as csv:", e)
        raise e

    # updates course info in supabase if necessary
    if update:
        try:
            supabase_url = os.environ.get("SUPABASE_URL")
            supabase_key = os.environ.get("SUPABASE_KEY")
            supabase = create_client(supabase_url, supabase_key)
            print("Connected to supabase")
        except Exception as e:
            print("Failed to connect to supabase: ", e)

        delete_professor_info_in_supabase(supabase)
        insert_professor_info_in_supabase(supabase, professor_info)
    else:
        print("Did not update professor info in supabase")


def single_subject_test():

    try:
        get_professor_info("eng-core")
    except Exception as e:
        print("Error scraping course info: ", e)


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
