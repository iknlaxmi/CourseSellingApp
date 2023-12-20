import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login.tsx";
import Landing from "./components/Landing";
import CreateCourse from "./components/CreateCourse";
import Register from "./components/Register";
import ShowCourses from "./components/ShowCourses";
import CourseDetails from "./components/CourseDetails";
import EditCourse from "./components/EditCourse";

export interface Course {
  title: string;
  description: string;
  price: number;
  imageLink: string;
  published: string;
}

// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-course" element={<CreateCourse />} />
        <Route path="/courses" element={<ShowCourses />} />
        <Route path="/course-details" element={<CourseDetails />} />
        <Route path="/edit-course" element={<EditCourse />} />
      </Routes>
    </Router>
  );
}

export default App;
