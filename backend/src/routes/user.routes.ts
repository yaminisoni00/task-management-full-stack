import { Router } from 'express';
import { createUserController, getUsersController, updateUserController, deleteUserController, loginUser } from '../controllers/user.controller';
import { authenticateUser } from '../middlewares/auth.middleware';
const router = Router();

// router.use(authenticateUser);

router.get("/", getUsersController);
router.post("/create", createUserController);
router.put("/update", updateUserController);
router.delete("/delete", deleteUserController);
router.post('/login', loginUser);

export default router;