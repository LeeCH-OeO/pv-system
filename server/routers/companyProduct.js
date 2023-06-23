const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {
  dbAddCompanyProduct,
  dbUpdateCompanyProduct,
  dbIfCompanyHaveProduct,
  dbDeleteCompanyProduct,
  dbCheckCompanyProductExist,
  dbCompanyProductListForUser,
  dbCompanyProductListForCompany,
} = require("../db/companyProduct");
const { dbCheckUserExistForProductLIst } = require("../db/User");
const { dbCheckCompanyExist } = require("../db/Conpany");

router.post(
  "/create",
  authenticateCompany,
  checkIfCompanyProductNameExist,
  async (req, res) => {
    const result = await dbAddCompanyProduct({
      ...req.body,
      createBy: req.company.companyID,
    });
    if (result) {
      return res.sendStatus(201);
    } else {
      return res.sendStatus(500);
    }
  }
);

router.patch("/update", authenticateCompany, async (req, res) => {
  console.log(req.body.data);
  if (req.company.companyID !== req.body.data.productInfo.createBy) {
    return res.sendStatus(401);
  }

  const result = await dbUpdateCompanyProduct({
    ID: req.body.id,
    data: req.body.data.productInfo,
  });
  if (result) {
    return res.sendStatus(201);
  } else {
    return res.sendStatus(500);
  }
});

router.delete(
  "/delete",
  authenticateCompany,
  ifCompanyHaveProduct,
  async (req, res) => {
    const result = await dbDeleteCompanyProduct(req.body.id);
    if (result) {
      return res.sendStatus(204);
    } else {
      return res.sendStatus(500);
    }
  }
);

router.get("/user-list", authenticateUser, ifUserExist, async (req, res) => {
  const result = await dbCompanyProductListForUser();
  if (result === 0 || !result) {
    return res.sendStatus(500);
  } else {
    return res.status(200).json(result);
  }
});

router.get(
  "/company-list",
  authenticateCompany,
  ifCompanyExist,
  async (req, res) => {
    const result = await dbCompanyProductListForCompany({
      createBy: req.company.companyID,
    });
    if (result === 0 || !result) {
      return res.sendStatus(500);
    } else {
      return res.status(200).json(result);
    }
  }
);

async function ifUserExist(req, res, next) {
  const result = await dbCheckUserExistForProductLIst({ _id: req.user.userID });
  if (!result) {
    return res.sendStatus(401);
  }
  next();
}

async function ifCompanyExist(req, res, next) {
  const result = await dbCheckCompanyExist([
    {
      _id: req.company.companyID,
    },
    {
      companyName: req.company.companyName,
    },
  ]);
  if (!result) {
    return res.sendStatus(401);
  }
  next();
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

async function ifCompanyHaveProduct(req, res, next) {
  const result = await dbIfCompanyHaveProduct({
    createBy: req.company.companyID,
    _id: req.body.id,
  });
  if (!result) {
    return res.sendStatus(401);
  }
  next();
}
async function checkIfCompanyProductNameExist(req, res, next) {
  const result = await dbCheckCompanyProductExist(req.body.productName);
  if (result) {
    return res.status(409).json({ message: "Product name already exists" });
  }

  next();
}
module.exports = router;
