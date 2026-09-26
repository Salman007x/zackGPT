import express from "express";
import {googleSignIn, logout} from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/login", googleSignIn);
router.post("/logout", logout);

export default router;