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
  mapObjIndexed,
} = require('ramda')

const png = new PNG({
  width: 500,
  height: 500,
  filterType: -1,
})

// const grid  = [
//   [100, 200, 300, 400, 500],
//   [100, 200, 300, 400, 500],
//   [100, 200, 300, 400, 500],
//   [100, 200, 300, 400, 500],
//   [100, 200, 300, 400, 500],
// ]
const grid = map(
  n => map(n => n * 100, range(1, 6)),
  range(0, 5),
)
console.log('grid', JSON.stringify(grid))

const pink = [255, 0, 185, 255]
const grey = [100, 100, 100, 255]

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
const randomColors = map(
  n => map(n => random(pink, grey), range(0, 5)),
  range(0, 5),
)

png.data = flatten(
  map(
    h =>
      map(
        // h 240, w 99 = randomColors[2][0]
        w => {
          const hIdx = addIndex(findIndex)(
            (row, idx) => lt(h, multiply(inc(idx), 100)),
            grid,
          )
          const wIdx = grid[0].findIndex(n => lt(w, n))
          return randomColors[hIdx][wIdx]
        },
        range(0, png.width),
      ),
    range(0, png.height),
  ),
)
console.log(png.data[0])

png.pack().pipe(fs.createWriteStream('identicon.png'))
