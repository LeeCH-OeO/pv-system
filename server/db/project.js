const mongoose = require("mongoose");
require("dotenv").config();
const Project = require("./schema/ProjectSchema");
const { createReport } = require("../createReport/createReport");
mongoose.connect(process.env.MONGO_URL);

async function dbAddProject(ProjectInfo, userID) {
  const newProject = await Project.create({
    ...ProjectInfo,
    createBy: userID,
    createAt: new Date().toISOString(),
  });
  return newProject._id;
}
async function dbCheckProjectName(Data) {
  const result = await Project.findOne(Data);
  if (result) {
    return true;
  } else {
    return false;
  }
}
async function dbFinishProject(data) {
  const result = await Project.findOneAndUpdate(
    { _id: data._id, createBy: data.createBy },
    { isActive: false }
  );
  if (result) {
    await createReport(data);
    return true;
  } else {
    return false;
  }
}

async function dbGetProject(ID) {
  const result = await Project.find({ createBy: ID });
  if (result) {
    return result;
  }
}
async function dbProjectList(data) {
  const result = await Project.find(data);
  if (result) {
    return result;
  }
}
async function dbGetProjectName(data) {
  const result = await Project.findOne(data);
  if (result) {
    return result;
  }
}
module.exports = {
  dbAddProject,
  dbCheckProjectName,
  dbFinishProject,
  dbGetProject,
  dbProjectList,
  dbGetProjectName,
};
