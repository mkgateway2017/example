var express = require('express');
var app = express();

var todocontroller = require('./controllers/todocontroller');

var home = require('./controllers/home');
//setting the view engine
app.set('view engine','ejs');

//static files

app.use(express.static('./public'));

todocontroller(app);
home(app);
app.listen(3000);
console.log('hi maci');
