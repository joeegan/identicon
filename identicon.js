const {
  add,
  addIndex,
  append,
  compose,
  concat,
  divide,
  findIndex,
  flatten,
  flip,
  head,
  inc,
  init,
  ifElse,
  lensIndex,
  lt,
  map,
  modulo,
  multiply,
  reverse,
  repeat,
  take,
  tap,
  times,
  splitEvery,
  view,
} = require('ramda')

const GREY = [230, 230, 230, 255]
const GRID_PIXEL_SIZE = 500
const CELL_SIZE = 100
const CELLS_PER_ROW = divide(GRID_PIXEL_SIZE, CELL_SIZE)

const row = times(
  compose(multiply(CELL_SIZE), inc),
  CELLS_PER_ROW
)
const grid = repeat(row, CELL_SIZE)
const toColorNumber = flip(parseInt)(16)
const mirror = arr => concat(init(arr), reverse(arr))
const isOdd = compose(Boolean, flip(modulo)(2))
const log = tap(console.log)

const rgbaFromHash = compose(
  append(255),
  map(toColorNumber),
  take(3),
  splitEvery(2)
)
const next = (n, i) => view(lensIndex(add(n, i)))

const isColor = (n, i, hash) =>
  compose(
    isOdd,
    toColorNumber,
    next(n, i)
  )(hash, n, i)

const create3colorsBasedOnHash = (arr, i, hash) => {
  console.log({arr}, {i}, {hash})
  const result = times(
    ifElse(
      n => isColor(n, i, hash),
      n => rgbaFromHash(hash),
      n => GREY
    ),
    3
  )
  console.log({ result })
  return result
}

const populateColorsRow = hash => compose(
  mirror,
  (arr, i) => create3colorsBasedOnHash(arr, i, hash)
)

const getColorsGrid = hash => {
  console.log({ hash })
  const result = addIndex(map)(
    populateColorsRow(hash),
    repeat([], CELLS_PER_ROW)
  )
  console.log('get result', result)
  return result
}

// const createBooleanRow = compose(
//   isOdd,
//   toColorNumber,
//   view(lensIndex(add(n, i)))
// )
//
// const getBooleanGrid = hash => {
//   console.log({ hash })
//   const result = addIndex(map)(
//     createBooleanRow(hash),
//     repeat([], CELLS_PER_ROW)
//   )
//   console.log('get result', result);
//   return result;
// }

const getVertIdx = (h, grid) =>
  addIndex(findIndex)(
    (row, idx) => lt(h, multiply(inc(idx), 100)),
    grid
  )

const getHorizIdx = (w, grid) =>
  findIndex(n => lt(w, n), head(grid))

const getPngData = colorsGrid =>
  flatten(
    times(
      h =>
        times(
          w =>
            view(
              lensIndex(getVertIdx(h, grid)),
              colorsGrid
            )[getHorizIdx(w, grid)],
          GRID_PIXEL_SIZE
        ),
      GRID_PIXEL_SIZE
    )
  )

module.exports = {
  getColorsGrid,
  getPngData,
}
