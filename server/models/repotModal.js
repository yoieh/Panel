const mongoose = require('mongoose');
const schema = mongoose.Schema;

const customerModel = new schema({
	customer: { type: Number },
	serviced: { type: Boolean },
	commet: { type: String }
});

module.exports = mongoose.model('repot', repotModel);
