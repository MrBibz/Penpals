"use strict";
const express = require('express');
const cors = require('cors');
const api = require('./api');
const mongoose = require('mongoose');
const localURL = 'mongodb://localhost:27017/penpals';
const app = express();
app.use(cors());
app.use(express.json());
app.use('/', api);
mongoose.connect(localURL);
app.listen(3000, () => {
    console.log('Server started');
});
