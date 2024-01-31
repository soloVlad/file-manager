import { cli } from "./cli.js";

const DELIM = '=';
const PREFIX_SIZE = 2;

const getParsedArgs = () => {
  const args = process.argv.slice(2);

  return args.reduce((acc, arg) => {
    const [key, value] = arg.slice(PREFIX_SIZE).split(DELIM);
    acc[key] = value;
    return acc;
  }, {});
}

const validateParsedArgs = async (args) => {
  let username = parsedArgs.username;

  while (!username) {
    username = await cli.question('Enter username, please:');
  }

  return { ...args, username };
}

const parsedArgs = getParsedArgs();
const validatedArgs = await validateParsedArgs(parsedArgs);

export {
  validatedArgs as args,
};