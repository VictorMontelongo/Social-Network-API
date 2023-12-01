const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      // validate: need to add
      required: true,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought"
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],

  },
  {
    // sending to json
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
  {
    timestamps: true,

    id: false,

  }
)

const User = model("User", userSchema);

module.exports = User;