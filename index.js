const fs = require('fs')

const { PNG } = require('pngjs')

const {
  __,
  assoc,
  addIndex,
  compose,
  constructN,
  divide,
  dropLast,
  filter,
  findIndex,
  flatten,
  forEach,
  head,
  invoker,
  inc,
  join,
  juxt,
  lens,
  lt,
  map,
  modulo,
  multiply,
  update,
  not,
  prop,
  range,
  set,
  splitEvery,
  take,
  times,
  mapObjIndexed,
} = require('ramda')

const png = new PNG({
  width: 500,
  height: 500,
  filterType: -1,
})

const pink = [200, 50, 100, 255]
const grey = [200, 200, 200, 255]

const GRID_PIXEL_SIZE = 500
const CELL_SIZE = 100
const CELLS_PER_ROW = 500 / 100

// const grid  = [
//   [100, 200, 300, 400, 500],
//   [100, 200, 300, 400, 500],
//   [100, 200, 300, 400, 500],
//   [100, 200, 300, 400, 500],
//   [100, 200, 300, 400, 500],
// ]
const grid = times(
  n =>
    times(n => multiply(inc(n), CELL_SIZE), CELLS_PER_ROW),
  CELL_SIZE,
)

// temp
const random = (...args) =>
  args[Math.floor(Math.random() * 2)]

// const randomColors = [
//   [blue, grey, blue, grey, blue],
//   [blue, blue, blue, blue, blue],
//   [grey, grey, blue, grey, grey],
//   [blue, grey, blue, grey, blue],
//   [blue, grey, grey, grey, blue],
// ]
const randomColorsGrid = map(
  n => times(n => random(pink, grey), CELLS_PER_ROW),
  range(0, 5),
)

const getVertIdx = (h, grid) =>
  addIndex(findIndex)((row, idx) =>
    lt(h, multiply(inc(idx), 100)),
  )(grid)

const getHorizIdx = (w, grid) =>
  findIndex(n => lt(w, n), head(grid))

png.data = flatten(
  times(
    h =>
      times(
        w =>
          randomColorsGrid[getVertIdx(h, grid)][
            getHorizIdx(w, grid)
          ],
        GRID_PIXEL_SIZE,
      ),
    GRID_PIXEL_SIZE,
  ),
)

png.pack().pipe(fs.createWriteStream('identicon.png'))
