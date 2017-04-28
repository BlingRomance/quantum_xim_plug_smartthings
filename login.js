/*
 * Copyright (c) 2017
 * Qblinks Incorporated ("Qblinks").
 * All rights reserved.
 *
 * The information contained herein is confidential and proprietary to
 * Qblinks. Use of this information by anyone other than authorized employees
 * of Qblinks is granted only under a written non-disclosure agreement,
 * expressly prescribing the scope and manner of such use.
 */

'use strict';

const express = require('express');
const authenticate = require('./authenticate.js');
const discovery = require('./discovery.js');
const action = require('./action.js');

const port = process.env.PORT || 8080;

const config = {
  client_id: '8d446b5e-283a-48a3-9a63-da853e2820e5',
  client_secret: '9a74aa43-1ed1-47a3-a496-908e0b53c268',
  site: 'https://graph.api.smartthings.com',
  authorize_path: '/oauth/authorize',
  token_path: '/oauth/token',
  callback: `http://127.0.0.1:${port}/callback`,
  discovery: `http://127.0.0.1:${port}/discovery`,
  code: '',
};

let oauth = {};

const app = express();

app.get('/', (req, res) => {
  res.send('<a href=/auth>Login with SmartThings</a>');
});

app.get('/auth', (req, res) => {
  const authorizationUri = `${config.site}${config.authorize_path}?scope=app&response_type=code&client_id=${config.client_id}`;

  res.redirect(authorizationUri);
});

app.get('/callback', (req, res) => {
  if (req.query.code) {
    config.code = req.query.code;
    authenticate(config, (result) => {
      oauth = result;
      res.redirect('/discovery');
    });
  } else {
    res.send('<a href=/auth>Login with SmartThings</a>');
  }
});

app.get('/discovery', (req, res) => {
  discovery(oauth, (cell) => {
    console.log(cell);

    let html = '<select class="select" name="select" >';
    for (let i = 0; i < cell.switches.length; i += 1) {
      html += `<option value=${i}> ${cell.switches[i].label}`;
    }

    res.send(html);
  });
});

app.get('/action', (req, res) => {
  oauth.command = req.query.command;
  action(oauth, (result) => {
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
