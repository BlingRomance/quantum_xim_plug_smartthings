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
 * [action description]
 * @param  {object} option Plug action properties
 * @return {bool}        seccess or fail
 */
function action(options, callback) {
  const opt = {
    method: 'PUT',
    url: `${options.xim_content.uri}/outletAction/${options.device_id}/${options.command}`,
    headers: {
      Authorization: `Bearer ${options.xim_content.access_token}`,
    },
  };

  request(opt, (error, response) => {
    if (response.statusCode === 204) {
      callback('OK');
    } else {
      throw new Error(error);
    }
  });
}

/**
 * functions exporting
 */
module.exports = action;
