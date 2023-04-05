const express = require("express")
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Todo = require("./models/todo")

const app = express();
const port = 8080;

app.set("view engine","ejs")
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const dbConnection = async()=>{
try {
	  await mongoose.connect('mongodb://127.0.0.1:27017/myTodo');
	  console.log('DB connected Successfully');
	} catch (error) {
	  console.log(error.message);
}
}
dbConnection();

app.get('/', async(req,res)=>{
	try{

	var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };

    var day = today.toLocaleDateString("en-US", options)
  
  
	const todos = await Todo.find({});
	    res.render("index", {todos:todos,   kindOfDay: day})
	}catch (e){
		 console.log(e.message);
	}
	

})

app.get('/:id', async(req,res)=>{
	try{
	const {id} = req.params;
  
	const todo = await Todo.findOne({_id: id});
	    res.render("edit", {todo:todo})
	}catch (e){
		 console.log(e.message);
	}
	

})
//findALL =>[{todo:''},{todo:''}{todo:''}]
app.post('/', async(req,res)=>{
	try{
	const todo =  new Todo({
		title: req.body.todoValue,
	})
	const data = await todo.save();
	if(data){
		res.redirect('/');
	}
	
	}catch (e){
		console.log(e.message);
	}
	
})

app.delete('/:id', async(req,res)=>{
	try{
	await Todo.findByIdAndDelete(req.params.id);
	
	res.send({message:"todo deleted Successfully"})
	}catch (e){
		console.log(e.message);
	}
	
})

// Update data
app.put('/:id', async (req, res) => {
	try{
		console.log('req param',req.params)
		console.log('req body',req.body)
		const {id} = req.params;
		const data = req.body;
		console.log("data: ", data);
		console.log("id: ", id);
		const result = await Todo.findByIdAndUpdate(id,data,{new: true});
		res.status(200).json(result);
	}catch(error){
		console.log(error.message);
	}

})





app.listen(port, ()=>{
	console.log("server is listening at " + port);
});