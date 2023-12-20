import React, { FormEvent } from "react";
import axios from "axios";

import { Card, Input, Button, Typography } from "@material-tailwind/react";
import NavBarAfterLogin from "./NavBarAfterLogin";
import { useLocation } from "react-router-dom";
const EditCourse: React.FC = () => {
  const location = useLocation();
  const { course, email } = location.state;
  console.log(location.state, email);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [imageLink, setImageLink] = React.useState("");
  const [published, setPublished] = React.useState("");
  // const [isCourseAdded, setIsCourseAdded] = React.useState(false);

  const handleAddCourseButton = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const new_course = {
      title: title || course.title,
      description: description || course.description,
      price: price || course.price,
      imageLink: imageLink || course.imageLink,
      published: published || course.published,
    };
    console.log(localStorage.getItem(email));
    const headers = {
      "Content-Type": "Application/json",
      "Authorization": `Bearer ${localStorage.getItem(email)}`,
    };
    axios
      .put(
        `https://52.73.145.113:3000/admin/courses/${course._id}`,
        new_course,

        { headers: headers }
      )
      .then((response) => {
        // if (!response.ok) {
        //   throw new Error(`HTTP Error status:${response.status}`);
        // }
        const responseData = response.data;
        console.log(responseData);
        // handleCourseAdded(true);
        console.log(response);
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error setting up the request:", error.message);
        }

        console.error("Error config:", error.config); /*email={location.state}*/
      });
  };
  return (
    <>
      <NavBarAfterLogin />
      <Card
        color="transparent"
        shadow={false}
        className="flex items-center justify-center  mt-4 lg:mt-6"
      >
        <Typography variant="h4" color="blue-gray">
          Update Course
        </Typography>

        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleAddCourseButton}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Title
            </Typography>
            <Input
              size="lg"
              placeholder="Title"
              defaultValue={course.title}
              crossOrigin="anonymous"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              onChange={(e) => setTitle(e.target.value)}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Description
            </Typography>
            <Input
              size="lg"
              placeholder="Description"
              defaultValue={course.description}
              crossOrigin="anonymous"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              onChange={(e) => setDescription(e.target.value)}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Price
            </Typography>
            <Input
              size="lg"
              placeholder="Price"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              defaultValue={course.price}
              crossOrigin="anonymous"
              onChange={(e) => setPrice(e.target.value)}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Image Link
            </Typography>
            <Input
              size="lg"
              placeholder="Image Link"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              defaultValue={course.imageLink}
              crossOrigin="anonymous"
              onChange={(e) => setImageLink(e.target.value)}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Published
            </Typography>
            <Input
              size="lg"
              placeholder="true/false"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              defaultValue={course.published}
              crossOrigin="anonymous"
              onChange={(e) => setPublished(e.target.value)}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            UPDATE
          </Button>
        </form>
      </Card>
    </>
  );
};
export default EditCourse;
