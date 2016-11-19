var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var programaSchema = new Schema({
		name:       { type: String },
	}, {
		versionKey : false
	});
module.exports = mongoose.model('Programa', programaSchema);