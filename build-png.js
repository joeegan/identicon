const { getColorsGrid, getPngData } = require('./identicon')
const { PNG } = require('pngjs')
const fs = require('fs')
const IDENTICON_URL = 'public/identicon.png'

const createPng = hash => {
  const png = new PNG({
    width: 500,
    height: 500,
    filterType: -1,
  })
  png.data = getPngData(getColorsGrid(hash))
  png.pack().pipe(fs.createWriteStream(IDENTICON_URL))
  return true
}

module.exports = {
  createPng,
}
