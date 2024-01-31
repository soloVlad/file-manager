import os from 'os';
import path from 'path';

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

export default {
  set,
  get,
  up,
}