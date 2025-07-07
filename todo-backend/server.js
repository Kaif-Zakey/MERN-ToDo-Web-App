//using Express
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//create an instance of express
const app = express();

//using middleware to parse JSON
app.use(express.json());
app.use(cors());

//sample in memory database
// let todos = [];

//Connect to MongoDB
mongoose.connect('mongodb+srv://kaif:kaif2003@mini-pos.6nr1jvf.mongodb.net/mern-app')
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch((err)=>{
    console.error('Error connecting to MongoDB:', err); 
})

//creating schema for todo items
const todoSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:String
})

//creating model for todo items
const todoModel = mongoose.model('Todo', todoSchema);


//Create a new todo item
app.post('/todos',async(req,res)=>{
   const {title,description} =  req.body;

    try{
        const newTodo = new todoModel({title,description})
        await newTodo.save()
        res.status(201).json(newTodo);

    
    }catch(error){
        console.error('Error creating todo:', error);
        res.status(500).json({error: 'Internal Server Error'});

    }


})


//Get all todo items
app.get('/todos',async(req,res)=>{
   
    try{

        const todos = await todoModel.find();
        res.status(200).json(todos);

    }catch(error){
        console.error('Error fetching todos:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

//update a todo item

app.put('/todos/:id',async(req,res)=>{
   try{
    const {id} = req.params;
    const {title,description} = req.body;

    const updatedTodo = await todoModel.findByIdAndUpdate(
        id,
        {title,description},
        {new: true}
    )
    if(!updatedTodo){
        return res.status(404).json({error: 'Todo not found'});
    }
    res.status(200).json(updatedTodo);
}catch(error){
        console.error('Error updating todo:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

//Delete a todo item
app.delete('/todos/:id',async(req,res)=>{
    const {id} = req.params;
    try{
        const deletedTodo = await todoModel.findByIdAndDelete(id);
        if(!deletedTodo){
            return res.status(404).json({error: 'Todo not found'});
        }
        res.status(200).json({message: 'Todo deleted successfully'});
    }catch(error){
        console.error('Error deleting todo:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


//Start the server
const port =8000
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})