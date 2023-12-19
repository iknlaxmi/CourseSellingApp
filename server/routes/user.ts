import express from "express";
import { User, Admin, Course } from "../db";
import jwt from "jsonwebtoken";
import { SECRET, authenticateJwt } from "../middleware/auth";
import { Request, Response, NextFunction } from "express";
import mongoose, { Types, ObjectId } from "mongoose";

const router = express.Router();
interface Course {
  _id: Types.ObjectId;
  title: string;
  description: string;
  price: number;
  imageLink: string;
  published: boolean;
}
interface RequestBody {
  username: string;
  password: string;
}
/*POST /users/signup
   Description: Creates a new user account.
   Input: { username: 'user', password: 'pass' }
   Output: { message: 'User created successfully', token: 'jwt_token_here' }*/

router.post("/signup", async (req: Request, res: Response) => {
  const { username, password }: RequestBody = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "User created successfully", token });
  }
});
/* POST /users/login
   Description: Authenticates a user. It requires the user to send username and password in the headers.
   Input: Headers: { 'username': 'user', 'password': 'pass' }
   Output: { message: 'Logged in successfully', token: 'jwt_token_here' }*/

router.post("/login", async (req: Request, res: Response) => {
  const { username, password }: RequestBody = req.body.headers;

  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in Sccessfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});
/*GET /users/courses
   Description: Lists all the courses.
   Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }
   Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }*/
router.get("/courses", authenticateJwt, async (req: Request, res: Response) => {
  const courses: Course[] = await Course.find({ published: true });
  res.json({ courses });
});
/*GET /users/courses/:courseId
   Description: Lists all the courses.
   Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }
   Output:  { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }*/
router.get(
  "/courses/:courseId",
  authenticateJwt,
  async (req: Request, res: Response) => {
    const course: Course | null = await Course.findById(req.params.courseId);
    res.json({ course });
  }
);
/*POST /users/courses/:courseId
   Description: Purchases a course. courseId in the URL path should be replaced with the ID of the course to be purchased.
   Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }
   Output: { message: 'Course purchased successfully' }*/

router.post(
  "/courses/:courseId",
  authenticateJwt,
  async (req: Request, res: Response) => {
    const course: Course | null = await Course.findById(req.params.courseId);
    if (course) {
      const username = req.headers["username"];
      const user = await User.findOne({ username: username });
      if (user) {
        const courseId = new Types.ObjectId(String(course._id));
        user.purchasedCourses.push(courseId);
        await user.save();
        res.json({ message: "Course purchased successfuly" });
      } else {
        res.status(403).json({ message: "User not found" });
      }
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  }
);

/*GET /users/purchasedCourses
   Description: Lists all the courses purchased by the user.
   Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }
   Output: { purchasedCourses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }*/
router.get(
  "/purchasedCourses",
  authenticateJwt,
  async (req: Request, res: Response) => {
    const username = req.headers["username"];
    const user = await User.findOne({ username: username }).populate(
      "purchasedCourses"
    );
    if (user) {
      res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  }
);
export default router;
