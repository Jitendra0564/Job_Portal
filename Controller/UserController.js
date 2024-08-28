import Usermodal from "../Modals/Usermodal.js";

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;
  //validate
  if (!name) {
    next("name is required");
  }
  if (!email) {
    next("please provide email");
  }
  if (!password) {
    next("please provide password");
  }
  const existiguser = await Usermodal.findOne({ email });
  if (existiguser) {
    next("Email already register please login");
  }
  const user = await Usermodal.create({ name, email, password });
  const token = user.createJWT();
  res.status(201).send({
    success: true,
    message: "User Registered Successfully",
    user,
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next("Please provide All fields");
  }
  const user = await Usermodal.findOne({ email }).select("+password");
  if (!user) {
    next("Invalid Credential");
  }

  //compare password
  const isMatch = await user.comparepassword(password);
  if (!isMatch) {
    next("password does not  match");
  }
  user.password = undefined;
  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: "Login Successfully",
    user,
    token,
  });
};

export const updateUserController = async (req, res) => {
  const { email, name, location } = req.body;
  if (!name || !email) {
    next("Please provide all fields");
  }
  const user = await Usermodal.findOne({ _id: req.body.user.userId });
  user.name = name;
  user.email = email;
  //user.password = password;
  user.location = location;

  await user.save();
  const token = user.createJWT();
  res.status(200).json({
    user,
    token,
  });
};

export const getUserController = async (req, res, next) => {
  try {
    const user = await Usermodal.findById({ _id: req.body.user.userId });
    user.password = undefined;
    if (!user) {
      return res.status(400).send({
        message: "User Not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error: error.message,
    });
  }
};

// Controller function to get user data
export const getUserIdController = async (req, res) => {
  try {
    const user = await Usermodal.findById({ _id: req.body.user.userId });
    user.password = undefined;
    if (!user) {
      return res.status(400).send({
        message: "User Not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error: error.message,
    });
  }
};
