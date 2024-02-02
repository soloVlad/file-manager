import fs from 'fs';
import { pipeline } from 'stream/promises';
import { Writable } from 'stream';
import path from 'path';

import pwd, { PATH_TYPES } from './pwd.js';
import errorHandler, { ERRORS } from './errorHandler.js';

const cat = async (givenPath) => {
  const resolvedPath = pwd.resolve(givenPath);
  const isExist = await pwd.exist(resolvedPath);

  if (!isExist) {
    errorHandler.log(ERRORS.INVALID_INPUT);
    return;
  }

  const pathType = await pwd.getPathType(resolvedPath);

  if (pathType !== PATH_TYPES.FILE) {
    errorHandler.log(ERRORS.INVALID_INPUT);
    return;
  }

  try {
    const readStream = fs.createReadStream(resolvedPath, 'utf-8');

    await pipeline(
      readStream,
      new Writable({
        write(chunk, _, callback) {
          console.log(chunk.toString());
          callback();
        }
      })
    );
  } catch {
    errorHandler.log(ERRORS.OPERATION_FAILED);
  }
}

const add = async (fileName) => {
  const isValidFileName = checkIsValidFileName(fileName);

  if (!isValidFileName) {
    errorHandler.log(ERRORS.INVALID_INPUT);
    return;
  }

  try {
    const filePath = pwd.resolve(fileName);
    await fs.promises.writeFile(filePath, '');
  } catch {
    errorHandler.log(ERRORS.OPERATION_FAILED);
  }
};

const rename = async (filePath, newName) => {
  const resolvedPath = pwd.resolve(filePath);
  const isExist = await pwd.exist(resolvedPath);
  const isNewNameValid = checkIsValidFileName(newName);

  if (!isExist || !isNewNameValid) {
    errorHandler.log(ERRORS.INVALID_INPUT);
    return;
  }

  const pathType = await pwd.getPathType(resolvedPath);

  if (pathType !== PATH_TYPES.FILE) {
    errorHandler.log(ERRORS.INVALID_INPUT);
    return;
  }

  const newPath = path.resolve(path.dirname(resolvedPath), newName);

  try {
    await fs.promises.rename(resolvedPath, newPath);
  } catch {
    errorHandler.log(ERRORS.OPERATION_FAILED);
  }
}

const checkIsValidFileName = (fileName) => {
  const regex = /^[^.\/][^\/]*\.[a-zA-Z0-9]+$/i;

  return regex.test(fileName);
}

export default {
  cat,
  add,
  rename,
};