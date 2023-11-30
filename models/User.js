const { Schema, Types } = require("mongoose");
const { User } = require("./index")

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
        ref: "User"
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
    toJSON: {

    },
    id: false,

  }
)

const User = mongoose.model("User", thoughtSchema);

module.exports = User;