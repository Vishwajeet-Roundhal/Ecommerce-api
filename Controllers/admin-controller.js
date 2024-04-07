const User = require("../models/userSchema");

const getUsersByAdmin = async (req, res) => {
  try {
    const data = await User.find().select("-password");
    if (!data) {
      return res.status(401).json({ msg: "No users found" });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "getting error in admin for users" });
  }
};

const getSingleUserByAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const userData = await User.find({ _id: id });
    if (!userData) {
      return res.status(404).json({ msg: "user not found" });
    }
    return res.status(200).json(userData);
  } catch (error) {
    return res.status(500).json({ error: "error getting single user" });
  }
};

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const userData = req.body;
    const updateUser = await User.updateOne(
      { _id: id },
      {
        $set: userData,
      }
    );
    if (!updateUser) {
      return res.status(404).json({ msg: "update failed" });
    }
    return res.status(200).json(updateUser);
  } catch (error) {
    return res.status(500).json({ error: "Error updating the user." });
  }
};

const deleteUserById = async (req,res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.deleteOne({ _id: id });
    if (!deletedUser) {
      return res.status(404).json({ msg: "user not found" });
    }
    return res.status(200).json({ msg: "user deleted" });
  } catch (error) {
    return res.status(500).json({ error: "error" });
  }
};

module.exports = {
  getUsersByAdmin,
  getSingleUserByAdmin,
  updateUserById,
  deleteUserById,
};
