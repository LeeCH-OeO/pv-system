const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { updateWeather } = require("../updateWeather/updateWeather");
const { dbGetPorjectReport } = require("../db/projectReport");
const {
  dbAddProject,
  dbCheckProjectName,
  dbFinishProject,
  dbGetProject,
} = require("../db/project");

router.post("/create", authenticateUser, checkProjectName, async (req, res) => {
  console.log(req.user.userID);
  const result = await dbAddProject(req.body, req.user.userID);
  if (result) {
    res.status(201).json({ projectID: result });
  }
});
router.post("/update-now", authenticateUser, async (req, res) => {
  await updateWeather(req.user);
  res.sendStatus(200);
});

router.post("/report", authenticateUser, async (req, res) => {
  const result = await dbGetPorjectReport(req.body);
  if (result) {
    res.status(200).json({ result });
  }
});
router.get("/", authenticateUser, async (req, res) => {
  const queryResult = await dbGetProject(req.user.userID);
  if (queryResult.length !== 0) {
    return res.status(200).json(queryResult);
  } else {
    return res.sendStatus(404);
  }
});

router.delete("/finish", authenticateUser, async (req, res) => {
  const data = {
    _id: req.body.projectID,
    createBy: req.user.userID,
    projectName: req.body.projectName,
    start: req.body.start,
    end: req.body.end,
  };

  const result = await dbFinishProject(data);
  if (result) {
    res.sendStatus(204);
  } else res.sendStatus(500);
});

function authenticateUser(req, res, next) {
  // Extract the JWT from the request header, e.g., in the "Authorization" header
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed: No token provided." });
  }

  // Verify the token using the secret key
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Authentication failed: Invalid token." });
    }
    // Store the decoded user information in the request object for later use
    req.user = decoded;
    next();
  });
}

async function checkProjectName(req, res, next) {
  const result = await dbCheckProjectName({
    projectName: req.body.projectName,
  });
  if (result) {
    return res.status(409).json({ message: "Project already exists" });
  }
  next();
}
module.exports = router;
