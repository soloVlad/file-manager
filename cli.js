import readline from 'node:readline/promises';

const cli = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

export {
  cli,
}