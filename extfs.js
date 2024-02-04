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

const copy = async (filePath, newDirPath) => {
  const resolvedFilePath = pwd.resolve(filePath);
  const resolvedDirPath = pwd.resolve(newDirPath);
  const isFileExist = await pwd.exist(resolvedFilePath);
  const isDirExist = await pwd.exist(resolvedDirPath);
  const isNewDir = path.dirname(resolvedFilePath) !== resolvedDirPath;

  if (!isFileExist || !isDirExist || !isNewDir) {
    errorHandler.log(ERRORS.INVALID_INPUT);
    return 1;
  }

  const newDirPathType = await pwd.getPathType(resolvedDirPath);

  if (newDirPathType !== PATH_TYPES.DIRECTORY) {
    errorHandler.log(ERRORS.INVALID_INPUT);
    return 1;
  }

  const fileName = path.basename(resolvedFilePath);
  const newFilePath = path.join(resolvedDirPath, fileName);

  try {
    const readStream = fs.createReadStream(resolvedFilePath);
    const writeStream = fs.createWriteStream(newFilePath);

    await pipeline(
      readStream,
      writeStream,
    );

    return 0;
  } catch {
    errorHandler.log(ERRORS.OPERATION_FAILED);
    return 2;
  }
}

const remove = async (filePath) => {
  const resolvedFilePath = pwd.resolve(filePath);
  const isFileExist = await pwd.exist(resolvedFilePath);

  if (!isFileExist) {
    errorHandler.log(ERRORS.INVALID_INPUT);
    return;
  }

  const pathType = await pwd.getPathType(resolvedFilePath);

  if (pathType !== PATH_TYPES.FILE) {
    errorHandler.log(ERRORS.INVALID_INPUT);
    return;
  }

  try {
    await fs.promises.unlink(resolvedFilePath);
  } catch {
    errorHandler.log(ERRORS.OPERATION_FAILED);
  }
}

const move = async (filePath, newDirPath) => {
  const copyResultCode = await copy(filePath, newDirPath);

  if (copyResultCode !== 0) {
    return;
  }

  await remove(filePath);
}

const checkIsValidFileName = (fileName) => {
  const regex = /^[^.\/][^\/]*\.[a-zA-Z0-9]+$/i;

  return regex.test(fileName);
}

export default {
  cat,
  add,
  rename,
  copy,
  remove,
  move,
};