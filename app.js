var express = require('express');
var ToDoController = require('./controllers/ToDoControllers');

var app = express();

//set update template engine

app.set('view engine', 'ejs');

//static file
app.use(express.static('./public'));

//fire controllers
ToDoController(app);

//listen to ports
app.listen(3000);
console.log('You are listening on port 3000');