const crypto = require('crypto')

const getSeedFromDate = () =>
  new Date()
    .getTime()
    .toString()
    .split('')
    .reverse()
    .join('')

const createHash = seed =>
  crypto.createHash('md5').update(seed).digest('hex')

module.exports = {
  getSeedFromDate,
  createHash,
}
