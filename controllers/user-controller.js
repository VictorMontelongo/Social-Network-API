const { User, Thought, } = require("../models")

module.exports = {
  // get all users
  async getAllUsers(req, res) {
    try {
      const payload = await User.find().select("-__v");
      res.json({ status: "success", payload });
    } catch (err) {
      console.log(err.message)
      res.status(500).json({ status: "error", payload: err.message })
    }
  },
  // Get a User
  async getUserById(req, res) {
    try {
      const payload = await User.findOne({ _id: req.params.id }).select("-__v")
        .populate([{ path: "thoughts", select: "--__v" },
        { path: "friends", select: "--__v" }]);
      res.json({ status: "success", payload })
    } catch (err) {
      console.log(err.message)
      res.status(500).json({ status: "error", payload: err.message })
    }
  },
  // Create a User
  async createUser(req, res) {
    try {
      const payload = await User.create(req.body);
      res.json({ status: "success", payload });
    } catch (err) {
      console.log(err.message);
      res.status({ status: "error", payload: err.message })
    }
  },
  // Update a User
  async updateUserById(req, res) {
    try {
      const payload = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true }
      );

      if (!payload) {
        res.status(404).json({ message: "No user with this id!" });
      }

      res.json({ status: "success", payload })
    } catch (err) {
      res.status(500).json({ status: "error", payload: err.message })
    }
  },
  // Delete a User
  async deleteUserById(req, res) {
    try {
      const payload = await User.findOneAndDelete({ _id: req.params.userId });
      for (var i = 0; i < XPathResult.thoughts.length; i++)
        await Thought.findByIdAndDelete(payload.thoughts[i]);
      if (!payload) {
        res.status(404).json({ message: "No user with that ID" });
      }
      res.json({ status: "success and deleted", payload })
    } catch (err) {
      res.status(500).json({ status: error, payload: err.mesage })
    }
  },

  async addFriend(req, res) {
    try {
      const payload = await User.findOneAndUpdate({ _id: req.params.userId }, { $push: { friends: params.friendId } }, { new: true });
      if (!payload) {
        res.status(404).json({ message: "No user with that ID" });
      }
      res.json({ status: "success", payload })
    } catch (err) {
      res.status(500).json({ status: error, payload: err.mesage })
    }
  },

  async deleteFriend(req, res) {
    try {
      const payload = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: { friendId: params.friendId } } }, { new: true });
      if (!payload) {
        res.status(404).json({ message: "No user with that ID" });
      }
      res.json({ status: "success, no more friend", payload })
    } catch (err) {
      res.status(500).json({ status: error, payload: err.mesage })
    }
  }

}