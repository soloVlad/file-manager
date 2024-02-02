import fs from 'fs';
import { pipeline } from 'stream/promises';
import { Writable } from 'stream';

import pwd, { PATH_TYPES } from './pwd.js';
import errorHandler, { ERRORS } from './errorHandler.js';

const cat = async (currentPath) => {
  const resolvedPath = pwd.resolve(currentPath);
  const isExist = await pwd.exist(resolvedPath);
  const pathType = await pwd.getPathType(resolvedPath);

  if (!isExist || pathType !== PATH_TYPES.FILE) {
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
  } catch (err) {
    errorHandler.log(ERRORS.OPERATION_FAILED);
  }
}

export default {
  cat,
};