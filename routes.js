const express = require('express')
const router = express.Router()
const { compose } = require('ramda')
const { createPng } = require('./build-png')
const { getSeedFromDate, getHashFromSeed } = require('./hash')

router.get(['/'], async (req, res) => {
  const hash = compose(
    getHashFromSeed,
    getSeedFromDate
  )

  await createPng(hash())

  return res.render('index', {
    title: hash,
    src: './identicon.png?0',
  })
})

router.get(['/img-only-:seed'], async (req, res) => {
  const hash = getHashFromSeed(req.params.seed)
  await createPng(hash)
  return res.sendStatus(200)
})

module.exports = router
