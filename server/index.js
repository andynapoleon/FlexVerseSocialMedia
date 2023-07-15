import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
// import User from "./models/User.js";
// import Post from "./models/Post.js";
// import { users, posts } from "./data/index.js";

/* MIDDLEWARE CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); // serves statics files like images, ... inside the specified folder

/* FILE STORAGE */
const storage = multer.diskStorage({
  // use Disk to store files
  destination: function (req, file, cb) {
    cb(null, "public/assets"); // where we want to store the files - here in public/assets
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // by what name we want to save the file as - here is just its original name
  },
});

const upload = multer({ storage: storage }); // used in POST requests of handling a multipart form to upload file

/* ROUTES WITH FILES */ // this is why we don't create seperate route files because we need the "upload" constant
app.post("/auth/register", upload.single("picture"), register); // req.file is the `picture` file (http call front end) and req.body will hold the text fields. This is the picture uploaded during registering.
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log("Server Port: " + PORT));

    // Add data only once!
    //User.insertMany(users);
    //Post.insertMany(posts);
  })
  .catch((error) => console.log(error + "did not connect"));
