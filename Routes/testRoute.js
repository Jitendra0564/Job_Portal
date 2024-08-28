import express from "express";
import { testPostController } from "../Controller/testcontroller.js";
import userAuth from "../middleware/authmiddleware.js";


//router object
const router  = express.Router()

//routes
router.post('/test-post', userAuth, testPostController)

export default router;