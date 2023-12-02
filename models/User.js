const { Schema, model } = require("mongoose");

// email validation
const validator = require('validator');

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
      validator: function (v) {
        return validator.isEmail(v);
      },
      message: "{value} is not a vaild email"
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
    timestamps: true,
    id: false,
  },
  {
    // sending to json
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
)

const User = model("User", userSchema);

module.exports = User;