import { cli } from './cli.js';
import { greet, quit } from './messageProvider.js';

const exit = () => {
  quit();
  process.exit();
}

const operations = {
  EXIT: '.exit',
};

await greet();

cli.on('line', (line) => {
  console.log(`Received: ${line}`);

  const parts = line.split(' ');
  const operation = parts[0];

  switch (operation) {
    case operations.EXIT:
      exit();
  }
});

cli.on('SIGINT', exit);
