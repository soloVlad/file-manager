import readline from 'node:readline/promises';

import { parsedArgs } from './argsParser.js';

const cli = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

cli.on('line', (line) => {
  console.log(`Received: ${line}`);
});


console.log(parsedArgs);