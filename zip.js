import path from 'path';
import fs from 'fs';
import { pipeline } from 'stream/promises';
import zlib from 'zlib';

import errorHandler, { ERRORS } from "./errorHandler.js";
import pwd, { PATH_TYPES } from "./pwd.js";

const compress = async (filePath, destPath) => {
  const resolvedFilePath = pwd.resolve(filePath);
  const resolvedDestPath = pwd.resolve(destPath);

  const isFileExist = await pwd.exist(resolvedFilePath);
  const isDestDirExist = await pwd.exist(resolvedDestPath);

  if (!isFileExist || !isDestDirExist) {
    errorHandler.log(ERRORS.INVALID_INPUT);
    return;
  }

  const filePathType = await pwd.getPathType(resolvedFilePath);
  const destPathType = await pwd.getPathType(resolvedDestPath);

  if (filePathType !== PATH_TYPES.FILE || destPathType !== PATH_TYPES.DIRECTORY) {
    errorHandler.log(ERRORS.INVALID_INPUT);
    return;
  }

  try {
    const zipFileName = path.basename(resolvedFilePath) + '.br';
    const zipFilePath = path.join(resolvedDestPath, zipFileName);

    const readSteam = fs.createReadStream(resolvedFilePath);
    const writeStream = fs.createWriteStream(zipFilePath);
    const brotli = zlib.createBrotliCompress();

    await pipeline(
      readSteam,
      brotli,
      writeStream,
    )
  } catch {
    errorHandler.log(ERRORS.OPERATION_FAILED);
  }
}

const decompress = async (filePath, destPath) => {
  const resolvedFilePath = pwd.resolve(filePath);
  const resolvedDestPath = pwd.resolve(destPath);

  const isFileExist = await pwd.exist(resolvedFilePath);
  const isDestDirExist = await pwd.exist(resolvedDestPath);

  if (!isFileExist || !isDestDirExist) {
    errorHandler.log(ERRORS.INVALID_INPUT);
    return;
  }

  const filePathType = await pwd.getPathType(resolvedFilePath);
  const destPathType = await pwd.getPathType(resolvedDestPath);
  const isFileZipped = path.extname(resolvedFilePath) === '.br';

  if (
    filePathType !== PATH_TYPES.FILE
    || destPathType !== PATH_TYPES.DIRECTORY
    || !isFileZipped
  ) {
    errorHandler.log(ERRORS.INVALID_INPUT);
    return;
  }

  try {
    const parsedZipFilePath = path.parse(resolvedFilePath);
    const unzipFilePath = path.join(resolvedDestPath, parsedZipFilePath.name);

    const readSteam = fs.createReadStream(resolvedFilePath);
    const writeStream = fs.createWriteStream(unzipFilePath);
    const brotli = zlib.createBrotliDecompress();

    await pipeline(
      readSteam,
      brotli,
      writeStream,
    )
  } catch {
    errorHandler.log(ERRORS.OPERATION_FAILED);
  }
}

export default {
  compress,
  decompress,
}