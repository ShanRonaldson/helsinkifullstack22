const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
	users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }
});

ratingSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = mongoose.model('Rating', ratingSchema);
