const fs        = require('fs');

function isJsFile(filename: string): boolean {
  const str = filename.split('/').pop();
  if (!str) return false;
  const arr = str.split('.');
  if (arr.length === 2 && arr[1] === 'js')
    return true;
  return false;
}

export function getFileName(path: string): string {
  const str = path.split('/').pop();
  if (!str) return '';
  return str.split('.')[0];
}

export function recursiveDir(path: string, files?: string[]) {
  files = files || [];
  const dir = fs.readdirSync(path);
  for (const fd of dir) {
    const fileStat = fs.lstatSync(path + fd);
    if (fileStat.isFile()) {
      if (isJsFile(fd)) files.push(path + fd.toLowerCase());
    }
    if (fileStat.isDirectory()) {
      recursiveDir(path + fd + '/', files);
    }
  }
  return files;
}