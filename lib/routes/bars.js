const { Router } = require('express');
const Bar = require('../models/Bar');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      address,
      notes
    } = req.body;

    Bar
      .create({ name, address, notes })
      .then(bar => res.send(bar))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Bar
      .find()
      .select({
        __v: false
      })
      .then(bars => res.send(bars))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Bar
      .findById(req.params.id)
      .select({
        __v: false
      })
      .then(bar => res.send(bar))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Bar
      .findByIdAndDelete(req.params.id)
      .then(bar => res.send(bar))
      .catch(next);
  });
