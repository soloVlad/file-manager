import message from "./messageProvider.js";
import pwd, { PATH_TYPES } from "./pwd.js";
import errorHandler, { ERRORS } from "./errorHandler.js";
import { cli } from "./cli.js";


const operations = {
  EXIT: '.exit',
  UP: 'up',
  CD: 'cd',
  LS: 'ls',
};

const start = async () => {
  await message.greet();
  prompt();
}

const exit = () => {
  message.quit();
  process.exit();
}

const prompt = () => {
  message.printPWD();
  cli.prompt();
};

const checkEnoughArgs = (args, requiredNumber) => {
  return args.length === requiredNumber;
}

const handleInput = async (inputString) => {
  const parts = inputString.split(' ');
  const operation = parts[0];

  switch (operation) {
    case operations.EXIT:
      exit();

    case operations.UP:
      if (!checkEnoughArgs(parts, 1)) {
        errorHandler.log(ERRORS.INVALID_INPUT);
        break;
      }

      pwd.up();
      break;

    case operations.CD:
      const newPath = parts[1];
      const isEnoughArgs = checkEnoughArgs(parts, 2);
      const isExist = await pwd.exist(newPath);

      if (!isEnoughArgs || !isExist) {
        errorHandler.log(ERRORS.INVALID_INPUT);
        break;
      }

      const pathType = await pwd.getPathType(newPath);

      if (pathType !== PATH_TYPES.DIRECTORY) {
        errorHandler.log(ERRORS.INVALID_INPUT);
        break;
      }

      try {
        pwd.cd(newPath);
      } catch {
        errorHandler.log(ERRORS.OPERATION_FAILED);
      }

      break;

    case operations.LS:
      await pwd.ls();
      break;
  }
}

export {
  start,
  exit,
  handleInput,
  prompt,
}