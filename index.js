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

const seed = 'joeegan'


const row = times(
  compose(
    multiply(CELL_SIZE),
    inc
  ),
  CELLS_PER_ROW
)
const grid = repeat(row, CELL_SIZE)

const hash = crypto
  .createHash('md5')
  .update(seed)
  .digest('hex')

const rgbaFromHash = compose(
  append(255),
  map(flip(parseInt)(16)),
  take(3),
  splitEvery(2)
)

const indexToRemove = compose(
  flip(divide)(2),
  length
)

const removeMidRepeated = arr => compose(
  addIndex(reject)(
    flip(equals(indexToRemove(arr)))
  )
)(arr)

const mirror = arr =>
  removeMidRepeated([...arr, ...reverse(arr)])

const isOdd = compose(
  Boolean,
  modulo(__,  2)
)

const isColor = (hash, n, i) =>
  isOdd(
    flip(parseInt)(16)(hash[add(n, i)])
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
