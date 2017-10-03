const { compose, or } = require('ramda')
const { getSeedFromDate, getHashFromSeed } = require('./hash')
const { createPng } = require('./build-png')
const argv = require('yargs-parser')(process.argv.slice(2))

const seed = or(argv.seed, getSeedFromDate())

compose(
  createPng,
  getHashFromSeed,
)(seed)
