const mongoose = require('mongoose')

const TodoSchma = new mongoose.Schema({
    task: String,
    done: {
        type: Boolean,
        default: false
    }
})

const TodoModel = mongoose.model("todos", TodoSchma)
module.exports = TodoModel