const express = require('express');
const mongoose = require('mongoose');
const FoodModel = require('./models/Food');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors())

mongoose.connect('mongodb+srv://ablootia1993:Password321@crud0.k0i25qg.mongodb.net/food?retryWrites=true&w=majority');



app.post('/insert', async (req, res) => {
    const foodname = req.body.foodName
    const days = req.body.days

    const food = new FoodModel({ foodName: foodname, daySinceIAte: days })
    try {
        await food.save();
        res.send('Food saved successfully!');
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})


app.get('/read', async (req, res) => {
    try {
        const result = await FoodModel.find({}).exec();
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

app.put('/update', async (req, res) => {
    const newFoodName = req.body.newFoodName
    const id = req.body.id

    try {
       const updatedFood = await FoodModel.findById(id)
        updatedFood.foodName = newFoodName;
        await updatedFood.save();
        res.send('update');
       
    } catch (err) {
        console.log(err);
        
    }
})

app.delete('/delete/:id', async(req, res) => {
    const id = req.params.id
   
    await FoodModel.findByIdAndDelete(id).exec();
    res.send("deleted")
})


app.listen(3001, () => {
    console.log("Server runs on port 3001");
})