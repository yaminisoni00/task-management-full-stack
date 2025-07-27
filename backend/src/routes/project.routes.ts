import { Router } from "express";
import { createProjectController, deleteProjectController, getProjectsController, updateProjectController } from "../controllers/project.controller";
import { authenticateUser } from "src/middlewares/auth.middleware";

const router = Router();
// router.use(authenticateUser);

// Authenticated Routes
router.post("/create", createProjectController);
router.put("/update", updateProjectController);
router.get("/", getProjectsController);
router.delete("/delete", deleteProjectController);

export default router;