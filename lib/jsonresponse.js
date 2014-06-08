var util = require('util')  
  , NODE_ENV = process.env.NODE_ENV || 'development';

// Creates a uniform Json Response
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
  if(results.toClient) {
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
  return results;
}


module.exports = JsonResponse;