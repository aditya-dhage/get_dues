# GET DUES

This application summarizes the due amounts across multiple parties.
If there are repetitions of amount, it will sum it up.

## Requirements

For execution you only need Node.js  
For running unit tests we need mocha package.

## Input File

Input file should be a csv with 3 fields as follows:
Alice,Bob,10.0

Which simply means Alice owes Bob an amount of 10.0

Note:
Any special chars in name makes that row invalid.
Any amount less than or equal to zero is not considered.
Spaces in the end are trimmed, but in between name is acceptable.

## Running Application

    node getdues.js sample/input.csv

## Output File
Running application will create output.csv file which contains summarized data.  
If file does not exist, it will be created.  
If file exists, it will be over written.

## Running Unit Tests
    npm test

This will execute all unit tests in test/ directory.

## License

ISC License (ISC)