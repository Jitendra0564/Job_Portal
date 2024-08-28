import express from "express";
import {
  getUserController,
  updateUserController,
  getUserIdController,
} from "../Controller/UserController.js";
import userAuth from "../middleware/authmiddleware.js";

//router object
const router = express.Router();

//routes
//GET users
router.post("/get-user", userAuth, getUserController);
router.get("/get-user/:id", userAuth, getUserIdController);
//Update users
router.put("/update", userAuth, updateUserController);

export default router;
