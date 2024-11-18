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
app.get('/user', async (req, res) => {
        const users = await User.find(); //same as SELECT * FROM
        res.json(users);
})

//getting data by ID
app.get('/user/:id', async (req, res) => {
    const user = await User.findById(req.params.id) //requires parameter id in the URL
    res.json(user);
})

//updating a user by ID
app.put('/user/:id', async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, 
        { new: true, runValidators: true});
    if(!updatedUser) {
        return res.status(404).json({ message: "Item Not Found" })
    }

    res.json(updatedUser);
})

//Deleting User
app.delete('/user/:id', async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User is Deleted", deletedUser})
})

//Creating data
app.post('/user', async (req, res) => {
    try{
        const newUser = new User(req.body); //creating user request
        await newUser.save(); //saving the user in the database
        res.status(201).json(newUser); //respond of the created user
        res.json("Added Successfully");

    }catch (err) {
        console.log("I have an error", err)
    }

})
app.listen(PORT, () => {
    console.log("I am running...")
})