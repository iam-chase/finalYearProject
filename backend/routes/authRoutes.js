import express from "express"

const router = express.Router();
import { register, login, getAllUsers, loggedInUser} from "../controllers/authController.js"

router.post("/register", register);
router.post("/login", login);
router.get("/users", getAllUsers)


// router.get("/me", authenticateUser, loggedInUser);
export default router