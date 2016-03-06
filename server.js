import express from 'express';
import MongoClient from 'mongodb';

let app = express();

app.use(express.static('public'));

let dburl = "mongodb://appy:tG0xnLJclRD8iBQBV5Rd4Sx6WwdO0tYd@ds023448.mlab.com:23448/marvin";
let db;

MongoClient.connect(dburl, 
	(err, database) =>{
		if (err) throw err;
		db = database;
		let port = 3000;

		app.listen(port, () =>{
			console.log(`listening on port ${port}`);
		});


		
});

app.get('/data/links', (req,res)=>{
	db.collection("links").find({}).toArray((err, links )=>{
		res.json(links);
	});
});