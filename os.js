import os from 'os';

import errorHandler, { ERRORS } from "./errorHandler.js";

const OS_FLAGS = {
  EOL: 'EOL',
  CPUS: 'cpus',
  HOMEDIR: 'homedir',
  USER_NAME: 'username',
  ARCHITECTURE: 'architecture',
};

const PREFIX = '--';

const checkIsFlagValid = (flag) => {
  return Object.values(OS_FLAGS).includes(flag);
}

const handleOSOperation = async (arg) => {
  const parsedArg = arg.replace(PREFIX, '');
  const isValidFlag = checkIsFlagValid(parsedArg);

  if (!isValidFlag) {
    errorHandler.log(ERRORS.INVALID_INPUT);
    return;
  }

  switch (parsedArg) {
    case OS_FLAGS.EOL:
      console.log(JSON.stringify(os.EOL));
      break;

    case OS_FLAGS.CPUS:
      const cpus = os.cpus();
      const cpusPrintObj = cpus.map(cpu => ({
        model: cpu.model,
        "clock rate": (cpu.speed * 1e-3).toFixed(3),
      }));

      console.log(`Average amount:${cpus.length}`);
      console.table(cpusPrintObj);
      break;

    case OS_FLAGS.HOMEDIR:
      console.log(os.homedir());
      break;

    case OS_FLAGS.USER_NAME:
      try {
        const userInfo = os.userInfo();
        console.log(userInfo.username);
      } catch {
        errorHandler.log(ERRORS.OPERATION_FAILED);
      }
      break;

    case OS_FLAGS.ARCHITECTURE:
      console.log(os.arch());
      break;

    default:
      errorHandler.log(ERRORS.INVALID_INPUT);
  }
}

export default {
  handleOSOperation,
};