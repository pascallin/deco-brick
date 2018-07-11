"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require('crypto');
function md5(msg) {
    return crypto.createHash('md5').update(msg).digest('hex');
}
exports.md5 = md5;
//# sourceMappingURL=utils.js.map