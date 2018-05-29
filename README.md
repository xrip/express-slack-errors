# express-slack-errors
NodeJS ExpressJS middleware that Sends all your express errors/exceptions to Slack channel via Slack webhooks (which may be rate limited by slack server) or via Slack API

#### Installation
``
npm install express-slack-errors
``

#### Example usage with Slack API
Replace <SLACK_API_TOKEN> with API Token obtained from https://api.slack.com/tokens
```javascript
'use strict';

const express = require('express');
const slackErrors = require('./index.js');

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

```


#### Example usage with Slack Webhook
Replace <SLACK_WEBHOOK_URL> with your incoming webhook url obtained from https://api.slack.com/slack-apps

But remember slack servers limit rate if your logs exceed 1 message per second. API usage preffered 

```javascript
'use strict';

const express = require('express');
const slackErrors = require('./index.js');

const app = express();

// Route that triggers a error
app.get('/error', function (req, res, next) {
    const err = new Error('Internal Server Error');
    err.status = 500;
    next(err)
});

// Send error reporting to Slack
app.use(slackErrors({ webhookUri: '<SLACK_WEBHOOK_URL>', channel: '#logs_nodejs' }));
app.listen(3000);

```