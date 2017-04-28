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

const request = require('request');

/**
 * for xim interface
 * @param  {object}   option   input plug url and token
 * @param  {Function} callback return plug list
 */
function discovery(options, callback) {
  const opt = {
    method: 'GET',
    url: `${options.api_endpoint}/things`,
    headers: {
      Authorization: `Bearer ${options.api_token}`,
    },
  };

  request(opt, (error, response, body) => {
    const jsonObj = JSON.parse(body);
    const list = {};
    list.switches = [];

    if (error) {
      throw new Error(error);
    } else {
      for (let i = 0; i < jsonObj.switches.length; i += 1) {
        if (jsonObj.switches[i].switch != null) {
          list.switches.push(jsonObj.switches[i]);
        }
      }
      callback(list);
    }
  });
}

/**
 * functions exporting
 */
module.exports = discovery;
