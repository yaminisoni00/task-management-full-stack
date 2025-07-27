import express from "express";
import { createTaskController, deleteTaskController, getTasksController, updateTaskController } from "src/controllers/task.controller";
import { getTeamsController, createTeamController, updateTeamController, deleteTeamController } from "src/controllers/team.controller";
import { authenticateUser } from "src/middlewares/auth.middleware";

const router = express.Router();

// router.use(authenticateUser);

router.get("/", getTasksController);
router.post("/create", createTaskController);
router.put("/update", updateTaskController);
router.delete("/delete", deleteTaskController);

export default router;