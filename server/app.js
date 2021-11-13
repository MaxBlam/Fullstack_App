const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const router = require('./routes/cars');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const cors = require('cors');
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

app.listen(PORT);
