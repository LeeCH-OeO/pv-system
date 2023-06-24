const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./schema/UserSchema");
mongoose.connect(process.env.MONGO_URL);

async function dbAddUser(userInfo) {
  const newUser = await User.create(userInfo);
  console.log(newUser._id);
  return newUser._id;
}
async function dbUpdateUser(Data) {
  const updatedData = Data.data;
  const oldUserInfo = await User.findByIdAndUpdate(
    Data.id,
    { $set: updatedData },
    {
      new: true,
    }
  );
  console.log(oldUserInfo);
}
async function dbDeleteUser(ID) {
  await User.findByIdAndUpdate(ID, { $set: { isActive: false } });
}
async function dbCheckUserExist(Data) {
  const result = await User.findOne({ $or: Data });
  if (result) {
    return result;
  } else {
    return false;
  }
}

async function dbCheckUserExistForProductLIst(Data) {
  const result = await User.findOne(Data);
  if (result) {
    console.log(result);
    return result;
  } else {
    console.log(result);
    return false;
  }
}

async function dbFindUser(Data) {
  const result = await User.findOne(Data);
  if (result) {
    return result;
  } else {
    return false;
  }
}
module.exports = {
  dbAddUser,
  dbUpdateUser,
  dbDeleteUser,
  dbCheckUserExist,
  dbFindUser,
  dbCheckUserExistForProductLIst,
};
