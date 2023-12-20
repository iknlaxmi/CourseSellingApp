import { useContext, useState, useEffect } from "react";

import axios from "axios";

import { useRecoilValue } from "recoil";
import { emailState } from "./Login";
import NavBarLogin from "./NavBarLogin";
import CourseCard from "./CourseCard";

const ShowPurchasedCourses = () => {
  const email = useRecoilValue(emailState);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
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
      .get("http://localhost:3000/users/purchasedCourses", {
        headers: headers,
      })
      .then((response) => {
        const responseData = response.data;
        console.log(responseData);
        setPurchasedCourses(responseData.purchasedCourses);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <NavBarLogin />

      <h1 className="m-4 text-center p-4 block  text-2xl antialiased font-semibold leading-tight tracking-normal text-inherit">
        PURCHASED COURSES
      </h1>
      <div className="sm:flex sm:flex-row sm:flex-wrap">
        {purchasedCourses.map((c) => (
          <CourseCard course={c} />
        ))}
      </div>
    </>
  );
};
export default ShowPurchasedCourses;
