# Imports
from bs4 import BeautifulSoup
import os
import json
from requests_html import HTMLSession

""" I PURPOSELY DID NOT IMPLEMENT MULTITHREADING OR ASYNCHRONOUS 
    PROGRAMMING TO PRESERVE THE ORDER OF THE COURSES """

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
    session = HTMLSession()
    first_page = session.get(url)
    soup = BeautifulSoup(first_page.html.raw_html, "html.parser")
    pagination = soup.find("div", {"class": "pagination"})
    pages = pagination.find_all("span")
    last_page = int(pages[-1].text)

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

    while page_number <= last_page:
        page_data = fetch_course_page(page_number)
        course_data.extend(page_data)
        page_number += 1

    if not course_data:
        raise Exception(f"Unable to scrape the following url: {url}")
    print(f"finished scraping {subject} course info")
    return course_data


def get_data(course):
    info = course.text.replace("\t", "").split("\n")
    info = [i for i in info if i != ""]
    if len(info) != 1:
        try:
            entry = info[0].split(":")[0].replace(" ", "")
            identifier = info[0].split(":")[0][-6:].replace(" ", "")
            name = info[0].split(":")[1][1:]
            prereqs = course.find("span")
            if len(info) == 3:
                prereqs = info[1]
                content = info[2]
            else:
                prereqs = ""
                content = info[1]
            prof = []
            reviews = []
            obj = {
                entry: {
                    "id": identifier,
                    "name": name,
                    "prereqs": prereqs,
                    "content": content,
                    "prof": prof,
                    "reviews": reviews,
                }
            }
            return obj
        except:
            print(f"error scraping {course}")


def create_json(course_data, subject):
    location = "./backend/data/courses/course-info"
    if not os.path.exists(location):
        os.makedirs(location)

    with open(f"{location}/{subject}-course-info.json", "w") as f:
        json.dump(course_data, f, indent=4, ensure_ascii=False)


def main(subject):
    course_data = get_course_info(subject)
    create_json(course_data, subject)
    return course_data


for subject in course_urls.keys():
    main(subject)
