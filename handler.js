"use strict";
var handler = require("./index.js");

module.exports.hello = async (event, context) => {
  let result = await handler();
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: result,
      input: event
    })
  };
};
