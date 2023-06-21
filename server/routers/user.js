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
} = require("../db/User");

router.get("/profile", authenticateUser, async (req, res) => {
  const queryName = req.user.userName;
  const result = await dbFindUser({ userName: queryName });
  if (!result) {
    return res.status(404).json({ message: "Accound not found" });
  }
  res.json(result);
});

router.post("/signup", checkIfUserExist, saveUser, (req, res) => {
  console.log(req.body);
  res.send({
    userName: req.body.userName,
    email: req.body.email,
    id: req.body.id,
  });
});

router.put("/", authenticateUser, async (req, res) => {
  const queryID = req.user.userID;

  await dbUpdateUser({ ...req.body, id: queryID });
  //   next();
  res.send("updated");
});

router.get("/delete", authenticateUser, async (req, res) => {
  const userID = req.user.userID;
  await dbDeleteUser(userID);
  res.send("Deleted");
});

router.post("/login", async (req, res) => {
  const result = await dbFindUser({ userName: req.body.userName });
  if (!result) {
    return res.status(404).json({ message: "Accound not found" });
  }
  const compare = await bcrypt.compare(req.body.password, result.password);
  if (compare) {
    const accessToken = jwt.sign(
      { userName: result.userName, userID: result._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({ message: "success", accessToken: accessToken });
  } else res.status(401).json({ message: "incorrect password " });
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
  if (result) {
    return res.status(409).json({ message: "User already exists" });
  }

  next();
}

// async function updateUser(req, res, next) {
//   await dbUpdateUser(req.body);
//   next();
// }

// async function deleteUser(req, res, next) {
//   await dbDeleteUser(req.body.id);
//   next();
// }

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
