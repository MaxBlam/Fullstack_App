const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const router = require('./routes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
require('colors');
require('dotenv').config();

const app = express();

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '/public')));
app.use(helmet());

app.use(express.json());
app.use(cors());

app.use('/', router);

const PORT = process.env.PORT ?? 5000;

app.use(errorHandler);
app.use(notFoundHandler);

console.log(`listening on ${PORT}`);
app.listen(PORT);
