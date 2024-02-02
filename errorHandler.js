export const ERRORS = {
  INVALID_INPUT: 'Invalid input',
  OPERATION_FAILED: 'Operation failed',
};

const log = (error) => {
  process.stdout.write(ERRORS[error] ?? error);
  process.stdout.write('\n');
}

export default {
  log,
}