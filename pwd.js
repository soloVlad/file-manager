import os from 'os';
import path from 'path';
import fs from 'fs/promises';

let pwd = os.homedir();

const set = (newPWD) => {
  pwd = newPWD;
}

const get = () => {
  return pwd;
}

const up = () => {
  pwd = path.resolve(pwd, '..');
  return pwd;
}

const cd = (newPath) => {
  pwd = path.resolve(pwd, newPath);
  return pwd;
}

const exist = async (newPath) => {
  try {
    await fs.access(newPath);
    return true;
  } catch {
    return false;
  }
}

export default {
  set,
  get,
  up,
  cd,
  exist,
}