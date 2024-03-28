const express = require('express');
const conflictRouter = express.Router()
const { OverviewConflicts } = require('../database/index.js')

conflictRouter.get('/api/getAllConflicts', (req, res) => {
    OverviewConflicts.findAll({})
    .then((results) => {
        res.status(200).send(results)
    })
    .catch((err) => {
        console.error(err)
        res.sendStatus(500)
    })
})


conflictRouter.post('/api/createConflict', (req, res) => {
    OverviewConflicts.create(req.body)
    .then((results) => {
        res.sendStatus(200)
    })
    .catch((err) => {
        console.error(err)
        res.sendStatus(500)
    })
})

module.exports = conflictRouter