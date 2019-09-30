const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const db = mongoose.connect('mongodb://localhost:27017/db', { useNewUrlParser: true, useUnifiedTopology: true });

app.prepare().then(() => {
	const server = express();

	server.use(bodyParser.json());
	server.use(bodyParser.urlencoded({ extended: true }));

	server.use('/api', require('./routes'));

	server.get('/customer/add', (req, res) => {
		return app.render(req, res, '/customer/add', req.query);
	});

	server.get('/customer/:id', (req, res) => {
		return app.render(req, res, '/customer', { id: req.params.id });
	});

	server.get('/customer', (req, res) => {
		return app.render(req, res, '/customer', req.query);
	});

	server.all('*', (req, res) => {
		return handle(req, res);
	});

	server.listen(port, err => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`);
	});
});
