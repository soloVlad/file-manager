import os from 'os';
import path from 'path';
import fs from 'fs/promises';

export const PATH_TYPES = {
  FILE: 'file',
  DIRECTORY: 'directory',
};

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

const ls = async () => {
  const content = await fs.readdir(pwd);

  const structuredContent = await Promise.all(content.map(async (item) => {
    try {
      const itemPath = path.join(pwd, item);
      const itemType = await getPathType(itemPath);

      return {
        Name: item,
        Type: itemType,
      }
    } catch {
      return null;
    }
  }));

  const filteredContent = structuredContent.filter(item => item);

  filteredContent.sort((a, b) => {
    return a.Type.localeCompare(b.Type) || a.Name.localeCompare(b.Name);
  })

  console.table(filteredContent);
}

const exist = async (newPath) => {
  try {
    await fs.access(newPath);
    return true;
  } catch {
    return false;
  }
}

const getPathType = async (newPath) => {
  const stats = await fs.stat(newPath);

  if (stats.isDirectory()) {
    return PATH_TYPES.DIRECTORY;
  }

  if (stats.isFile()) {
    return PATH_TYPES.FILE;
  }

  process.stdout.write('Unknown path type\n');
}

export default {
  set,
  get,
  up,
  cd,
  ls,
  exist,
  getPathType,
}