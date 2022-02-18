const express = require('express');
const path = require('path');
const morgan = require("morgan");
const http = require('http');


//connect to the database
const mongodbConnection = require("./3_SystemKernel/Database/connection")
const database = require("./3_SystemKernel/Database/models")


//set up the app
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

//cors
// Cors
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	if (req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
		return res.status(200).json({});
	}
	next();
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.get('/', (req, res) => res.json({ message: "You are on homepage" }))

//connection
//........................Connections...........................
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));