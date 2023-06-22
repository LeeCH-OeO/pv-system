const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const {
  dbAddUserProduct,
  dbUpdateuserProduct,
  dbDeleteUserProduct,
  dbIfUserHaveProduct,
  dbGetProduct,
} = require("../db/userProduct");

router.post("/create", authenticateUser, async (req, res) => {
  console.log(req.user.userID);
  const result = await dbAddUserProduct({
    ...req.body,
    createBy: req.user.userID,
  });
  if (result) {
    res.sendStatus(201);
  } else {
    res.sendStatus(500);
  }
});

router.patch("/update", authenticateUser, async (req, res) => {
  if (req.user.userID !== req.body.data.createBy) {
    return res.send(401);
  }
  const result = await dbUpdateuserProduct({
    data: req.body.data,
    id: req.body.id,
  });
  if (result) {
    res.sendStatus(201);
  } else {
    res.sendStatus(500);
  }
});

router.post("/", authenticateUser, async (req, res) => {
  console.log(req.body);
  const queryResult = await dbGetProduct({
    createBy: req.user.userID,
    projectID: req.body.projectID,
  });
  if (queryResult.length !== 0) {
    return res.status(200).json(queryResult);
  } else {
    return res.sendStatus(404);
  }
});

router.delete(
  "/delete",
  authenticateUser,
  ifUserHaveProduct,
  async (req, res) => {
    const result = await dbDeleteUserProduct(req.body.id);
    if (result) {
      res.sendStatus(204);
    } else res.sendStatus(500);
  }
);

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

async function ifUserHaveProduct(req, res, next) {
  const result = await dbIfUserHaveProduct({
    createBy: req.user.userID,
    _id: req.body.id,
  });
  if (!result) {
    return res.sendStatus(401);
  }
  next();
}

module.exports = router;
