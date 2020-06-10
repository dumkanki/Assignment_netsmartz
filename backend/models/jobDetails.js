var mongoose = require("mongoose");;
var Schema = mongoose.Schema;

var jobSchema = new Schema(
  {
    jobTitle: { type: String, default: null },
    jobLocation: { type: String, default: null },
    jobDescription: { type: String, default: null },
    date: { type: Date, default: null },
    status: { type: String, default: null },
    isDeleted: { type: Boolean, default: false },    
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

var JobDetails = mongoose.model("JobDetails", jobSchema);
module.exports = JobDetails;
