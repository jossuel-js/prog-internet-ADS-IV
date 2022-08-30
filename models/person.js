const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: { type: String, default: null },
  email: { type: String, unique: true },
  senha: { type: String },
  token: { type: String },
  passwordResetToken: { type: String, select:false},
  passwordResetExpire:{type:Date, select:false}
});

UserSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.senha, 10);
  this.senha = hash;
  next();
});


const Person = mongoose.model("Person",UserSchema)
module.exports = Person