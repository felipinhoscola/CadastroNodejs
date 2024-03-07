const mongoose = require("mongoose");

const personSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    tel: { type: String },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    }]
})

module.exports = mongoose.model('Person', personSchema);