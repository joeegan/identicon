const { or } = require('ramda')
const { getSeedFromDate, createHash } = require('./hash')
const { createPng } = require('./build-png')
const argv = require('yargs-parser')(process.argv.slice(2))

const seed = or(argv.seed, getSeedFromDate())
createPng(createHash(seed))
