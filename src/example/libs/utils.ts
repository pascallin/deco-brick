const crypto    = require('crypto');

export function md5(msg: string) {
  return crypto.createHash('md5').update(msg).digest('hex');
}