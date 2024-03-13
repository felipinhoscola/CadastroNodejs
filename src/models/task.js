const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    name: { type: String, required: true },
    done: { type: Boolean, default: false },
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: true
    }
})

module.exports = mongoose.model('Task', taskSchema);