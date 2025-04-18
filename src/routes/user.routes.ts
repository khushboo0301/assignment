import { Router } from "express";
import { createUser, getUserById} from "../controllers/user.controller";
import { validate } from "../middlewares/validate.middleware";
import { CreateUserSchema } from "../dtos/user.dto";

const router = Router();

router.post("/", validate(CreateUserSchema), createUser);
router.get('/:id', getUserById);

export default router;
