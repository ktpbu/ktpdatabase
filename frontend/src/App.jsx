import { Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

// layout and home
import Layout from "./Layout";
import Home from "./pages/Home/Home";

// academic imports
import AcademicResources from "./pages/Academics/AcademicResources";
import Academics from "./pages/Academics/Academics";
import AddReview from "./pages/Academics/AddReview";
import Course from "./pages/Academics/Course";
import CourseList from "./pages/Academics/CourseList";
import Dependencies from "./pages/Academics/Dependencies";
import Graduate from "./pages/Academics/Graduate";

// professional/calendar/error
import Professional from "./pages/Professional/Professional";
import Calendar from "./pages/Calendar/Calendar";
import Error from "./pages/Error/Error";

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
                        <Route
                            path="/academics/courses"
                            element={<CourseList />}
                        />
                        <Route
                            path="/academics/courses/:id"
                            element={<Course />}
                        />
                        <Route
                            path="/academics/courses/:id/add-review"
                            element={<AddReview />}
                        />
                        <Route
                            path="/academics/courses/dependencies/:subject"
                            element={<Dependencies />}
                        />
                        <Route
                            path="/academics/resources"
                            element={<AcademicResources />}
                        />
                        <Route
                            path="/academics/graduate"
                            element={<Graduate />}
                        />
                        <Route
                            path="/professional"
                            element={<Professional />}
                        />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="*" element={<Error />} />
                    </Route>
                </Routes>
            </SnackbarProvider>
        </div>
    );
};

export default App;
