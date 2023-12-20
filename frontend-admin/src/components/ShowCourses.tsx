import React, { useEffect } from "react";
import axios from "axios";

import CourseCard from "./CourseCard";
import NavBarAfterLogin from "./NavBarAfterLogin";
import { emailState } from "./Login";
import { useRecoilValue } from "recoil";

import { Course } from "../App";

function ShowCourses() {
  const [courses, setCourses] = React.useState<Course[]>([]);
  const email = useRecoilValue(emailState);
  console.log("show course email:", email);
  // Add code to fetch courses from the server
  // and set it in the courses state variable.
  useEffect(() => {
    fetchCourses();
  }, []);
  const fetchCourses = () => {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem(email)}`,
    };
    axios
      .get("http://52.73.145.113:3000/admin/courses", {
        headers: headers,
      })
      .then((response) => {
        const responseData = response.data;
        setCourses([...responseData]);
        console.log(responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      {/* <CourseCard /> */}
      <NavBarAfterLogin />
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
}

export default ShowCourses;
