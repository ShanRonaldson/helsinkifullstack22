/* eslint-disable no-undef */
// mongodb+srv://<username>:<password>@cluster0.fywyvek.mongodb.net/?retryWrites=true&w=majority

const mongoose = require('mongoose');


const personSchema = new mongoose.Schema({
	name: String,
	number: Number
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length < 3) {
	console.log('Please provide the password as an argument: node mongo.js <password>');
	process.exit(1);
} else {
	const password = process.argv[2];
	const username = 'dev';
	const url = `mongodb+srv://${username}:${password}@cluster0.fywyvek.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

	if (process.argv.length === 3) {
		//list all
		mongoose.connect(url)
			.then(() => {
				console.log('connected');

				Person.find({}).then(result => {
					console.log('phonebook:');
					result.forEach(person => {
						console.log(`${person.name} ${person.number}`);
					});
					return mongoose.connection.close();
				});
			});

	} else if (process.argv.length > 3) {
		//add new
		mongoose
			.connect(url)
			.then(() => {
				console.log('connected');

				const person = new Person({
					name: process.argv[3],
					number: process.argv[4]
				});

				return person.save();
			})
			.then(() => {
				console.log('Person saved!');
				return mongoose.connection.close();
			})
			.catch(err => console.log(err));


	}
}







