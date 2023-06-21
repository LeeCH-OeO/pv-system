const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {
  dbAddCompany,
  dbCheckCompanyExist,
  dbFindCompany,
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
module.exports = router;
