const User = require("../models/userModel");
const { translateError } = require("../services/mongo_helper");
const bcrypt = require("bcryptjs");

//To hash pasword
const hashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(15);
    return await bcrypt.hash(password, salt);
};

// create user
const createUser = async ({ firstName, lastName, email, password }) => {
    try {
        let newUser = new User();
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.email = email;
        newUser.password = await hashedPassword(password);
        if (await newUser.save()) {
            return [true, newUser];
        }
    } catch (err) {
        return [false, translateError(err)];
    }
};

const checkUserByEmail = async (email) => await User.findOne({ email });

//To validate user password
const validatePassword = async (formPassword, dbPassword) =>
    await bcrypt.compare(formPassword, dbPassword);

module.exports = { createUser, checkUserByEmail, validatePassword };
