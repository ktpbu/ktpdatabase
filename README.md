# ktpdatabase

## Table of Contents
- [Note](#note)
- [Guide to Contributing](#guide-to-contributing)
  - [Important Concepts](#important-concepts)
  - [Some Guidelines](#some-guidelines)
  - [How to Run the Project Locally](#how-to-run-the-project-locally)
  - [Making a Request to the Backend](#making-a-request-to-the-backend)
  - [Connecting to the Supabase Client](#connecting-to-the-supabase-client)
  - [Limiting Page Access to Authenticated Users](#limiting-page-access-to-authenticated-users)
  - [How to Run the Scrapers](#how-to-run-the-scrapers)
- [Current Roadmap of Website](#current-roadmap-of-website)
- [To-Do List](#to-do-list)
- [Contributors](#contributors)

## Note

The following sections are written to help KTP brothers add to the project. These may not be 100% correct and are written with a macOS setup in mind (bash scripts, etc). Please read the Guide to Contributing section before starting.

When developing, just save the file you have just changed and the webpage will automatically reflect that change (if no error occurs). As a rule of thumb, if there is nothing on the webpage, there is some error in your code, which can be diagnosed either in your terminal or by pressing `inspect` on the webpage and checking `console` for output (messages+errors).

## Guide to Contributing
The steps to set up your workflow are detailed in the file named `Git Workflow` in the shared `App Committee` folder on Google Drive. Please follow these steps, and reach out to the head of the app committee if you need help, have any questions, or wish to join the app committee.

### Important Concepts
- **App.jsx**: this file defines the template of a page. As can be seen by this file, each page has 3 parts: the Header, the Outlet, and the Footer. The Outlet part will be replaced by a Page when each page is requested. For example, if we go to the Academics page, then the `Academics.jsx` file defines what content is filled in at Outlet
- **Component**: a piece of reused code (footer, header) that can be reused across pages. 
- **Page**: actual content that is rendered between the footer and header components.
- **Backend vs Frontend**: for this project, we are running two servers concurrently. The backend server maintains large amounts of data requests (in our case, the course information). The frontend server maintains the actual HTML and CSS (in the form of React.js) and requests information from the backend as needed.
- **index.html**: this file is always the entryway into a website. When a browser requests content from that website, this file is what is first looked through. You can see in that file that all it does is link to `App.jsx`, which creates the map for our website. This is a React.js concept.

### Some Guidelines
1. Use the vs code prettier extension with these settings: `Print Width: 80` `Prose Wrap: always` `Tab Width: 4`.

### How to Run the Project Locally
1. Make sure that you have `Git`, the `GitHub SSH key`, `Node.js`, and `npm` installed on your local machine.
2. `Fork` this repository to your personal GitHub account.
4. On your forked repository, click `Code` and copy the `SSH URL`.
5. Navigate to the directory on your local machine where you want to have the project code.
6. Run `git clone <SSH URL>`, where `<SSH URL>` is the URL you copied in step 3.
7. Navigate to the `frontend` folder.
8. Run `npm i`, which installs all packages needed by the frontend.
9. Navigate to the `backend` folder.
10. Run `npm i` again to install all backend packages.
11. Set up the required private local files in both the frontend and the backend. In the shared Google Drive folder (<a href="https://drive.google.com/drive/u/1/folders/1bkA2QZQkNpFGQj8MW2tyx1N7N_cq5KCB" target="_blank">App Committee</a>), navigate to the folder called `ktpdatabase` and look at the document called `Local Files` to set them up. If you need access to the folder, contact Victor or Carol.
12. Still in the `backend` folder, run `npm run dev` which starts up the backend server on `http://localhost:3000` (the configured default).
14. Open another terminal window, navigate to the `frontend` folder, and run `npm run dev` again, which starts the frontend server at `http://localhost:5173/`.
8. Both servers need to be up and running to get full functionality. Once both are up, go to your desired web browser and visit `http://localhost:5173/` to interact with the website.

### Making a Request to the Backend
Here is an example of how to implement a request to the backend in a file:

Import the base backend URL from the .env file:

`const backend = import.meta.env.VITE_BACKEND_URL;`

Make the call to the backend using the imported base URL as a fstring (the string needs to be enclosed by a single backtick symbol):

axios.get(\`${backend}/academics/courses/dependencies/nodes/${subject}\`)

### Connecting to the Supabase Client
Supabase is an open-source cloud-hosted PostgreSQL database. 

To connect to the Supabase client API using JavaScript, add the following import statement at the top of the file if it is not already present:

`import supabase from "./supabaseClient.js";`

To connect to the Supabase client API using Python, first add the following import statements at the top of the file if it is not already present:

```
from dotenv import load_dotenv
import os
from pathlib import Path
```

Next, paste the following code at the top of the file:

```
load_dotenv(dotenv_path=Path(__file__).resolve().parent.parent / ".env")
try:
    supabase_url = os.environ.get("SUPABASE_URL")
    supabase_key = os.environ.get("SUPABASE_KEY")
    supabase = create_client(supabase_url, supabase_key)
except:
    print("failed to connect to Supabase")
```

You must update the `dotenv_path` parameter to match the path from your file to the .env. The example file is at `backend/scrapers/ProfScraper.py`, while the .env file is at `backend/.env`. Using that information, you can probably deduce what your `dotenv_path` parameter needs to be.

Follow the relevant [JavaScript documentation](https://supabase.com/docs/reference/javascript/installing) or [Python documentation](https://supabase.com/docs/reference/python/installing) to implement any Supabase API calls.

### Limiting Page Access to Authenticated Users
All pages on the website excluding the home and error pages should only be accessed by authenticated users. This can be done by wrapping each new route in `App.jsx` with the `<ProtectedRoute />` component, as shown in the example:

```
<Route
  path="/academics"
  element={
    <ProtectedRoute user={user} admin={false}>
      <Academics />
    </ProtectedRoute>
  }
/>
```

The `<ProtectedRoute />` component takes in two props and the child node. The `user` prop should always be set equal to the variable `user`. The `admin` prop should be set to either `true` or `false` depending on whether the page is restricted to admin access only. 

It may sometimes be necessary to access user data on a page. To do so, include the following lines at the top of the page component:

```
const [user, setUser] = useState(null);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
  if (user) {
    setUser(user);
    return;
  }
  setUser(null);
  });
  return () => unsubscribe();
}, []);
```

From the `user` state variable, it is possible to access Google account fields such as `user.email` and `user.displayName`.

### How to Run the Scrapers
IMPORTANT: PLEASE DO NOT RUN THE SCRAPERS UNLESS YOU ARE FAMILIAR WITH SCRAPING, SUPABASE, and DOCKER.

The scrapers are located at the path `./backend/scrapers`, and can be directly running using virtual environments. To streamline the entire process, the scrapers were Dockerized and can be run using shell scripts located at the path `./backend/scrapers`. Ensure that the Docker Desktop is installed and running before running the scraper scripts.

#### How to Run the Scrapers Locally
1. Navigate to the `backend/scripts` folder.
2. Run `chmod +x ./run_scrapers_locally.sh`.
3. Run `./run_scrapers_locally.sh`.
4. The course and professor information is saved locally at the path `./backend/scrapers/data`.

#### How to Update the Course Info
1. Run the scrapers locally and verify that the scraped information is correct.
2. Navigate to the `backend/scripts` folder.
3. Run `chmod +x ./update_course_info.sh`.
4. Run `./update_course_info.sh` to update the course info in the Supabase table.

#### How to Update the Professor Info
1. Run the scrapers locally and verify that the scraped information is correct.
2. Navigate to the `backend/scripts` folder.
3. Run `chmod +x ./update_professor_info.sh`.
4. Run `./update_professor_info.sh` to update the professor info in the Supabase table.

## Current Roadmap of Website

```text
    root
    |_ Home
    |_ Academics
        |_ Courses
            |_ ...all undergraduate courses by course code
                |_ Add Course Review
        |_ Resources
        |_ Graduate
            |_ ...all graduate courses by course code
                |_ Add Course Review
    |_ Professional
        |_ KTP Chapters
        |_ Internships and New Grad
    |_ Calendar
    |_ Account
        |_ Admin (requires admin privileges)
            |_ Manage Users (requires admin privileges)
                |_ Add User (requires admin privileges)
            |_ Manage Reviews (requires admin privileges)
        |_ Profile
        |_ Reviews
            |_ Edit Review
```


## To-Do List
Look at this repository's `Issues` tab for the next steps. Open a new issue if you feel anything should be added or changed.

## Contributors

### Developers
- Victor Verma, Alpha Class, 2025
- Rohan Kumar, Alpha Class, 2025
- Nick David, Beta Class, 2026

### Consultants
- Carol Riady, Alpha Class, 2025
- Jennifer Ji, Beta Class, 2026
- Thomas Boles, Alpha Class, 2026
