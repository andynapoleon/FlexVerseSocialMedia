import express from "express";
//import axios from "axios";
import { login } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login); // route for login, this will mount on app.use("/auth")

export default router;
