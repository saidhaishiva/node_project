var express = require("express");
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']);
var bodyParser = require("body-parser");
/*app.get('/', function (req, res){
    res.send("Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes");
});*/

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());

app.get('/contactlist',function(req,res){
	console.log("I recived a get request");
	
	db.contactlist.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});
});

app.post('/contactlist',function(req,res){
	console.log(req.body);
	db.contactlist.insert(req.body,function(err,docs){
		res.json(docs);
	});
});

app.delete('/contactlist/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)},function(err,docs){
		res.json(docs);
	});
});

app.get('/contactlist/:id',function(req,res){
	//console.log("I recived a get request");
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)},function(err,docs){
		res.json(docs);
	});
});

app.put('/contactlist/:id',function(req,res){
	//console.log("I recived a get request");
	var id = req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
		//res.json(docs);
		update:{$set:{name:req.body.name,email:req.body.email,number:req.body.number}},
		new:true},function(err,docs){
			res.json(docs);
		});
		
	});
//});
app.listen(3200);
console.log("Server is running on port 3200");