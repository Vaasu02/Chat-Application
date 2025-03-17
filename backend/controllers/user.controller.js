import User from "../models/User.model.js";

export const getUsersforSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    //here we are finding all users except the logged in user using $ne operator
    const filteredUser = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
