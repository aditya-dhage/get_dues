const utils = require('./lib/utils.js');

// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

// Get contents of input file
var contents = utils.readFile(process.argv[2]);

// Get summary of dues
var summary = utils.getSummary(contents);

// Write output.csv file with sorted summary
utils.writeFile(summary);