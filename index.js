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
  flatten,
  forEach,
  invoker,
  join,
  juxt,
  lens,
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

const pink = [255, 0, 185, 255]
const grey = [100, 100, 100, 255]
const getColor = n => (n / 100 % 2 == 0 ? pink : grey)

// [[0, 99, [255, 0, 185, 255], ...]
const rangesWithRgba = map(
  compose(n => [n, n + 99, getColor(n)], multiply(100)),
  range(0, 6),
)

png.data = flatten(
  map(
    h =>
      map(
        w => rangesWithRgba.find(r => h < r[1])[2],
        range(0, png.width),
      ),
    range(0, png.height),
  ),
)

png.pack().pipe(fs.createWriteStream('identicon.png'))
