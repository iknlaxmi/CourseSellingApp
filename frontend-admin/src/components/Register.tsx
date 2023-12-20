import React, { useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    axios
      .post("https://52.73.145.113:3000/admin/signup", {
        username: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem(email, response.data.token);
      })
      .catch((error) => {
        console.error("POST ERROR", error);
      });
  };

  return (
    <div>
      <NavBar />
      {/* <div className="-mt-12 p-2">
        <img className="h-52 w-full" src={registerImage} />
      </div> */}
      <div className="h-screen w-full flex justify-center items-center lg:-mt-16 md:-mt-64 -mt-44">
        <div className="flex flex-col border-blue-600 rounded border-2 sm:w-96 w-88 h-96">
          <div className="mt-12 m-2 sm:ml-12 ml-8">
            <h2>Hi,Welcome back!</h2>
          </div>
          <div className="mt-8 m-4 sm:ml-12 ml-8">
            {" "}
            <input
              className="border-2 w-64 h-10 rounded p-2 justify-center"
              type={"text"}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="m-4 sm:ml-12 ml-8">
            {" "}
            <input
              className="border-2 w-64 h-10 rounded p-2"
              type={"text"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="m-4 sm:ml-12 ml-8">
            {" "}
            <button
              className="w-64 h-10 rounded bg-blue-600 text-white"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          <div className="m-4 sm:ml-24 ml-16">
            Already a user?{" "}
            <a className="text-blue-600" href="/login">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
