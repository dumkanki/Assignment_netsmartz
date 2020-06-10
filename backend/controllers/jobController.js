"use strict";
var JobDetails = require("../models/jobDetails");
var constant = require("../config/constants");

var getPostList = function (req, res) {
    var defaultLang = req.headers.currentlang ? req.headers.currentlang : "en";
    JobDetails.find(
        {
            isDeleted: false,
        },
        function (err, jobData) {
            if (err) {
                return res.json({
                    status: 301,
                    msg: constant.message[defaultLang].default_error
                });
            }
            else {
                return res.json({
                    status: 200,
                    msg: constant.message[defaultLang].job_fectched,
                    data: jobData
                });
            }
        })
};

var getJobDataToUpdate = function (req, res) {
    var defaultLang = req.headers.currentlang ? req.headers.currentlang : "en";
    JobDetails.findOne(
        {
            _id: req.body.data,
            isDeleted: false,
        },
        function (err, jobData) {
            if (err) {
                return res.json({
                    status: 301,
                    msg: constant.message[defaultLang].default_error
                });
            }
            else {
                return res.json({
                    status: 200,
                    msg: constant.message[defaultLang].job_fectched,
                    data: jobData
                });
            }
        })
};

var addJobPost = function (req, res) {
    var defaultLang = req.headers.currentlang ? req.headers.currentlang : "en";
    var data = {
        jobTitle: req.body.data.jobTitle,
        jobLocation: req.body.data.jobLocation,
        jobDescription: req.body.data.jobDescription,
        date: req.body.data.date,
        status: req.body.data.status,
    };
    var job_data = new JobDetails(data);
    job_data.save(function (err, jobDetails) {
        if (err) {
            return res.json({
                status: 404,
                msg: constant.message[defaultLang].param_missing,
                error: err
            });
        } else {
            return res.json({
                status: 200,
                msg: constant.message[defaultLang].job_added,
                data: jobDetails
            });
        }
    });
}

var deleteJobData = function (req, res) {
    var defaultLang = req.headers.currentlang ? req.headers.currentlang : "en";
    JobDetails.updateOne({ _id: req.body.data }, {
        $set: {
            isDeleted: true
        }
    }).exec((err, result) => {
        if (err) {
            return res.json({
                status: 301,
                msg: constant.message[defaultLang].default_error
            });

        } else if (!result) {
            return res.json({
                status: 301,
                msg: constant.message[defaultLang].default_error
            });

        } else {
            JobDetails.find(
                {
                    isDeleted: false,
                },
                function (err, jobData) {
                    if (err) {
                        return res.json({
                            status: 301,
                            msg: constant.message[defaultLang].default_error
                        });
                    }
                    else {
                        return res.json({
                            status: 200,
                            msg: constant.message[defaultLang].job_delete,
                            data: jobData
                        });
                    }
                })
        }
    })
}

var updateJobData = function (req, res) {
    var defaultLang = req.headers.currentlang ? req.headers.currentlang : "en";
    JobDetails.updateOne({ _id: req.body.data.id }, {
        $set: {
            jobTitle: req.body.data.jobTitle,
            jobLocation: req.body.data.jobLocation,
            jobDescription: req.body.data.jobDescription,
            date: req.body.data.date,
            status: req.body.data.status,
        }
    }, { new: true }).exec((err, resp) => {
        if (resp) {
            return res.json({
                status: 200,
                msg: constant.message[defaultLang].job_update
            });
        }
        else {
            return res.json({
                status: 500,
                msg: constant.message[defaultLang].error_update
            });
        }
    })
}

exports.getPostList = getPostList;
exports.addJobPost = addJobPost;
exports.updateJobData = updateJobData;
exports.deleteJobData = deleteJobData;
exports.getJobDataToUpdate = getJobDataToUpdate;

