const express = require("express")
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Todo = require("./models/todo")
const methodOverride = require('method-override')
const app = express();
const port = 8080;

app.set("view engine","ejs")
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));


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
		const {id} = req.query;
		const todo = await Todo.findOne({_id: id});
	    res.render("index", {todos:todos,   Today: day , singleTodo:todo})
	} catch (e){
		console.log(e.message);
	}
	

})

//findALL =>[{todo:''},{todo:''}{todo:''}]
app.post('/', async(req,res)=>{
	try{
	const todo =  new Todo({
		title: req.body.title,
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
app.post('/:id', async (req, res) => {
	console.log('post hitted')
	try{
		console.log('req param',req.params)
		console.log('req body',req.body)
		const {id} = req.params;
		const data = req.body;
		console.log("data: ", data);
		console.log("id: ", id);
		const result = await Todo.findByIdAndUpdate({ _id: id },data,  {
        new: true,
      });
		console.log(result);
		// res.status(200).json(result);
	}catch(error){
		console.log(error.message);
	}
	
	
   return res.redirect('/');
})


app.put('/:id', async (req, res) => {
	console.log('put hitted')
	try{
		console.log('req param',req.params)
		console.log('req body',req.body)
		const {id} = req.params;
		const data = req.body;
		console.log("data: ", data);
		console.log("id: ", id);
		const result = await Todo.findByIdAndUpdate({ _id: id },data,  {
        new: true,
      });
		console.log(result);
		// res.status(200).json(result);
	}catch(error){
		console.log(error.message);
	}
	
	
   return res.redirect('/');
})



app.listen(port, ()=>{
	console.log("server is listening at " + port);
});