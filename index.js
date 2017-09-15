const fs = require('fs')

const { PNG } = require('pngjs')

const {
  __,
  assoc,
  addIndex,
  compose,
  constructN,
  divide,
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
  width: 100,
  height: 100,
  filterType: -1,
})

png.data = flatten(
  range(0, png.height).map(y => {
    return range(0, png.width).map(x => {
      return [255, 0, 185, 255]
    })
  })
)

console.log(png.data)

png.pack().pipe(fs.createWriteStream('identicon.png'))
