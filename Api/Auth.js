const express = require("express");
const User = require("../model/user");
const app = express();
const bcrypt = require("bcryptjs");
const { emailRegexp } = require("../validate/index");
const jwt = require("jsonwebtoken");
app.use(express.json());

//Register Api
app.post("/Register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!emailRegexp.test(email)) {
      res.status(400).send({ message: "Invalid Email Address" });
    } else if (!email) {
      res.status(400).send("Email Address is required");
    }
    let user = {};
    const oldUser = await User.find({ email: email });
    console.log("oldUJser-====>", oldUser);
    if (oldUser.length > 0) {
      res.status(400).send({ message: "Email Address already registered" });
    } else {
      encryptedPassword = await bcrypt.hash(password, 10);
      user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });
    }

    // Create token
    // const token = jwt.sign(
    //   { user_id: user._id, email },
    //   process.env.TOKEN_KEY,
    //   {
    //     expiresIn: "6h",
    //   }
    // );
    // // save user token
    // user.token = token;

    // return new user
    res.send({ message: 200, data: res.status(200).json({ data: user }) });
  } catch (err) {}
});

app.post("/Login", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json({ data: user });
    }
    res.status(400).json({ message: "Invalid Credentials" });
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

// getAllUser

app.get("/getAllUser", async (req, res) => {
  try {
    const AllUser = await User.find();
    res.send({
      message: "Success",
      data: res.status(200).json({ data: AllUser }),
    });
  } catch (error) {
    res.status(400).send({ message: "No User Found" });
  }
});
//getUserById
app.get("/getAllUserById/:id", async (req, res) => {
  try {
    console.log("params====>", req?.params?.id);
    const user = await User.findById({ _id: req.params?.id });
    res.send({
      message: "User Found",
      data: res.status(200).json({ data: user }),
    });
    // res.setHeader('')
  } catch (error) {
    res.status(400).send({ message: "No User Found" });
  }
});
module.exports = app;
