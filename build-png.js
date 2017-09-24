const { getColorsGrid, getPngData } = require('./identicon')
const { PNG } = require('pngjs')
const crypto = require('crypto')
const fs = require('fs')

const hash = crypto
  .createHash('md5')
  .update(
    new Date()
      .getTime()
      .toString()
      .split('')
      .reverse()
      .join('')
  )
  .digest('hex')

const createPng = (h = hash) => {
  const png = new PNG({
    width: 500,
    height: 500,
    filterType: -1,
  })
  png.data = getPngData(getColorsGrid(h))
  png
    .pack()
    .pipe(fs.createWriteStream('public/identicon.png'))
  return true
}

module.exports = {
  createPng,
}
