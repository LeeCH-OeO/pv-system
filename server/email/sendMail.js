const nodemailer = require("nodemailer");
require("dotenv").config();
function reportEmail(data) {
  console.log(data);
  const mailText = data.outputList
    .map(
      (item) =>
        `${item.companyProductName} at (${item.lat}, ${item.lon}), output is ${item.output} kWh`
    )
    .join("\n");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "fairprice81000@gmail.com",
      pass: process.env.EMAIL,
    },
  });
  const mailOptions = {
    from: "fairprice81000@gmail.com",
    to: data.email,
    subject: `${data.projectName}'s power output report`,
    text: mailText,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
module.exports = { reportEmail };
