"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const crypto = require('crypto');
function isJsFile(filename) {
    const str = filename.split('/').pop();
    if (!str)
        return false;
    const arr = str.split('.');
    if (arr.length === 2 && arr[1] === 'js')
        return true;
    return false;
}
function getFileName(path) {
    const str = path.split('/').pop();
    if (!str)
        return '';
    return str.split('.')[0];
}
exports.getFileName = getFileName;
function recursiveDir(path, files) {
    files = files || [];
    const dir = fs.readdirSync(path);
    for (const fd of dir) {
        const fileStat = fs.lstatSync(path + fd);
        if (fileStat.isFile()) {
            if (isJsFile(fd))
                files.push(path + fd.toLowerCase());
        }
        if (fileStat.isDirectory()) {
            recursiveDir(path + fd + '/', files);
        }
    }
    return files;
}
exports.recursiveDir = recursiveDir;
function md5(msg) {
    return crypto.createHash('md5').update(msg).digest('hex');
}
exports.md5 = md5;
//# sourceMappingURL=utils.js.map