import { Response } from "express";
import { AuthRequest } from "../types/express";
import Task from "../models/task.model";
import { validateTask } from "../validators/task.validator";

// CREATE TASK
export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ msg: "Unauthorized" });

    const { title, description } = req.body;

    const error = validateTask(title);
    if (error) return res.status(400).json({ msg: error });

    const task = await Task.create({
      title,
      description,
      userId: req.user.id,
    });

    res.status(201).json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// GET TASKS
export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ msg: "Unauthorized" });

    const tasks = await Task.find({ userId: req.user.id });

    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// UPDATE TASK
export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ msg: "Unauthorized" });

    const { id } = req.params;

    const task = await Task.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!task) return res.status(404).json({ msg: "Task not found" });

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json(updatedTask);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// DELETE TASK
export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ msg: "Unauthorized" });

    const { id } = req.params;

    const task = await Task.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!task) return res.status(404).json({ msg: "Task not found" });

    await Task.findByIdAndDelete(id);

    res.json({ msg: "Task deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};