const { Thought, } = require("../models")

module.exports = {
  // get all thoughts
  async getAllThoughts(req, res) {
    try {
      const payload = await Thought.find().populate(["thought", "reaction"]);
      res.json({ status: "success", payload });
    } catch (err) {
      console.log(err.message)
      res.status(500).json({ status: "error", payload: err.message })
    }
  },
  // Get a Thought
  async getThoughtById(req, res) {
    try {
      const payload = await Thought.findOne({ _id: req.params.id });
      res.json({ status: "success", payload })
    } catch (err) {
      console.log(err.message)
      res.status(500).json({ status: "error", payload: err.message })
    }
  },
  // Create a Thought
  async createThought(req, res) {
    try {
      const payload = await Thought.create(req.body);
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
        { $set: req.body },
        { runValidators: true, new: true }
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
      const payload = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
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
      const payload = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: params.reactionId } }, { new: true, runValidators: true });
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
      const payload = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: params.reactionId } } }, { new: true });
      if (!payload) {
        res.status(404).json({ message: "No user with that ID" });
      }
      res.json({ status: "success", payload })
    } catch (err) {
      res.status(500).json({ status: error, payload: err.mesage })
    }
  }

}