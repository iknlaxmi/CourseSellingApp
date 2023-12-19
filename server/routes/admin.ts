// const mongoose = require("mongoose");
// const express = require("express");

import mongoose from "mongoose";
import express from "express";

import { User, Admin, Course } from "../db";

import jwt from "jsonwebtoken";
import { SECRET } from "../middleware/auth";
import { authenticateJwt } from "../middleware/auth";

const router = express.Router();

router.get("/me", authenticateJwt, async (req, res) => {
  const username = req.headers["username"];

  const admin = await Admin.findOne({ username: username });
  if (!admin) {
    res.status(403).json({ msg: "Admin does not exist" });
    return;
  }
  res.json({
    username: admin.username,
  });
});

/**
 * POST /admin/signup
   Description: Creates a new admin account.
   Input: { username: 'admin', password: 'pass' }
   Output: { message: 'Admin created successfully', token: 'jwt_token_here' }
 */

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (admin) {
    res.status(403).json({ message: "Admin already exist" });
  } else {
    const obj = { username: username, password: password };
    const new_admin = new Admin(obj);
    new_admin.save();
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Admin created successfully", token });
  }
});
/***
 * POST /admin/login
   Description: Authenticates an admin. It requires the admin to send username and password in the headers.
   Input: Headers: { 'username': 'admin', 'password': 'pass' }
   Output: { message: 'Logged in successfully', token: 'jwt_token_here' }
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body.headers;
  console.log(req);
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in Successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

/***
 * POST /admin/courses
   Description: Creates a new course.
   Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }, Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }
   Output: { message: 'Course created successfully', courseId: 1 }
 */
router.post("/courses", authenticateJwt, async (req, res) => {
  const course = new Course(req.body);
  console.log(req.body);
  await course.save();

  res.json({ message: "Course created successfully", courseId: course.id });
});

/***
 * PUT /admin/courses/:courseId
   Description: Edits an existing course. courseId in the URL path should be replaced with the ID of the course to be edited.
   Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }, Body: { title: 'updated course title', description: 'updated course description', price: 100, imageLink: 'https://updatedlinktoimage.com', published: false }
   Output: { message: 'Course updated successfully' }
 */

router.put("/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
    new: true,
  });
  if (course) {
    res.json({ message: "Course updated successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

/**
    * GET /admin/courses
   Description: Returns all the courses.
   Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }
   Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }
    */

router.get("/courses", authenticateJwt, async (req, res) => {
  const courses = await Course.find({});
  res.json(courses);
});
export default router;
