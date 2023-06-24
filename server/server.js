const express = require("express");
const app = express();
const cors = require("cors");
const port = 1212;
const bodyParser = require("body-parser");
const { tempCron } = require("./cornjob/temp");
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
const userRouter = require("./routers/user");
const companyRouter = require("./routers/Company");
const ProjectRouter = require("./routers/Project");
const userProductRouter = require("./routers/userProduct");
const companyProductRouter = require("./routers/companyProduct");
app.use("/api/user", userRouter);
app.use("/api/company", companyRouter);
app.use("/api/project", ProjectRouter);
app.use("/api/userproduct", userProductRouter);
app.use("/api/companyproduct", companyProductRouter);

app.listen(port, "127.0.0.1", () => {
  console.log(`Example app listening on port ${port}`);
});
tempCron.start();
