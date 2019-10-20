const {describe} = require('mocha');
const assert = require('assert');
const utils = require('../lib/utils.js');
const fs = require('fs');

describe('Test field count:', function() {
    it('Row with 2nd field missing', function() {
    	var data = ['Alice,,1.0'];
    	summary = utils.getSummary(data);
    	length = Object.keys(summary).length;
    	assert(length === 0);
    });
    it('Row with 3rd field missing', function() {
    	var data = ['Alice,Bob,'];
    	summary = utils.getSummary(data);
    	length = Object.keys(summary).length;
    	assert(length === 0);
    });
});

describe('Test invalid amount', function() {
    it('Row with zero amount', function() {
    	var data = ['Alice,Bob,0'];
    	summary = utils.getSummary(data);
    	length = Object.keys(summary).length;
    	assert(length === 0);
    });
    it('Row with negative amount', function() {
    	var data = ['Alice,Bob,-1'];
    	summary = utils.getSummary(data);
    	length = Object.keys(summary).length;
    	assert(length === 0);
    });
    it('Row with string as amount', function() {
    	var data = ['Alice,Bob,Cat'];
    	summary = utils.getSummary(data);
    	length = Object.keys(summary).length;
    	assert(length === 0);
    });
    it('Row with more than 2 decimal amount', function() {
    	var data = ['Alice,Bob,1.9999', 'Alice,Bob,1.99999'];
    	var summary = utils.getSummary(data);
    	var amount = summary.Alice.Bob;
    	assert(amount === '4.00');
    });
    it('Row with special chars in name', function() {
    	var data = ['Al!ce,B0b,1.9'];
    	var summary = utils.getSummary(data);
    	length = Object.keys(summary).length;
    	assert(length === 0);
    });
});

describe('Test output file', function() {
	it('Test output file is created', function() {
    	var data = ['Alice,Bob,1.5'];
    	summary = utils.getSummary(data);
    	utils.writeFile(summary);
    	assert(fs.existsSync('output.csv'));
    });
    it('Test output file is alphabetically sorted', function() {
    	var data = ['A,E,1.5', 'A,D,1.4', 'A,C,1.3', 'A,B,1.2'];
    	summary = utils.getSummary(data);
    	utils.writeFile(summary);
    	actual = utils.readFile('output.csv');
    	expected = actual.sort();
    	assert(actual === expected);
    });
});

