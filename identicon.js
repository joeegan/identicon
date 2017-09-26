const {
  always,
  append,
  compose,
  concat,
  drop,
  flatten,
  flip,
  init,
  ifElse,
  map,
  modulo,
  reverse,
  repeat,
  take,
  tap,
  // nthArg,
  splitEvery,
} = require('ramda')

const GREY = [230, 230, 230, 255]
const CELL_SIZE = 100

const toColorNumber = flip(parseInt)(16)

const isOdd = compose(
  Boolean,
  flip(modulo)(2),
)

const mirror = arr => concat(init(arr), reverse(arr))

// const hash = 'fd137d7ee9bf0b107fc37cbafb0e8d7a'

const rgbaFromHash = compose(
  append(255),
  map(toColorNumber),
  take(3),
  splitEvery(2),
)

const getHashMultiArray = compose(
  splitEvery(3),
  splitEvery(2),
  drop(2),
)

const color = primaryColor => ifElse(
  isOdd,
  always(primaryColor),
  always(GREY),
)

const hashValueToColorValue = primaryColor => map(
  compose(
    color(primaryColor),
    toColorNumber,
  ),
)

const getColorsGrid = primaryColor => compose(
  map(hashValueToColorValue(primaryColor)),
  map(mirror),
  getHashMultiArray,
)

const multiplyForGridSize = flip(repeat)(CELL_SIZE)

const getPngDataFromColorsGrid = compose(
  flatten,
  map(
    compose(
      multiplyForGridSize, // increases number of vertical cells
      map(multiplyForGridSize), // increases number of horizontal cells
    ),
  ),
)

module.exports = {
  rgbaFromHash,
  getColorsGrid,
  getPngDataFromColorsGrid,
}
