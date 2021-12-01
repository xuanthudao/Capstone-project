const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const session = require("express-session");
const url = 'mongodb+srv://xuanthudao:xuanthu11@cluster0.xp4db.mongodb.net/Capstone?retryWrites=true&w=majority';
const {PORT = 4000} = process.env;

//middlewares
app.use(morgan("dev"));
app.use(express.json());
/*app.use(express.urlencoded({ extended: false }));*/
app.use(express.static("public"));

app.use(
    session({secret: "secret", cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
        },
        resave: true,
        saveUninitialized: false,
    })
);

//MongoDB connection
mongoose.connect(
    `${url}`, { useNewUrlParser: true, useUnifiedTopology: true },
    (e) => {
        e
            ? console.log(`Error connecting to database ${e}`)
            : console.log(`Successfully connected to the database`);
    }
);
//MongoDB Schema
const { Schema } = mongoose;
const UserSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
module.exports = User;

/*const myForm = document.getElementById("my-form");
const email = document.querySelector('input[name="email"]').value;
const password = document.querySelector('input[name="password"]').value;*/

/*//create user
const createUser = async ({ firstName, lastName, email, password }) => {
    try {
        let newUser = new User();
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.email = email;
        newUser.password = password;
        if (await newUser.save()) {
            return [true, newUser];
        }
    }
};

const checkUserByEmail = async (email) => await User.findOne({ email });

//To validate user password
const validatePassword = async (formPassword, dbPassword) =>
    await compare(formPassword, dbPassword);*/


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));
