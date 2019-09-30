const express = require('express');
const router = express.Router();
const Customer = require('../models/customerModel');

router.get('/', (req, res) => {
	Customer.find({}, (err, customers) => {
		res.json(customers);
	});
});

router.use('/:id', (req, res, next) => {
	Customer.findById(req.params.id, (err, customer) => {
		if (err) res.status(500).send(err);
		else req.customer = customer;
		next();
	});
});

router
	.get('/:id', (req, res) => {
		return res.json(req.customer);
	})
	.put('/:id', (req, res) => {
		Object.keys(req.body).map(key => {
			req.customer[key] = req.body[key];
		});
		req.customer.save();
		res.json(req.customer);
	});

router.post('/', function(req, res) {
	console.log(req.body);
	Customer.findOne({ name: req.body.name }, (err, customer) => {
		console.log(customer);
		if (err) {
			res.json({ error: err });
		} else {
			if (!customer) {
				Customer.create({ ...req.body }, function(err, customer) {
					if (err) {
						res.json({ error: err });
					} else {
						// saved!
						res.json({ customer, test: 'Got a POST request' });
					}
				});
			} else {
				res.json({ message: `${req.body.name} dose all ready exists` });
			}
		}
	});
});

module.exports = router;
