const {
  rgbaFromHash,
  getColorsGrid,
  getPngDataFromColorsGrid,
} = require('./identicon')

const { PNG } = require('pngjs')
const fs = require('fs')
const IDENTICON_URL = 'public/identicon.png'

const createPng = hash => {
  const png = new PNG({
    width: 500,
    height: 500,
    filterType: -1,
  })
  const primaryColor = rgbaFromHash(hash)
  console.log({ primaryColor })
  const colorsGrid = getColorsGrid(hash, primaryColor)
  // console.log({ colorsGrid: JSON.stringify(colorsGrid) })
  // console.log({ pngData: getPngDataFromColorsGrid(colorsGrid) })
  png.data = getPngDataFromColorsGrid(colorsGrid)
  png.pack().pipe(fs.createWriteStream(IDENTICON_URL))
  return true
}

module.exports = {
  createPng,
}
