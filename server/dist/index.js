"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const admin_1 = __importDefault(require("./routes/admin"));
const user_1 = __importDefault(require("./routes/user"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/admin", admin_1.default);
app.use("/users", user_1.default);
app.get("/", (req, res) => res.json({ msg: "hello world server" }));
mongoose_1.default.connect("mongodb+srv://laxmimit:pingpong@cluster0.b31uole.mongodb.net/courses", { dbName: "courses" });
app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
});
