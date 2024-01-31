import { cli } from './cli.js';
import { exit, handleInput, prompt, start } from './operationsHandler.js';

await start();

cli.on('line', (line) => {
  handleInput(line);
  prompt();
});

cli.on('SIGINT', exit);
