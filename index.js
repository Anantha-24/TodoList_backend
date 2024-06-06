const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Ensure this line is present
const TodoModel = require('./Models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/todolist', {
  
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

app.get('/get', (req, res) => {
  TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.put('/update/:id', (req, res) => {
  const {id} = req.params;
  TodoModel.findByIdAndUpdate({_id:id}, {done: true})
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

app.delete('/delete/:id', (req,res) => {
  const {id} = req.params;
  TodoModel.findByIdAndDelete({_id: id})
  .then(result => res.json(result))
  .catch(err => res.json(err))
})
app.post('/add', (req, res) => {
  const task = req.body.task;
  if (!task) {
    return res.status(400).json({ error: 'Task is required' });
  }

  TodoModel.create({ task: task })
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
