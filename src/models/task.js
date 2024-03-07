const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    name: { type: String, required: true },
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: true
    }
})

module.exports = mongoose.model('Task', taskSchema);