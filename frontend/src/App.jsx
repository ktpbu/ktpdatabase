import { Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

// layout and home
import Layout from "./Layout";
import Home from "./pages/home/Home";

// academic imports
import Academics from "./pages/academics/Academics";
import CourseList from "./pages/academics/CourseList";
import Course from "./pages/academics/Course";
import AcademicResources from "./pages/academics/AcademicResources";

// professional/calendar/error
import Professional from "./pages/professional/Professional";
import Calendar from "./pages/calendar/Calendar";
import Error from "./pages/error/Error";

// main app
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// creates routings of app --> used for sending pages when requested
const App = () => {
  return (
    <div>
      <SnackbarProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/academics/courses" element={<CourseList />} />
			      <Route path="/academics/resources" element={<AcademicResources />} />
            <Route path="/academics/courses/:id" element={<Course />} />
            <Route path="/professional" element={<Professional />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </SnackbarProvider>
    </div>
  );
};

export default App;
