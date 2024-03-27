const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    Name: String,
    Image: String
});

module.exports = mongoose.model("Category", categorySchema);