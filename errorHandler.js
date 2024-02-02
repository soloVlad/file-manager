export const ERRORS = {
  INVALID_INPUT: 'Invalid input',
  OPERATION_FAILED: 'Operation failed',
};

const log = (error) => {
  console.log(ERRORS[error] ?? error);
}

export default {
  log,
}