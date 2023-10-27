'use strict';

const fs = require("fs");

module.exports.index = (req, res) => {
	res.json({
		status: 1
	});
}

module.exports.slot_pickup = (req, res) => {
	var store = req.params.store;

	try {
		const pickup = require(`../slots/pickup_${store}.json`);
		const others = require(`../slots/config_${store}.json`);

		res.json({
			status: 1,
			slots: pickup,
			others: others
		});
	} catch (err) {
		res.json({
			status: 0,
			message: err.toString()
		});
	}
}

module.exports.slot_delivery = (req, res) => {
	try {
		const delivery = require(`../slots/delivery_${store}.json`);
		const others = require(`../slots/config_${store}.json`);

		res.json({
			status: 1,
			slots: delivery,
			others: others
		});
	} catch (err) {
		res.json({
			status: 0,
			message: err.toString()
		});
	}
}