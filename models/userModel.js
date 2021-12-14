const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, min: 8, max: 1024 },
        image: String,
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
