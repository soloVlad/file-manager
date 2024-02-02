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
  pwd = resolve('..');
  return pwd;
}

const cd = (newPath) => {
  pwd = resolve(newPath);
  return pwd;
}

const ls = async () => {
  const content = await fs.readdir(pwd);

  const structuredContent = await Promise.all(content.map(async (item) => {
    try {
      const itemPath = resolve(item);
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

const resolve = (newPath) => {
  return path.resolve(pwd, newPath);
}

const exist = async (newPath) => {
  const resolvePath = resolve(newPath);

  try {
    await fs.access(resolvePath);
    return true;
  } catch {
    return false;
  }
}

const getPathType = async (newPath) => {
  const resolvedPath = resolve(pwd, newPath);
  const stats = await fs.stat(resolvedPath);

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