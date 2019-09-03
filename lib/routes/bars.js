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
  });
  