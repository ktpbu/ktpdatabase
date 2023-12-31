from bs4 import BeautifulSoup
import os
import json
from requests_html import HTMLSession

""" 
I PURPOSELY DID NOT IMPLEMENT ASYNCHRONOUS PROGRAMMING 
OR MULTITHREADING TO PRESERVE THE ORDER OF THE COURSES 
"""

# sets the source urls to scrape for each subject
course_urls = {
    "biomedical-eng": "https://www.bu.edu/academics/eng/courses/biomedical-engineering/",
    "computer-science": "https://www.bu.edu/academics/cas/courses/computer-science/",
    "data-science": "https://www.bu.edu/academics/cds/courses/",
    "electrical-computer-eng": "https://www.bu.edu/academics/eng/courses/electrical-computer-engineering/",
    "economics": "https://www.bu.edu/academics/cas/courses/economics/",
    "eng-core": "https://www.bu.edu/academics/eng/courses/engineering-core/",
    "mathematical-statistics": "https://www.bu.edu/academics/cas/courses/mathematics-statistics/",
    "mechanical-eng": "https://www.bu.edu/academics/eng/courses/mechanical-engineering/",
    "materials-science-eng": "https://www.bu.edu/academics/eng/courses/materials-science-engineering/",
    "systems-eng": "https://www.bu.edu/academics/eng/courses/systems-engineering/",
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
            data = [get_data(course) for course in courses]
            data = [item for item in data if item]
            return data

    course_data = []
    page_number = 1

    # scrapes all relevant pages
    while page_number <= last_page:
        page_data = fetch_course_page(page_number)
        course_data.extend(page_data)
        page_number += 1

    if not course_data:
        raise Exception(f"Unable to scrape the following url: {url}")

    print(f"finished scraping {subject} course info")
    return course_data


def get_data(course):
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

            # creates json formatted object for course
            obj = {
                entry: {
                    "id": identifier.strip(),
                    "name": name.strip(),
                    "prereqs": prereqs.strip(),
                    "content": content.strip(),
                    "prof": [],
                    "reviews": [],
                }
            }
            return obj
        except:
            print(f"error scraping {course}")


def create_json(course_data, subject):
    location = "./backend/data/courses/course-info"

    # ensures relevant directory exists to store json output
    if not os.path.exists(location):
        os.makedirs(location)

    # creates json file containg course info for the subject
    with open(f"{location}/{subject}-course-info.json", "w") as f:
        json.dump(course_data, f, indent=4, ensure_ascii=False)


def main(subject):
    course_data = get_course_info(subject)
    create_json(course_data, subject)
    return course_data


for subject in course_urls.keys():
    main(subject)
