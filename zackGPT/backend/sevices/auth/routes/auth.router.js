import express from "express";
import googleSignIn from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/login", googleSignIn);

export default router;