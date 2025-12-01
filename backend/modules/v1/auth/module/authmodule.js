import User from "../../../../model/User.js";
import bcrypt from "bcrypt";
import { generateRefreshToken } from "../../../../utils/jwt.js";

const authmoule = {
  async signup(req, res) {
    try {
      const { username, password, email, socialId, signuptype } = req.body;
      if (!email && !socialId) {
        return res.status(400).json({ msg: "Email or Social ID is required" });
      }
      let newUser;
      if (signuptype === "N") {
        const exsitingUser = await User.findOne({ email });
        console.log(exsitingUser);
        if (exsitingUser) {
          return res.status(400).json({ msg: "User already exists" });
        }
      } else {
        const socialUser = await User.findOne({ signuptype, socialId });
        if (socialUser) {
          return res.status(400).json({ msg: "socialID already exists" });
        }
      }
      if (signuptype && signuptype !== "N") {
        newUser = new User({
          signuptype,
          socialId,
        });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        newUser = new User({
          username,
          email,
          password: hashedPassword,
          signuptype: "N",
        });
      }
      await newUser.save();
      return res
        .status(200)
        .json({ msg: "User created successfully", data: newUser });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ msg: "Internal server error", error: error.message });
    }
  },
  async login(req, res) {
    const { signuptype, email, password, socialId } = req.body;
    let user;

    if (signuptype === "N") {
      if (!email || !password) {
        return res.status(400).json({ msg: "Email and password are required" });
      }
      user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        return res.status(400).json({ msg: "User not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
    } else {
      if (!socialId) {
        return res.status(400).json({ msg: "Social ID is required" });
      }
      user = await User.findOne({ signuptype, socialId });
      if (!user) {
        return res.status(400).json({ msg: "User not found" });
      }
    }
    const token = generateRefreshToken(user);
    user.refreshToken = token;
    await user.save();
    return res.status(200).json({ msg: "Login successful", token: token });
  },
  async logout(req, res) {
    try {
      const { userid } = req.body;
      const user = await User.findOne({ _id: userid });
      if (!user) {
        return res.status(400).json({ msg: "User not found" });
      }
      await User.findByIdAndUpdate(userid, { refreshToken: null });
      return res.status(200).json({ msg: "Logout successful" });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Internal server error", error: error.message });
    }
  },
};

export default authmoule;
