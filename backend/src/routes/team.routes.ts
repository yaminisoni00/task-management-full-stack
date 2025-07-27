import express from "express";
import { createTeamController, updateTeamController, deleteTeamController, getTeamsController, getTeamMembersController } from "../controllers/team.controller";
import { authenticateUser } from "../middlewares/auth.middleware";

const router = express.Router();

// router.use(authenticateUser);

router.get("/", getTeamsController);
router.post("/create", createTeamController);
router.put("/update", updateTeamController);
router.delete("/delete", deleteTeamController);
router.get("/members", getTeamMembersController);

export default router;
