const express = require('express');
var cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/bars', require('./routes/bars'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
