import { Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

// layout and home
import Layout from "./Layout";
import Home from "./pages/Home/Home";

// academic
import AcademicResources from "./pages/Academics/AcademicResources";
import Academics from "./pages/Academics/Academics";
import AddReview from "./pages/Academics/AddReview";
import Course from "./pages/Academics/Course";
import CourseList from "./pages/Academics/CourseList";
import Dependencies from "./pages/Academics/Dependencies";
import Graduate from "./pages/Academics/Graduate";

// professional
import Professional from "./pages/Professional/Professional";
import OtherKTPChapters from "./pages/Professional/OtherKTPChapters";

// calendar
import Calendar from "./pages/Calendar/Calendar";

// error
import Error from "./pages/Error/Error";
import LoginError from "./pages/Error/LoginError";

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
                            path="/academics/courses/:level/:id"
                            element={<Course />}
                        />
                        <Route
                            path="/academics/courses/:level/:id/add-review"
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
                        <Route
                            path="/professional/other-ktp-chapters"
                            element={<OtherKTPChapters />}
                        />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/login-error" element={<LoginError />} />
                        <Route path="*" element={<Error />} />
                    </Route>
                </Routes>
            </SnackbarProvider>
        </div>
    );
};
export default App;
