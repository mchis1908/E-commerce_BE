const express = require("express");
const env = require("dotenv");
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

//routes

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');

//environment variable
env.config();

// mongodb connect
//mongodb+srv://root:<password>@cluster0.dun0jsb.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.dun0jsb.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`)
    .then(() => {
        console.log("Database connected")
    });


app.use(bodyParser.json())
app.use("/api", authRoutes);
app.use("/api", adminRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});