import Jobmodels from "../Modals/Jobmodels.js";
import mongoose from "mongoose";
import moment from "moment";

export const createjob = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("Please Provide All fields");
  }

  req.body.createdBy = req.body.user.userId;
  const job = await Jobmodels.create(req.body);
  res.status(200).json({ job });
};

export const getjob = async (req, res, next) => {
  const jobs = await Jobmodels.find({ createdBy: req.body.user.userId });
  res.status(200).json({
    total_jobs: jobs.length,
    jobs,
  });
};

export const updatejob = async (req, res, next) => {
  const { id } = req.params;
  console.log("id", id);
  const { company, position } = req.body;
  if (!company || !position) {
    next("Please Provie All fields");
  }
  const job = await Jobmodels.findOne({ _id: id });
  console.log(id);
  if (!job) {
    next(`Job not found with this ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("you are not autherized to update this job");
    return;
  }
  const updatejob = await Jobmodels.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    updatejob,
  });
};

export const deletejob = async (req, res, next) => {
  const { id } = req.params;

  const job = await Jobmodels.findOne({ _id: id });
  if (!job) {
    next("Job not found");
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("you are not authorized to delete the job");
    return;
  }
  await job.deleteOne();
  res.status(200).json({
    message: "Successfully deleted",
  });
};

//JOBS STATS FILTER
export const jobsStatsController = async (req, res) => {
  const stats = await Jobmodels.aggregate([
    //search by user jobs
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
  //Default Stats
  const defaultstats = {
    Pending: stats.Pending || 0,
    Reject: stats.Reject || 0,
    interview: stats.interview || 0,
  };

  //Monthly Yearly Stats
  let MonthlyApplication = await Jobmodels.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },

        count: {
          $sum: 1,
        },
      },
    },
  ]);

  MonthlyApplication = MonthlyApplication.map((item) => {
    const {
      _id: { year, month },
      count,
    } = item;
    const date = moment()
      .month(month - 1)
      .year(year)
      .format("MMM Y");
    return { date, count };
  }).reverse();
  res.status(200).json({
    total_stats: stats.length,
    stats,
    defaultstats,
    MonthlyApplication,
  });
};

//Get ALL JOBS
export const getAllJob = async (req, res, next) => {
  const { status, workType, search, sort } = req.query;

  //Condition for searching filter
  const queryObject = {
    createdBy: req.body.user.userId,
  };
  //logic filter
  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (workType && workType !== "all") {
    queryObject.workType = workType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
  let queryResult = Jobmodels.find(queryObject);

  if (sort === "latest") {
    queryResult = await queryResult.sort("-createdAt");
  }
  if (sort === "oldest") {
    queryResult = await queryResult.sort("createdAt");
  }
  const jobs = await queryResult;
  res.status(200).json({
    total_jobs: jobs.length,
    jobs,
  });
};
