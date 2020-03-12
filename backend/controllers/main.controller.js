const NotesModel = require('../models/notes.model.js');
const controller = {
	notes: async (req, res) => {
		const notes = await NotesModel.find().sort({_id: -1});
		res.send(notes);
	},
	createNote: async (req, res) => {
		const { title, content } = req.body;
		console.log(req.body);
		const note = new NotesModel({
			title,
			content
		});
		await note.save();
		res.json('Note created');
	},
	singleNote: async (req, res) => {
		const notes = await NotesModel.findById(req.params.id);
		res.send(notes);
	},
	deleteNote: async (req, res) => {
		const { id } = req.params;
	    await NotesModel.findByIdAndDelete(id);
	    res.json('Note deleted');
	}

};

module.exports = controller;