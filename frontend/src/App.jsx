import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Academics from "./pages/Academics/Academics";
import Professional from "./pages/Professional/Professional";
import Calendar from "./pages/Calendar/Calendar";
import Error from "./pages/Error/Error";

import "./App.css";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/professional" element={<Professional />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
