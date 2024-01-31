import { parsedArgs } from './argsParser.js';
import { cli } from './cli.js';
import { capitalize } from './helpers.js';

const getUsername = async () => {
  let username = parsedArgs.username;

  while (!username) {
    username = await cli.question('Enter username, please:');
  }

  return username;
}

const printGreeting = async () => {
  const username = await getUsername();

  cli.write(`Welcome to the File Manager, ${capitalize(username)}!\n`);
}

export {
  printGreeting,
};