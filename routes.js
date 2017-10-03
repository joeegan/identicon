const express = require('express')
const { createPng } = require('./build-png')
const router = express.Router()
const crypto = require('crypto')
const { or } = require('ramda')

const getHashFromDate = () =>
  new Date()
    .getTime()
    .toString()
    .split('')
    .reverse()
    .join('')

router.get(['/', '/:seed'], async (req, res) => {
  const seed = or(req.params.seed, getHashFromDate())

  const hash = crypto
    .createHash('md5')
    .update(seed)
    .digest('hex')

  await createPng(hash)

  return res.render('index', {
    title: hash,
    src: './identicon.png',
  })
})

router.get(['/img-only:seed'], async (req, res) => {
  const seed = req.params.seed

  const hash = crypto
    .createHash('md5')
    .update(seed)
    .digest('hex')

  await createPng(hash)

  return true
})

module.exports = router
