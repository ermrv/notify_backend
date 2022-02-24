const express = require('express');
const path = require('path');
const morgan = require("morgan");
const http = require('http');


//connect to the database
const mongodbConnection = require("./3_SystemKernel/Database/connection")
const database = require("./3_SystemKernel/Database/index")


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
app.use('/api/account',require('./1_Routes/A_AccountRoutes'))
app.use('/api/channel',require('./1_Routes/B_ChannelRoutes'))
app.use('/api/post',require('./1_Routes/C_PostRoutes'))
app.use('/api/comment',require('./1_Routes/D_CommentRoutes'))
app.use('/api/reminder', require('./1_Routes/E_ReminderRoutes'))


// //create server
// const server = http.createServer(app);
//connection
//........................Connections...........................
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));