const fs = require('fs')

const { PNG } = require('pngjs')

const {
  add,
  addIndex,
  compose,
  divide,
  equals,
  findIndex,
  flatten,
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
  times,
} = require('ramda')

const crypto = require('crypto')

const png = new PNG({
  width: 500,
  height: 500,
  filterType: -1,
})

const GREY = [200, 200, 200, 255]
const GRID_PIXEL_SIZE = 500
const CELL_SIZE = 100
const CELLS_PER_ROW = divide(500, 100)

const grid = times(
  n =>
    times(n => multiply(inc(n), CELL_SIZE), CELLS_PER_ROW),
  CELL_SIZE
)

const seed = 'joeegan'
const hash = crypto
  .createHash('md5')
  .update(seed)
  .digest('hex')

const colorBasedOffHash = hash => [
  parseInt(hash.substring(0, 2), 16),
  parseInt(hash.substring(2, 4), 16),
  parseInt(hash.substring(4, 6), 16),
  255,
]

const mirror = arr =>
  addIndex(reject)(
    (n, i, arr) => equals(i, divide(length(arr), 2)),
    [...arr, ...reverse(arr)]
  )

const isColor = (hash, n, i) =>
  equals(modulo(parseInt(hash[add(n, i)], 16), 2), 0)

const colorsGrid = addIndex(map)(
  compose(mirror, (arr, i) =>
    times(
      ifElse(
        n => isColor(hash, n, i),
        n => colorBasedOffHash(hash),
        n => GREY
      ),
      3
    )
  ),
  times(n => [], CELLS_PER_ROW)
)

const getVertIdx = (h, grid) =>
  addIndex(findIndex)(
    (row, idx) => lt(h, multiply(inc(idx), 100)),
    grid
  )

const getHorizIdx = (w, grid) =>
  findIndex(n => lt(w, n), head(grid))

png.data = flatten(
  times(
    h =>
      times(
        w =>
          colorsGrid[getVertIdx(h, grid)][
            getHorizIdx(w, grid)
          ],
        GRID_PIXEL_SIZE
      ),
    GRID_PIXEL_SIZE
  )
)

png.pack().pipe(fs.createWriteStream('identicon.png'))
