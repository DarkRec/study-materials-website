var mongoose = require("mongoose");

var articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    markdown: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        defautl: Date.now(),
    },
});

module.exports = mongoose.model("Article", articleSchema);
