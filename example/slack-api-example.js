'use strict';

const express = require('express');
const slackErrors = require('../index.js');

const app = express();

// Route that triggers a error
app.get('/error', function (req, res, next) {
    const err = new Error('Internal Server Error');
    err.status = 500;
    next(err)
});

// Send error reporting to Slack
app.use(slackErrors({ token: '<SLACK_API_TOKEN>', channel: '#logs_nodejs' }));
app.listen(3000);
