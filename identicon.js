const {
  __,
  add,
  addIndex,
  append,
  compose,
  divide,
  equals,
  findIndex,
  flatten,
  flip,
  head,
  inc,
  ifElse,
  length,
  lt,
  map,
  modulo,
  multiply,
  reverse,
  reject,
  repeat,
  take,
  times,
  splitEvery,
} = require('ramda')

const GREY = [200, 200, 200, 255]
const GRID_PIXEL_SIZE = 500
const CELL_SIZE = 100
const CELLS_PER_ROW = divide(500, 100)

const row = times(
  compose(multiply(CELL_SIZE), inc),
  CELLS_PER_ROW
)
const grid = repeat(row, CELL_SIZE)

const rgbaFromHash = compose(
  append(255),
  map(flip(parseInt)(16)),
  take(3),
  splitEvery(2)
)

const indexToRemove = compose(flip(divide)(2), length)

const removeMidRepeated = arr =>
  addIndex(reject)(
    compose(flip, equals, indexToRemove)(arr)
  )(arr)

const mirror = arr =>
  removeMidRepeated([...arr, ...reverse(arr)])

const isOdd = compose(Boolean, modulo(__, 2))

const isColor = (hash, n, i) =>
  isOdd(flip(parseInt)(16)(hash[add(n, i)]))

const getColorsGrid = hash =>
  addIndex(map)(
    compose(mirror, (arr, i) =>
      times(
        ifElse(
          n => isColor(hash, n, i),
          n => rgbaFromHash(hash),
          n => GREY
        ),
        3
      )
    ),
    repeat([], CELLS_PER_ROW)
  )

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
        times(w => {
          return colorsGrid[getVertIdx(h, grid)][
            getHorizIdx(w, grid)
          ]
        }, GRID_PIXEL_SIZE),
      GRID_PIXEL_SIZE
    )
  )

module.exports = {
  getColorsGrid,
  getPngData,
}
