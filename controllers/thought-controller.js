const { trusted } = require("mongoose");
const { Thought, User } = require("../models")

module.exports = {
  // get all thoughts
  async getAllThoughts(req, res) {
    try {
      const payload = await Thought.find().populate(["thought", "reaction"]).select("-__v");
      res.json({ status: "success", payload });
    } catch (err) {
      console.log(err.message)
      res.status(500).json({ status: "error", payload: err.message })
    }
  },
  // Get a Thought
  async getThoughtById(req, res) {
    try {
      const payload = await Thought.findOne({ _id: req.params.thoughtId }).select("-__v");
      res.json({ status: "success", payload })
    } catch (err) {
      console.log(err.message)
      res.status(500).json({ status: "error", payload: err.message })
    }
  },
  // Create a Thought
  async createThought(req, res) {
    try {
      const payload = await Thought.create({
        thoughtText: req.body.thoughtText,
        username: req.body.username
      });
      await User.findOneAndUpdate({
        _id: req.nody.userId
      },
        {
          $push: { thoughts: payload._id }
        });
      res.json({ status: "success", payload });
    } catch (err) {
      console.log(err.message);
      res.status({ status: "error", payload: err.message })
    }
  },
  // Update a Thought
  async updateThoughtById(req, res) {
    try {
      const payload = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { thoughtText: req.body.thoughtText },
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
  // Delete a Thought
  async deleteThoughtById(req, res) {
    try {
      const payload = await Thought.findOneAndDelete(req.params.thoughtId);
      await User.findOneAndUpdate(
        {
          username: payload.username
        },
        {
          $pull: { thoughts: payload._id }
        }
      );
      if (!payload) {
        res.status(404).json({ message: "No user with that ID" });
      }
      res.json({ status: "success", payload })
    } catch (err) {
      res.status(500).json({ status: error, payload: err.mesage })
    }
  },

  async addReaction(req, res) {
    try {
      const payload = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $push: { reactions: req.body } }, { new: trusted });
      await payload.save();
      if (!payload) {
        res.status(404).json({ message: "No user with that ID" });
      }
      res.json({ status: "success", payload })
    } catch (err) {
      res.status(500).json({ status: error, payload: err.mesage })
    }
  },

  async deleteReaction(req, res) {
    try {
      const payload = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
      if (!payload) {
        res.status(404).json({ message: "No user with that ID" });
      }
      res.json({ status: "success delete", payload })
    } catch (err) {
      res.status(500).json({ status: error, payload: err.mesage })
    }
  }

}