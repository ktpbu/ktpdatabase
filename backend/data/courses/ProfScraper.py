from bs4 import BeautifulSoup
import os
import json
from requests_html import HTMLSession

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
        profs = [
            prof.text
            for prof in soup.find_all(
                "h6", {"class": "profile-name profile-name-advanced"}
            )
        ]
    elif subject == "economics" or subject == "mathematics-statistics":
        profs = [
            prof.text
            for prof in soup.find_all(
                "h6", {"class": "profile-name profile-name-basic"}
            )
        ]
    elif subject == "engineering":
        # gets the last page number to scrape
        pages = [num for num in soup.find_all("a", {"class": "page-numbers button"})]
        last_page = int(pages[-1].text.strip())

        # scrapes the courses on an individual page
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

        profs = []
        page_number = 1

        # scrapes all relevant pages
        while page_number <= last_page:
            profs.extend(fetch_prof_page(page_number))
            page_number += 1

    # sorts professors alphabetically by last name
    profs = sorted(profs, key=lambda x: x.split()[-1])
    print(f"finished scraping {subject} professors")
    return profs


def create_json(profs, subject):
    location = "./backend/data/courses/professors"

    # ensures relevant directories exist to store json output
    if not os.path.exists(location):
        os.makedirs(location)

    # creates json files containing professors for the subject
    with open(f"{location}/{subject}-professors.json", "w") as f:
        json.dump(profs, f, indent=4, ensure_ascii=False)


def scrape(subject):
    profs = get_profs(subject)
    create_json(profs, subject)


if __name__ == "__main__":
    for subject in prof_urls.keys():
        scrape(subject)
