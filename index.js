#!/usr/bin/env node
"use strict";

var fs = require('fs-extended');
var request = require('request');
var config = require('./config.json');

var base = `https://www.wanikani.com/api/user/${config.api_key}`

request(`${base}/kanji`, (error, response, body) => {
	if (!error && response.statusCode == 200) {
		fs.createFileSync('out.txt',
			JSON.parse(body).requested_information
			.filter(e => e.user_specific && (config.srs_levels.indexOf(e.user_specific.srs) > -1))
			.map(e => e.character)
			.join('')
		);
	} else {
		console.log(error);
	};
});
