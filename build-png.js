const fs = require('fs')
const { PNG } = require('pngjs')
const {
  compose,
  construct,
  flatten,
  flip,
  map,
  repeat,
} = require('ramda')
const {
  rgbaFromHash,
  getColorsGrid,
} = require('./identicon')

const IDENTICON_URL = 'public/identicon.png'
const CELL_SIZE = 50
const GRID_PX_WIDTH = 250

const multiplyForGridSize = flip(repeat)(CELL_SIZE)

const colorsGridToPngData = compose(
  flatten,
  map(
    compose(
      multiplyForGridSize,
      map(multiplyForGridSize),
    ),
  ),
)

const createPng = hash => {
  const primaryColor = rgbaFromHash(hash)
  const colorsGrid = getColorsGrid(primaryColor)(hash)
  const opts = {
    width: GRID_PX_WIDTH,
    height: GRID_PX_WIDTH,
  }
  const png = construct(PNG)(opts)
  png.data = colorsGridToPngData(colorsGrid)
  png.pack().pipe(fs.createWriteStream(IDENTICON_URL))
}

module.exports = {
  createPng,
}
