import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import adminRouter from "./routes/admin";
import userRouter from "./routes/user";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

app.use("/admin", adminRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => res.json({ msg: "hello world server" }));

mongoose.connect(
  "mongodb+srv://laxmimit:pingpong@cluster0.b31uole.mongodb.net/courses",
  { dbName: "courses" }
);
app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
