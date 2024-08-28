import express from "express";
import userAuth from "../middleware/authmiddleware.js";
import {
  createjob,
  deletejob,
  getjob,
  updatejob,
  jobsStatsController,
  getAllJob,
} from "../Controller/JobController.js";

const router = express.Router();

//routes

//create JOB
router.post("/create-job", userAuth, createjob);

//GET JOB
router.get("/get-job", userAuth, getjob);

//UPDATE JOB
router.put("/update-job/:id", userAuth, updatejob);

//DELETE JOB
router.delete("/delete-job/:id", userAuth, deletejob);

//JOBS STATS FILTER ||
router.get("/job-stats", userAuth, jobsStatsController);

//ALL JOBS BY FILTER
router.get("/get-Alljob", userAuth, getAllJob);

export default router;
