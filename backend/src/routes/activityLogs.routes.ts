import { Router } from "express";
import { getActivityLogsController } from "src/controllers/activityLogs.controller";
import { authenticateUser } from "src/middlewares/auth.middleware";

const router = Router();

// router.use(authenticateUser);

router.get("/", getActivityLogsController);

export default router;