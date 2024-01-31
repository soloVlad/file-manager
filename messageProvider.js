import { args } from './argsParser.js';
import { cli } from './cli.js';
import { capitalize } from './helpers.js';

const greet = async () => {
  const usernameCapitalized = capitalize(args.username);
  cli.write(`Welcome to the File Manager, ${usernameCapitalized}!\n`);
}

const quit = () => {
  const usernameCapitalized = capitalize(args.username);
  cli.write(`Thank you for using File Manager, ${usernameCapitalized}, goodbye!`)
}

export {
  greet,
  quit
};