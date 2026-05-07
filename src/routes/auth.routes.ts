import { Router } from "express";
import { login, register } from "../controllers/auth.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);

console.log("AUTH ROUTES FILE LOADED");
export default router;