from bs4 import BeautifulSoup
import os
import json
from requests_html import HTMLSession

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
        raise Exception(f"failed to scrape {url}")

    # groups course data into undergrad and grad courses
    undergrad_course_data = {}
    grad_course_data = {}

    for entry in course_data:
        course_id = next(iter(entry.values()))["id"]
        if int(course_id[-3:]) < 500:
            undergrad_course_data[next(iter(entry.keys()))] = next(iter(entry.values()))
        else:
            grad_course_data[next(iter(entry.keys()))] = next(iter(entry.values()))

    print(f"finished scraping {subject} course info")
    return undergrad_course_data, grad_course_data


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
            content = content.split("  BU Hub   Learn More ")[0]

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


def create_json(undergrad_course_data, grad_course_data, subject):
    undergrad_location = "./backend/data/courses/course-info/undergrad"
    grad_location = "./backend/data/courses/course-info/grad"

    # ensures relevant directories exist to store json output
    if not os.path.exists(undergrad_location):
        os.makedirs(undergrad_location)
    if not os.path.exists(grad_location):
        os.makedirs(grad_location)

    # creates json files containing course info for the subject
    with open(f"{undergrad_location}/{subject}-ug-course-info.json", "w") as f:
        json.dump(undergrad_course_data, f, indent=4, ensure_ascii=False)
    with open(f"{grad_location}/{subject}-g-course-info.json", "w") as f:
        json.dump(grad_course_data, f, indent=4, ensure_ascii=False)


def scrape(subject):
    undergrad_course_data, grad_course_data = get_course_info(subject)
    create_json(undergrad_course_data, grad_course_data, subject)

if __name__ == "__main__":
    for subject in course_urls.keys():
        scrape(subject)
