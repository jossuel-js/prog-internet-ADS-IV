const mongoose = require("mongoose");

const Person = mongoose.model("Person", {
    name:String,
    senha:String,
    approved:Boolean,
});

module.exports = Person