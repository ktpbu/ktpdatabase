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

# defines the source urls to scrape for each subject
prof_urls = {
    "computer-science": "https://www.bu.edu/cs/people/faculty/",
    "data-science": "https://www.bu.edu/cds-faculty/culture-community/faculty/",
    "economics": "https://www.bu.edu/econ/people/faculty/",
    "engineering": "https://www.bu.edu/eng/academics/departments-and-divisions/biomedical-engineering/people/?affiliation=primary-affiliated-faculty&layout=list&num=1",
    "mathematics-statistics": "https://www.bu.edu/math/people/faculty/",
}


def get_profs(subject):
    session = HTMLSession()
    url = prof_urls[subject]
    page = session.get(url)
    soup = BeautifulSoup(page.html.raw_html, "html.parser")

    # scrapes professors based on the subject
    if subject == "computer-science" or subject == "data-science":
        subject_profs = [
            prof.text
            for prof in soup.find_all(
                "h6", {"class": "profile-name profile-name-advanced"}
            )
        ]
    elif subject == "economics" or subject == "mathematics-statistics":
        subject_profs = [
            prof.text
            for prof in soup.find_all(
                "h6", {"class": "profile-name profile-name-basic"}
            )
        ]
    elif subject == "engineering":
        # gets the last page number to scrape
        pages = [num for num in soup.find_all("a", {"class": "page-numbers button"})]
        last_page = int(pages[-1].text.strip())

        # scrapes the professors on an individual page
        def fetch_prof_page(page_number):
            with session.get(f"{url[:-1]}{page_number}") as page:
                soup = BeautifulSoup(page.html.raw_html, "html.parser")
                page_profs = [
                    prof.text.strip()
                    for prof in soup.find_all(
                        "h4", {"class": "bu-filtering-result-item-title"}
                    )
                ]
                page_profs = [prof.split(",")[0] for prof in page_profs]
                return page_profs

        subject_profs = []
        page_number = 1

        # scrapes all relevant pages
        while page_number <= last_page:
            subject_profs.extend(fetch_prof_page(page_number))
            page_number += 1

    # sorts professors alphabetically by last name
    subject_profs = sorted(subject_profs, key=lambda x: x.split()[-1])

    # creates professor - subject objects
    subject_profs = [{"name": prof, "subject": subject} for prof in subject_profs]

    print(f"finished scraping {subject} professors")
    return subject_profs


def scrape(subject):
    subject_profs = get_profs(subject)
    return subject_profs


def delete_professors_in_database():
    try:
        supabase.table("professors").delete().gt("id", -1).execute()
        print("successfully deleted professors in database")
    except Exception as e:
        print("failed to delete professors in database", e)


def insert_professors_in_database(profs):
    try:
        supabase.table("professors").insert(profs).execute()
        print("successfully inserted professors in database")
    except Exception as e:
        print("failed to insert professors in database: ", e)


def main():
    profs = []
    try:
        for subject in prof_urls.keys():
            subject_profs = scrape(subject)
            profs.extend(subject_profs)
    except Exception as e:
        raise Exception("issue scraping professors", e)
    profs = [{**prof, "id": index} for index, prof in enumerate(profs)]
    delete_professors_in_database()
    insert_professors_in_database(profs)


if __name__ == "__main__":
    main()
