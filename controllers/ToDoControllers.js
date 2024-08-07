var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect database
mongoose.connect('mongodb+srv://nishad:1997Nishad@cluster0.zuj8p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

//create a schema 
// Define the schema
const todoSchema = new mongoose.Schema({
    item: String
  });
  
  // Create the model
  const Todo = mongoose.model('Todo', todoSchema);
  
  // Async function to create and save a new item
  async function saveItem() {
    const itemOne = new Todo({ item: 'buy flower' });
  
    try {
      await itemOne.save();
      console.log('item saved');
    } catch (err) {
      console.error(err);
    }
  }
  
  // Call the async function to save the item
  saveItem();

var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding'}]
var urlencodedParser = bodyParser.urlencoded({extended: false});
module.exports = function(app){

    app.get('/todo', function(req, res){
        res.render('todo', {todos: data});
    });
    app.post('/todo',urlencodedParser, function(req, res){
        data.push(req.body);
        res.json(data);
    });
    app.delete('/todo/:item', function(req, res){
        data = data.filter(function(todo){
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json(data);
    });
};