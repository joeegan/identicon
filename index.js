const fs = require('fs')

const { PNG } = require('pngjs')

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

const row = times(
  compose(multiply(CELL_SIZE), inc),
  CELLS_PER_ROW
)
const grid = repeat(row, CELL_SIZE)

const seed = 'joeegan'
const hash = crypto
  .createHash('md5')
  .update(seed)
  .digest('hex')

const rgbaFromHash = hash =>
  compose(
    append(255),
    map(flip(parseInt)(16)),
    take(3),
    splitEvery(2)
  )(hash)

const mirror = arr =>
  addIndex(reject)(
    (n, i, arr) => equals(i, divide(length(arr), 2))
  )([...arr, ...reverse(arr)])

const isOdd = n =>
  compose(
    Boolean,
    modulo(__,  2)
  )(n)

const isColor = (hash, n, i) =>
  isOdd(
    parseInt(hash[add(n, i)], 16)
  )

const colorsGrid = addIndex(map)(
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
