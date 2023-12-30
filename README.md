# ktpdatabase

## Table of Contents
- [For KTP](#for-ktp)
    - [Guide to Contributing](#guide-to-contributing)
        - [Important Concepts](#important-concepts)
        - [Some Guidelines](#some-guidelines)
        - [How to Run Project Locally](#how-to-run-project-locally)
    - [Current Roadmap of Website](#current-roadmap-of-website)
    - [Current Open Questions](#current-open-questions)
    - [To-Do List](#to-do-list)
- [For Others](#for-others)

## For KTP

The following sections are written to help KTP brothers add to the project. These may not be 100% correct, and are written with a macOS setup in mind (bash scripts, etc). Please read the Guide to Contributing section before starting.

When developing, just save the file you have just changed and the webpage will automatically reflect that change (if no error occurs). As a rule of thumb, if there is nothing on the webpage, there is some error in your code, which can be diagnosed either in your terminal or by pressing `inspect` on the webpage and checking `console` for output (messages+errors).

### Guide to Contributing
There are a couple basic rules or guidelines that will make this collaborative project much easier for everyone. In general, make sure all new work is done **in a branch labelled with your name**. This will help us keep track of who is doing what, and seperating the main branch (that is public facing) from any additions that might not be completely functional. In most cases, check with the team before merging into the main branch. Feel free to add to this guide as new rules are made.

#### Important Concepts
- **App.jsx**: this file defines the template of a page. As can be seen by this file, each page has 3 parts: the Header, the Outlet, and the Footer. The Outlet part will be replaced by a Page when each page is requested. For example, if we go to the Academics page, then the `Academics.jsx` file defines what content is filled in at Outlet
- **Component**: a piece of reused code (footer, header) that is present on *every* page. 
- **Page**: actual content that is rendered between the footer and header components
- **Backend vs Frontend**: for this project, we are running two servers concurrently. The backend server maintains large amounts of data requests (in our case, the course information). The frontend server maintains the actual HTML and CSS (in the form of React.js), and requests information from the backend as needed.
- **index.html**: this file is always the entryway into a website. When a browser requests content from that website, this file is what is first looked through. You can see in that file that all it does is link to `App.jsx`, which actually creates the map for our website. This is a React.js concept.

#### Some Guidelines
1. Tabs should be 4 spaces. Makes it easier.
2. Each new page (React .jsx file in the `pages` subdirectory) needs to return a `div` element that is the main content of that page to be rendered. It is necessary for formatting that each page needs that div to have `className='page-content'`, and that `.jsx` file needs to import the following stylesheet: `import "./../page-content.css`.

#### How to Run Project Locally:
For testing and development, it will be necessary to run this locally. First, make sure you have `Node.js` and `npm` installed. Then, clone this git repo into your own local directory.
1. Navigate to the `frontend` folder
2. Run the following: `npm i`, which installs all packages needed by the frontend
3. Navigate to the `backend` folder
4. Run `npm i` again, to install all backend packages
5. Still in `backend` folder, run `npm run dev` which starts up the backend server on localhost:3000 (this is what we have it set to rn)
6. Now, the backend server is visible if you go to Chrome and go to `http://localhost:3000/`
7. Open another terminal.
7. Navigate back to the `frontend` folder, and run `npm run dev` again in this folder, which will start the frontend server at `http://localhost:5173/`
8. Both servers need to be up and running to get full functionality.

### Making a Request to the Backend
Here is an example of how to implement a request to the backend in a file:
1. Import the base backend URL from the .env
const backend = import.meta.env.VITE_BACKEND_URL;
2. Make the call to the backend using the imported base URL as a fstring (the string needs to be enclosed by a single backtick symbol)
axios.get(\`${backend}/academics/courses/dependencies/nodes/${subject}\`)

### Current Roadmap of Website

```text
    root
    |_ Home
    |_ Academics
        |_ Courses
            |_ ...all courses by ID
        |_ Academic Resources
    |_ Calendar
    |_ Professional
```

### CURRENT OPEN QUESTIONS
- seperate pages for each course, each college, each major??? 


## To-Do List

- Big Things:
    - finalize structure
    - set themes
- Little Things:
    - create header/footer
    - fill out courses
    - refactor CardGroup on Academics page to support more Cards --> need to switch to Row-Col Bootstrap elements
    - add links to Footer (need to add href attribute to both images)


## For others

Welcome to KTP's database website repository. Written by KTP Lambda chapter.
