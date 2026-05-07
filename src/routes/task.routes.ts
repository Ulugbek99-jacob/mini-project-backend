import { Router } from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/task.controller";
import auth from "../middleware/auth.middleware";

const router = Router();

router.post("/", auth, createTask);
router.get("/", auth, getTasks);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

export default router;