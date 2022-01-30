#!/usr/bin/env node
const fix_amounts = require("./libs/fix_amounts.js");
const fix_headings = require("./libs/fix_headings.js");

const fs = require("fs");
var argv = require('yargs/yargs')(process.argv.slice(2))
    .usage('Usage: $0 -f <csvfile> -o [fileout] [options]')
    .example('$0 -f bunk-statement.csv', 'change csv amounts to correct formatting for importing into accounting packages')
    .alias('f', 'file')
    .nargs('f', 1)
    .describe('f', 'Load a file')
    .demandOption(['f'])
    .alias('o', 'fileout')
    .nargs('o', 1)
    .describe('o', 'Output to file')
    .help('h')
    .alias('h', 'help')
    .epilog('Copyright Jason Norwood-Young <jason@10layer.com> 2022')
    .argv;

// check if file exists
if (!fs.existsSync(argv.file)) {
    console.error(`file ${argv.file} not found`);
    process.exit(1);
}
// Check that we can read the file
if (!fs.statSync(argv.file).isFile()) {
    console.error(`${argv.file} is not a file`);
    process.exit(1);
}
const csvdata = fs.readFileSync(argv.file, "utf8");
const result = fix_headings(fix_amounts(csvdata));
if (argv.fileout) {
    fs.writeFileSync(argv.fileout, result.toString(), "utf8");
} else {
    console.info(result);
}