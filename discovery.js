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
    url: `${options.xim_content.uri}/outletDiscovery`,
    headers: {
      Authorization: `Bearer ${options.xim_content.access_token}`,
    },
  };

  request(opt, (error, response, body) => {
    const result = JSON.parse(body);
    const callback_option = JSON.parse(JSON.stringify(options));
    callback_option.list = [];

    Object.keys(result.outlets).forEach((key) => {
      const plug = {};
      plug.plug_status = {};
      plug.device_name = result.outlets[key].label;
      plug.device_id = result.outlets[key].id;
      if (result.outlets[key].outlet === 'on') {
        plug.plug_status.onoff = true;
      } else {
        plug.plug_status.onoff = false;
      }
      callback_option.list.push(plug);
    });
    callback(callback_option);
  });
}

/**
 * functions exporting
 */
module.exports = discovery;
