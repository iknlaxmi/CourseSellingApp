import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { emailState } from "./Login";
import { useRecoilValue } from "recoil";

function CourseCard({ course }) {
  const email = useRecoilValue(emailState);
  return (
    <Card className="mt-6 ml-8 mb-16 w-80 md:ml-14 lg:ml-28">
      <CardHeader color="blue-gray" className=" h-56 sm:h-48">
        <img src={course.imageLink} alt="card-image" />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {course.title}
        </Typography>
        <Typography>{course.description}</Typography>
        <Typography>
          <span className="font-black font-md">Price:&nbsp;</span>
          {course.price}&nbsp;$
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 justify-center">
        <Button className="m-4 w-24">
          <Link to="/course-details" state={{ course: course }}>
            Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
export default CourseCard;
