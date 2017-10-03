const {
  always,
  append,
  compose,
  concat,
  drop,
  flip,
  init,
  ifElse,
  map,
  modulo,
  reverse,
  take,
  splitEvery,
} = require('ramda')

const GREY = [230, 230, 230, 200]

const toColorNumber = flip(parseInt)(16)

const isOdd = compose(
  Boolean,
  flip(modulo)(2),
)

const mirror = arr => concat(init(arr), reverse(arr))

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

const chooseColor = primaryColor => ifElse(
  isOdd,
  always(primaryColor),
  always(GREY),
)

const hashValueToColorValue = primaryColor => map(
  compose(
    chooseColor(primaryColor),
    toColorNumber,
  ),
)

const getColorsGrid = primaryColor => compose(
  map(hashValueToColorValue(primaryColor)),
  map(mirror),
  getHashMultiArray,
)

module.exports = {
  rgbaFromHash,
  getColorsGrid,
}
