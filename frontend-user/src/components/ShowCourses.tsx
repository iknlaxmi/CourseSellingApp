import { useState, useEffect } from "react";

import NavBarLogin from "./NavBarLogin";
import axios from "axios";
import CourseCard from "./CourseCard";
import { useRecoilValue } from "recoil";
import { emailState } from "./Login";
const ShowCourses = () => {
  const email = useRecoilValue(emailState);
  console.log("show courses email", email);

  const [courses, setCourses] = useState([]);

  //get all courses
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    const headers = {
      "Content-Type": "application/json",

      "Authorization": `Bearer ${localStorage.getItem(email)}`,
    };
    axios
      .get("http://localhost:3000/users/courses", {
        headers: headers,
      })
      .then((response) => {
        const responseData = response.data;
        console.log(responseData);
        setCourses(responseData.courses);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <NavBarLogin />
      <h1 className="m-4 text-center p-4 block  text-2xl antialiased font-semibold leading-tight tracking-normal text-inherit">
        LATEST COURSES
      </h1>
      <div className="sm:flex sm:flex-row sm:flex-wrap">
        {courses.map((c) => (
          <CourseCard course={c} />
        ))}
      </div>
    </div>
  );
};
export default ShowCourses;
