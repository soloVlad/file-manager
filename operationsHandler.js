import message from "./messageProvider.js";
import { cli } from "./cli.js";

const operations = {
  EXIT: '.exit',
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

const handleInput = (inputString) => {
  const parts = inputString.split(' ');
  const operation = parts[0];

  switch (operation) {
    case operations.EXIT:
      exit();
  }
}

export {
  start,
  exit,
  handleInput,
  prompt,
}