const mongoose = require("mongoose");
require("dotenv").config();
const Project = require("./schema/ProjectSchema");
mongoose.connect(process.env.MONGO_URL);

async function dbAddProject(ProjectInfo, userID) {
  const newProject = await Project.create({ ...ProjectInfo, createBy: userID });
  console.log(newProject._id);
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
    { projectName: data.projectName, createBy: data.createBy },
    { isActive: false }
  );
  if (result) {
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
module.exports = {
  dbAddProject,
  dbCheckProjectName,
  dbFinishProject,
  dbGetProject,
};
