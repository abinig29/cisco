import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import multer from "multer";
import "express-async-errors";
import path from "path";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connect from "./config/db.js";
import { fileURLToPath } from "url";
import {
  rootRouter,
  courseRouter,
  userRouter,
  authRouter,
} from "./route/index.js";
import { createCourse } from "./controller/courseController.js";
import notFoundMiddleware from "./middleware/notfound.js";
import errorHandlerMiddleware from "./middleware/errorHandler.js";
import corsOptions from "./config/corsOption.js";
v;
import { createUser } from "./controller/userController.js";
/* CONFIG */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("common"));
}
app.use(cors(corsOptions));
app.use(bodyParser.json({ extends: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(helmet());
app.use(cookieParser());
console.log(__dirname);
app.use("/", express.static(path.join(__dirname, "public")));
connect();

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const originalExtension = file.originalname.split(".").pop();
    const uniqueFilename =
      file.fieldname + "-" + uniqueSuffix + "." + originalExtension;
    cb(null, uniqueFilename);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILE UPLOAD */
app.post("/api/v1/course", upload.single("picture"), createCourse);
app.post("/api/v1/user", upload.single("picture"), createUser);

/* ROUTES */

app.use("/", rootRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

/* ERROR HANDLER */

app.use("*", notFoundMiddleware);
app.use(errorHandlerMiddleware);

/* MONGOOSE CONNECT */
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => console.log(`Server running on port ${port}`));
});

mongoose.connection.on("error", (err) => {
  console.log(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`);
});
