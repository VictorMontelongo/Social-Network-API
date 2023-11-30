const { Schema, Types, model } = require("mongoose");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: [1],
      maxLength: [300],
    },
    username: {
      type: String,
      required: true,
    },

    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reaction"
      }
    ]
  },
  {
    timestamps: true,
  }
)


const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;