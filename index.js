/*!
 * thunk-redis - index.js
 *
 * MIT Licensed
 */

'use strict';

var RedisClient = require('./lib/client'),
  tool = require('./lib/tool'),
  defaultPort = 6379,
  defaultHost = 'localhost';

exports.createClient = function (port, host, options) {
  var  netOptions;

  if (typeof port === 'string') {
    netOptions = {path: port};
    options = host;
  } else {
    netOptions = {port: port || defaultPort, host: host || defaultHost};
    if (typeof port !== 'number') {
      netOptions.port = defaultPort;
      options = port;
    } else if (typeof host !== 'string') {
      netOptions.host = defaultHost;
      options = host;
    }
  }

  options = options || {};
  if (options.noDelay == null) options.noDelay = true;
  if (options.keepAlive == null) options.keepAlive = true;
  options.timeout = +options.timeout || 0;
  options.maxAttempts = +options.maxAttempts || 0;
  options.commandQueueHighWater = +options.commandQueueHighWater || 1000;
  options.commandQueueLowWater = +options.commandQueueLowWater || 0;
  options.authPass = options.authPass || '';
  options.database = +options.database || 0;

  return new RedisClient(netOptions, options);
};

exports.log = tool.log;
