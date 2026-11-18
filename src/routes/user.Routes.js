import express from 'express';
import { createUser, getAllUsers } from "../controllers/user.Cntroller.js";

const router = express.Router();

router.post("/create", createUser);

//get 

router.get("/showall", getAllUsers);

export default router;
