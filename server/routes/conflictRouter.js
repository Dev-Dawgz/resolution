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

conflictRouter.patch(`/api/updateStatus`, (req, res) => {
    const { id, conflictStatus } = req.body;
    console.log(req.body)
  OverviewConflicts.update({ conflictStatus }, { where: { id } })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(500);
    });
    
})

conflictRouter.delete('/api/deleteConflict/:id', (req, res) => {
    const {id} = req.params
    OverviewConflicts.destroy({
        where: {id}
    })
    .then(() => {
        res.sendStatus(200)

    })
    .catch(() => {
        res.sendStatus(500)
    })
})



module.exports = conflictRouter