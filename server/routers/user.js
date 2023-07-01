const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {
  dbAddUser,
  dbUpdateUser,
  dbDeleteUser,
  dbCheckUserExist,
  dbFindUser,
  dbFindDeletedUser,
} = require("../db/User");

router.get("/profile", authenticateUser, async (req, res) => {
  const queryName = req.user.userName;
  const result = await dbFindUser({ userName: queryName });
  if (!result) {
    return res.status(404).json({ message: "Accound not found" });
  }
  return res.status(200).json({
    userName: result.userName,
    email: result.email,
    isUnlimited: result.isUnlimited,
  });
});

router.post("/signup", checkIfUserExist, saveUser, (req, res) => {
  res.sendStatus(201);
});

router.patch("/", authenticateUser, async (req, res) => {
  try {
    const queryID = req.user.userID;

    await dbUpdateUser({ ...req.body, id: queryID });

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete("/delete", authenticateUser, async (req, res) => {
  try {
    const userID = req.user.userID;
    await dbDeleteUser(userID);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post("/login", async (req, res) => {
  console.log("login", req.body);
  const result = await dbFindUser({ userName: req.body.userName });
  if (!result) {
    return res.status(404).json({ message: "Account not found" });
  }
  const compare = await bcrypt.compare(req.body.password, result.password);
  if (compare) {
    const accessToken = jwt.sign(
      { userName: result.userName, userID: result._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    if (!result.isActive) {
      return res.status(410).json({ message: "Account already deleted" });
    }
    res.status(200).json({
      message: "success",
      accessToken: accessToken,
    });
  } else res.status(401).json({ message: "incorrect password " });
});
router.get("/deleted-user", async (req, res) => {
  try {
    const result = await dbFindDeletedUser();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
async function saveUser(req, res, next) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userId = await dbAddUser({ ...req.body, password: hashedPassword });
    req.body.id = userId;
    next();
  } catch (error) {
    res.status(500).send();
  }
}

async function checkIfUserExist(req, res, next) {
  const result = await dbCheckUserExist([
    { userName: req.body.userName },
    { email: req.body.email },
  ]);
  console.log(result);
  if (result) {
    return res.status(409).json({ message: "User already exists" });
  }

  next();
}

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
module.exports = router;
