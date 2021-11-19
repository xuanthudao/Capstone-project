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
app.use(express.urlencoded({ extended: false }));
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
const myForm = document.getElementById("my-form");

if (window.location.href.includes("login")) {
    const errorDisplay = document.getElementById("status");
    myForm.addEventListener("submit", async (e) => {
        errorDisplay.textContent = "";
        e.preventDefault(); //don't send form if empty input
        const email = document.querySelector('input[name="email"]').value;
        const password = document.querySelector('input[name="password"]').value;
    });
}
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));
