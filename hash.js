const crypto = require('crypto')
const { curry } = require('ramda')

const getSeedFromDate = () =>
  new Date()
    .getTime()
    .toString()
    .split('')
    .reverse()
    .join('')

const getHashFromSeed = seed =>
  crypto.createHash('md5').update(seed).digest('hex')

module.exports = {
  getSeedFromDate,
  getHashFromSeed,
}
