import { args } from './argsParser.js';
import { capitalize } from './helpers.js';
import pwd from './pwd.js';

const greet = async () => {
  const usernameCapitalized = capitalize(args.username);
  process.stdout.write(`Welcome to the File Manager, ${usernameCapitalized}!\n`);
}

const quit = () => {
  const usernameCapitalized = capitalize(args.username);
  process.stdout.write(`Thank you for using File Manager, ${usernameCapitalized}, goodbye!\n`)
}

const printPWD = () => {
  process.stdout.write(`You are currently in ${pwd.get()}\n`);
}

export default {
  greet,
  quit,
  printPWD
};