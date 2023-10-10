import express from "express";
import { getNews, deleteNews } from "../controller/newsController.js";
import { verifyJWT } from "../middleware/verifyToken.js";
import { verfiyRole } from "../middleware/verifyRole.js";
import { roles } from "../config/role.js";
const router = express.Router();

router.get("/", getNews);
router.route("/:id").delete(verifyJWT, verfiyRole(roles.admin), deleteNews);

export default router;
