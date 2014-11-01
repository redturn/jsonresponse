var util = require('util')  
  , NODE_ENV = process.env.NODE_ENV || 'development';

/** 
 * Creates a uniform Json response object
 * @param err the optional error
 * @param results the optional results
 * @constructor
 */
var JsonResponse = function(err, results) {
  if(err) {
    this.success = false;
    this.error = err;
    this.results = null;

    // customize error for error types
    if(util.isError(err)) {
      this.error = {
        message: err.message,
        type: err.type,
        arguments: err.arguments
      };
      if(NODE_ENV === 'development') {
        this.error.stack = err.stack;
      }
    }    

  } else {
    this.success = true;
    this.error = null;      
    this.results = convertToClient(results);    
  }
};

/** 
 * Helper function that builds a function that accepts
 * a standard node-style callback that will send
 * an appropriate response via Express
 * @param {object} res is an Express Response object
 * @returns {function} returns a function that accepts a 
 *  node-style callback (err, results)
 */
JsonResponse.expressHandler = function(res) {
  return function(err, value) {
    if(err) {
      res.send(500, new JsonResponse(err));
    } else {
      res.send(new JsonResponse(null, value));
    }
  };
};

function convertToClient(results) {
  if(results && results.toClient) {
    results = results.toClient();
  }
  else if(util.isArray(results)) {    
    results = results.map(function(result) {
      if(result.toClient) {
        result = result.toClient();
      }
      return result;
    });
  }
  else if (results instanceof Object) {
    for(var prop in results) {
      if(results[prop] instanceof Object) {
        results[prop] = convertToClient(results[prop]);
      }
    }
  }
  return results;
}


module.exports = JsonResponse;