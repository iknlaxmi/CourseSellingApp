// import loginImage from "../assets/login-image.jpg";
import loginImage from "../assets/login-image.jpg";

import NavBar from "./NavBar";
// import '../assets/SkillPro'
/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
function Landing() {
  return (
    <div>
      <NavBar />
      <div className="mx-10 my-10">
        <img className="w-full h-auto" src={loginImage} />
      </div>
      {/* <h1>Welcome to course selling website!</h1> */}
    </div>
  );
}

export default Landing;
