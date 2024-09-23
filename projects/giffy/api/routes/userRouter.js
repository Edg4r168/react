import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { 
    getFavs, 
    login,
    postFav,
    deleteFav ,
    register
} from "../controller/userController.js";

const router = Router();

router.get("/favs", authenticate, getFavs);
router.post("/favs/:id", authenticate, postFav);
router.delete("/favs/:id", authenticate, deleteFav);
router.post("/login", login);
router.post("/register", register);

export default router;