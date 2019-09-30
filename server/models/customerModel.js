const mongoose = require('mongoose');
const schema = mongoose.Schema;

const customerModel = new schema({
	name: { type: String },
	contact: { type: String },
	url: { type: String },
	reports: { type: Array, default: [] },
	nextService: { type: Date }
});

module.exports = mongoose.model('customer', customerModel);
