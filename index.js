import { parsedArgs } from './argsParser.js';
import { cli } from './cli.js';
import { printGreeting } from './greeting.js';

await printGreeting();

cli.on('line', (line) => {
  console.log(`Received: ${line}`);
});
