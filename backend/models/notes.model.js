const { Schema, model } = require('mongoose');

const note = new Schema({
	title: { type: String },
	content: { type: String },
	date: Date
}, {
	timestamps: true
});

module.exports = model('note', note);