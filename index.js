import { cli } from './cli.js';
import message from './messageProvider.js';

const exit = () => {
  message.quit();
  process.exit();
}

const operations = {
  EXIT: '.exit',
};

await message.greet();
message.printPWD();
cli.prompt();

cli.on('line', (line) => {
  const parts = line.split(' ');
  const operation = parts[0];

  switch (operation) {
    case operations.EXIT:
      exit();
  }

  message.printPWD();
  cli.prompt();
});

cli.on('SIGINT', exit);
