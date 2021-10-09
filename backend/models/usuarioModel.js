const mongoose = require("mongoose");

const user = mongoose.Schema({
  login: { type: String, required: true },
  fullName: { type: String, required: true },
  pass: { type: String, required: true },
  rol: { type: String, required: true, default: "Vendedor" }
});

module.exports = mongoose.model("User", user);