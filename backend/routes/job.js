var express = require("express");
var app = express();
var router = express.Router();

var jobCtrl = require("../controllers/jobController");

router.use("/addJobPost", jobCtrl.addJobPost);
router.use("/getPostList", jobCtrl.getPostList);
router.use("/updateJobData", jobCtrl.updateJobData);
router.use("/deleteJobData", jobCtrl.deleteJobData);
router.use("/getJobDataToUpdate", jobCtrl.getJobDataToUpdate);


module.exports = router;
