const express = require("express");
const app = express();
const cors = require("cors");
const port = 1212;
const bodyParser = require("body-parser");
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10", extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
const userRouter = require("./routers/user");
const companyRouter = require("./routers/Company");

app.use("/api/user", userRouter);
app.use("/api/company", companyRouter);
app.listen(port, "127.0.0.1", () => {
  console.log(`Example app listening on port ${port}`);
});
