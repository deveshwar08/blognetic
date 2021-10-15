const express = require('express');
const mongoose = require('mongoose');
const dashboardRoutes = require('./routes/dashboardRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const pollRoutes = require('./routes/pollRoutes');
const cookieParser = require('cookie-parser');
const {requireAuth,checkUser} = require('./middleware/authMiddleware.js');


const app = express();

app.use(express.static('./public/assets'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

const dbURI = 'mongodb://127.0.0.1:27017';
mongoose.connect(dbURI, {dbName: "blognetic", useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true });


app.set('view engine','ejs');


app.use('*',checkUser);
app.get('/',function(req, res){
    res.render('index');
});
app.use('/',authRoutes);



const port = 2000;

app.listen(port, function(){
	console.log("App is listening to port " + port);
});