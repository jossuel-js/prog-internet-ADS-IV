const mongoose = require("mongoose");

const Person = mongoose.model("Person", {
    name:String,
    senha:String,
    email:String,
});

module.exports = Person