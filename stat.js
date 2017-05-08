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
  * Get the stat
  *
  * @param {object} options object created from xim_instance() with the additional
  *                 options added by xim_authenticate, refer to corresponding
  *                 documents for the details
  * @param {function} callback to be used by the XIM driver
  */
function stat(options, callback) {
  const opt = {
    method: 'GET',
    url: `${options.xim_content.uri}/outletStat/${options.device_id}`,
    headers: {
      Authorization: `Bearer ${options.xim_content.access_token}`,
    },
  };

  request(opt, (error, response, body) => {
    const result = JSON.parse(body);
    const callback_option = JSON.parse(JSON.stringify(options));
    callback_option.stat = [];

    const plug = {};
    plug.plug_status = {};
    plug.device_name = result.outlets.label;
    plug.device_id = result.outlets.id;
    if (result.outlets.outlet === 'on') {
      plug.plug_status.onoff = true;
    } else {
      plug.plug_status.onoff = false;
    }
    callback_option.stat.push(plug);
    callback(callback_option);
  });
}


/**
 * functions exporting
 */
module.exports = stat;
