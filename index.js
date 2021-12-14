const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const session = require("express-session");
const url = 'mongodb+srv://xuanthudao:xuanthu11@cluster0.92v5l.mongodb.net/Test?retryWrites=true&w=majority';
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
app.use("/", require("./routes/pages"));
app.use("/profile", require("./routes/profile"));
//MongoDB connection
mongoose.connect(
    `${url}`, { useNewUrlParser: true, useUnifiedTopology: true },
    (e) => {
        e
            ? console.log(`Error connecting to database ${e}`)
            : console.log(`Successfully connected to the database`);
    }
);
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));
