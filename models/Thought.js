const { Schema, Types, model } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId

    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },

    username: {
      type: String,
      required: true,
    },
    // nesting the array of info within the reactionSchema
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
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: [1],
      maxLength: [280],
    },
    username: {
      type: String,
      required: true,
    },

    reactions: [reactionSchema]

  },
  {
    timestamps: true, //should do the created at? 
  }
)

// creating the reactionCount 
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
