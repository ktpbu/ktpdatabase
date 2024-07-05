import { Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js";

import ProtectedRoute from "./components/ProtectedRoute";

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
import Internships from "./pages/Professional/Internships.jsx";

// calendar
import Calendar from "./pages/Calendar/Calendar";

// account
import AddUser from "./pages/Account/AddUser.jsx";
import Admin from "./pages/Account/Admin.jsx";
import AdminReviews from "./pages/Account/AdminReviews.jsx";
import AdminUsers from "./pages/Account/AdminUsers.jsx";
import Directory from "./pages/Account/Directory.jsx";
import EditReview from "./pages/Account/EditReview.jsx";
import Reviews from "./pages/Account/Reviews.jsx";

// error
import InvalidAdmin from "./pages/Error/InvalidAdmin.jsx";
import InvalidAuthentication from "./pages/Error/InvalidAuthentication.jsx";
import Error from "./pages/Error/Error";
import LoginError from "./pages/Error/LoginError";

// main app
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

// creates routings of app --> used for sending pages when requested
const App = () => {
    const [user, setUser] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setIsFetching(false);
                return;
            }
            setUser(null);
            setIsFetching(false);
        });
        return () => unsubscribe();
    }, []);

    if (isFetching) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <SnackbarProvider>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />

                        {/* academic routes */}
                        <Route
                            path="/academics"
                            element={
                                <ProtectedRoute user={user} admin={false}>
                                    <Academics />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/academics/courses"
                            element={
                                <ProtectedRoute user={user} admin={false}>
                                    <CourseList />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/academics/courses/:level/:id"
                            element={
                                <ProtectedRoute user={user} admin={false}>
                                    <Course />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/academics/courses/:level/:id/add-review"
                            element={
                                <ProtectedRoute user={user} admin={false}>
                                    <AddReview />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/academics/courses/dependencies/:subject"
                            element={
                                <ProtectedRoute user={user} admin={false}>
                                    <Dependencies />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/academics/resources"
                            element={
                                <ProtectedRoute user={user} admin={false}>
                                    <AcademicResources />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/academics/graduate"
                            element={
                                <ProtectedRoute user={user} admin={false}>
                                    <Graduate />
                                </ProtectedRoute>
                            }
                        />

                        {/* professional routes */}
                        <Route
                            path="/professional"
                            element={
                                <ProtectedRoute user={user} admin={false}>
                                    <Professional />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/professional/other-ktp-chapters"
                            element={
                                <ProtectedRoute user={user} admin={false}>
                                    <OtherKTPChapters />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/professional/internships"
                            element={
                                <ProtectedRoute user={user} admin={false}>
                                    <Internships />
                                </ProtectedRoute>
                            }
                        />

                        {/* calendar routes */}
                        <Route
                            path="/calendar"
                            element={
                                <ProtectedRoute user={user} admin={false}>
                                    <Calendar />
                                </ProtectedRoute>
                            }
                        />

                        {/* account routes */}
                        <Route
                            path="/account/admin"
                            element={
                                <ProtectedRoute user={user} admin={true}>
                                    <Admin />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/account/admin/reviews"
                            element={
                                <ProtectedRoute user={user} admin={true}>
                                    <AdminReviews />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/account/admin/users"
                            element={
                                <ProtectedRoute user={user} admin={true}>
                                    <AdminUsers />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/account/admin/users/add"
                            element={
                                <ProtectedRoute user={user} admin={true}>
                                    <AddUser />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/account/directory"
                            element={
                                <ProtectedRoute user={user} admin={false}>
                                    <Directory />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/account/reviews"
                            element={
                                <ProtectedRoute user={user} admin={false}>
                                    <Reviews />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/account/reviews/edit-review/:id"
                            element={
                                <ProtectedRoute user={user} admin={false}>
                                    <EditReview />
                                </ProtectedRoute>
                            }
                        />

                        {/* error routes */}
                        <Route path="/error/admin" element={<InvalidAdmin />} />
                        <Route
                            path="/error/authentication"
                            element={<InvalidAuthentication />}
                        />
                        <Route path="/error/login" element={<LoginError />} />
                        <Route path="*" element={<Error />} />
                    </Route>
                </Routes>
            </SnackbarProvider>
        </div>
    );
};
export default App;
