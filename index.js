const express = require('express');
const path = require('path');
const apiRouter = require('./server/apiRouter');

const app = express();

app.use('/api', apiRouter);

const port = process.env.PORT || 8000;
app.listen(port);

console.log(`Started server on port ${port}`);
