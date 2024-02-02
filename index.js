import { cli } from './cli.js';
import { exit, handleInput, prompt, start } from './operationsHandler.js';

await start();

cli.on('line', async (line) => {
  await handleInput(line);
  prompt();
});

cli.on('SIGINT', exit);
