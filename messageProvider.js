import { args } from './argsParser.js';
import { capitalize } from './helpers.js';
import pwd from './pwd.js';

const greet = async () => {
  const usernameCapitalized = capitalize(args.username);
  console.log(`Welcome to the File Manager, ${usernameCapitalized}!`);
}

const quit = () => {
  const usernameCapitalized = capitalize(args.username);
  console.log(`Thank you for using File Manager, ${usernameCapitalized}, goodbye!`)
}

const printPWD = () => {
  console.log(`You are currently in ${pwd.get()}`);
}

export default {
  greet,
  quit,
  printPWD
};