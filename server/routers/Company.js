const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {
  dbAddCompany,
  dbCheckCompanyExist,
  dbFindCompany,
  dbUpdateCompany,
  dbDeleteCompany,
} = require("../db/Conpany");
//routers
router.post("/signup", checkIfCompanyExist, saveCompany, (req, res) => {
  console.log(req.body);
  res.send({
    companyName: req.body.companyName,
    email: req.body.email,
    id: req.body.id,
  });
});

router.post("/login", async (req, res) => {
  const result = await dbFindCompany({ companyName: req.body.companyName });
  if (!result) {
    return res.status(404).json({ message: "Company not found" });
  }
  const compare = await bcrypt.compare(req.body.password, result.password);
  if (compare) {
    const accessToken = jwt.sign(
      { companyName: result.companyName, companyID: result._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({ message: "success", accessToken: accessToken });
  } else res.status(401).json({ message: "incorrect password " });
});

router.get("/profile", authenticateCompany, async (req, res) => {
  const queryName = req.company.companyName;
  const result = await dbFindCompany({ companyName: queryName });
  if (!result) {
    return res.status(404).json({ message: "Accound not found" });
  }
  res.json(result);
});

router.put("/", authenticateCompany, async (req, res) => {
  const queryID = req.company.companyID;

  await dbUpdateCompany({ ...req.body, id: queryID });
  res.send("updated");
});

router.delete("/delete", authenticateCompany, async (req, res) => {
  const companyID = req.company.companyID;
  await dbDeleteCompany(companyID);
  res.send("Deleted");
});

//
async function checkIfCompanyExist(req, res, next) {
  console.log(req.body);
  const result = await dbCheckCompanyExist([
    { companyName: req.body.companyName },
    { email: req.body.email },
  ]);
  if (result) {
    return res.status(409).json({ message: "company already exists" });
  }

  next();
}

async function saveCompany(req, res, next) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const companyId = await dbAddCompany({
      ...req.body,
      password: hashedPassword,
    });
    req.body.id = companyId;
    next();
  } catch (error) {
    res.status(500).send();
  }
}

function authenticateCompany(req, res, next) {
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
    req.company = decoded;
    next();
  });
}

module.exports = router;
