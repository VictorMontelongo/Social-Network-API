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
    timestamps: true, //should do the created at? 
  }
)

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId

    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 300,
    },

    username: {
      type: String,
      required: true,
    },
    // nesting the array of info within the reactionSchema
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  },

  {
    timestamps: true, //should do the created at? 
  }
)


const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;