# ktpdatabase

### How to Run Project Locally:
For testing and development, it will be necessary to run this locally. First, make sure you have `Node.js` and `npm` installed. Then, clone this git repo into your own local directory.
1. Navigate to the `frontend` folder
2. Run the following: `npm i`, which installs all packages needed by the frontend
3. Navigate to the `backend` folder
4. Run `npm i` again, to install all backend packages
5. Still in `backend` folder, run `npm run dev` which starts up the backend server on localhost:3000 (this is what we have it set to rn)
6. Now, the backend server is visible if you go to Chrome and go to `http://localhost:3000/`
7. Open another terminal.
7. Navigate back to the `frontend` folder, and run `npm run dev` again in this folder, which will start the frontend server at `http://localhost:5173/`
8. Both servers need to be up and running to get full functionality

When developing, just save the file you have just changed and the webpage will automatically reflect that change (if no error occurs). As a rule of thumb, if there is nothing on the webpage, there is some error in your code, which can be diagnosed either in your terminal or by pressing `inspect` on the webpage and checking `console` for output (messages+errors).

### Notes about Project:
- backend in Express.js
    - using routers from each subset of pages (i.e. Academics, Calendar, Error, Home, Professionals)
- frontend in React.js  --> Vite
- (current) Structure is as below:

```text
    root
    |_ Home
    |_ Academics
        |_ Courses
            |_ CS
            |_ DS
            |_ ENG
            |_ Hub
        |_ BU Resources
    |_ Calendar
    |_ Professional
        |_ Internship Resouces
        |_ General Advice
```
    

TODO List:
- Big Things:
    - finalize structure
    - set themes
- Little Things:
    - create header/footer
    - fill out courses
    - refactor CardGroup on Academics page to support more Cards --> need to switch to Row-Col Bootstrap elements
    - add links to Footer (need to add href attribute to both images)


Questions
- seperate pages for each course, each college, each major??? 