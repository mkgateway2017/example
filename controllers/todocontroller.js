var bodyparser = require('body-parser');

var mongoose =require('mongoose');

//connect to mongodb

mongoose.connect('mongodb://mkgateway2017:mkgateway2017@ds137611.mlab.com:37611/todo',{ useNewUrlParser: true });

var todoSchema=new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);


//var data = [{item:'hi thala'},{item:'thalapathy'},{item:'vjs'}];
var urlencodedParser = bodyparser.urlencoded({extended: false});
module.exports=function(app){

app.get('/todo',function(req,res){
  //  get from mdb
  Todo.find({},function(err,data){
    if(err) throw err;
    res.render('todo',{mango:data});
  })

});

app.post('/todo',urlencodedParser,function(req,res){
//get data from view
var newTodo = Todo(req.body).save(function(err,data){
  if(err) throw err;
  res.json(data);
})

});

app.delete('/todo/:item',function(req,res){

  //to remove

  Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
    if(err) throw err;

  res.json(data);
});


});

}
