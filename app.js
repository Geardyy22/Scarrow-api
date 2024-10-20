const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const app = express();
const PORT = 3000;

const databaseURL = 'mongodb+srv://msgeared:Passed!23@scarrow-system.gf1db.mongodb.net/?retryWrites=true&w=majority'

//create database connection
mongoose.connect(databaseURL, { useNewUrlParser: true, useunifiedTopology: true})
    .then(() => console.log("MongoDB connected..."))
    .catch(err => console.log("MongoDB connection Error..."))


app.use(express.json());

//get data
app.get('/users', async (req, res) => {
        const users = await User.find(); //same as SELECT * FROM
        res.json(users);
})

//Creating data
app.post('/user', async (req, res) => {
    try{
        const newUser = new User(req.body); //creating user request
        await newUser.save(); //saving the user in the database
        res.status(201).json(newUser); //respond of the created user

    }catch (err) {
        console.log("I hae an error", err)
    }

})
app.listen(PORT, () => {
    console.log("I am running...")
})