import { cli } from './cli.js';
import { greet } from './messageProvider.js';

await greet();

cli.on('line', (line) => {
  console.log(`Received: ${line}`);
});
