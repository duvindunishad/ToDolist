const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to the database
mongoose.connect('past your connection string')
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error:', err));

// Define the schema
const todoSchema = new mongoose.Schema({
    item: String
});

// Create the model
const Todo = mongoose.model('Todo', todoSchema);

const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {

    app.get('/todo', async function(req, res) {
        try {
            // Get data from MongoDB
            const data = await Todo.find({});
            res.render('todo', { todos: data });
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.post('/todo', urlencodedParser, async function(req, res) {
        try {
            // Get data from the view and add it to MongoDB
            const newTodo = new Todo({
                item: req.body.item
            });

            const data = await newTodo.save();
            res.json(data);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    //have to ann "async" because of the latest updates
    app.delete('/todo/:item', async function(req, res) {
        try {
            // Delete the requested item from MongoDB
            const data = await Todo.deleteOne({ item: req.params.item.replace(/\-/g, " ") });
            res.json(data);
        } catch (err) {
            res.status(500).send(err);
        }
    });
};
