jsonresponse
=============

A JSON response helper that wraps response data with metadata about the response status.

A standard success response would have the format:

```
{
  "success": true,
  "error": null,
  "results": {
    id: 123,
    firstname: "Brian",
    lastname: "Mancini",
    age: 32
  }
}
```

An error response would have the format:
```
{
  "success": false,
  "error": {
    "message": "Code did something bad",
    "stack": "Error: Code did something bad\n    at Object.exports.throwError [as handle] ... "
  },
  "results": null
}
```

##Usage

Install jsonresponse from NPM:
```
npm install jsonresponse;
```

You can then include it in a module via:
```
var JsonResponse = require('jsonresponse');
```

### JsonResponse

JsonResponse constructor takes two arguments, in the standard node style `(err, result)`.  

To create a success response, pass in the results object, array, or value as the second argument:
```
var results = { foo: 'bar' }
var json = new JsonResponse(null, results);
```

To create an error response, pass in the error result as the first argument.  The 
```
var error = new Error('Boom!')
var json = new JsonResponse(error);
```

### Working with Express
If you are using express, you can manually use JsonResponse by constructing an object as shown above
```
app.get('/', function(req, res) {
  
  someAsyncCall(function(err, result) {
    if(err) {
      res.send(500, new JsonResponse(err));
    } else {
      res.send(new JsonResponse(null, result);
    }
  });

});
```

Alternatively, you can reduce boilerplate by using the express Helper that will construct the JsonResponse object for you and send the result back.
```
var JsonResponse    = require('JsonResponse')
  , expressHandler  = JsonResponse.expressHandler

app.get('/error', function(req, res) {
  
  makeAsyncCall(expressHandler(res));

});

```


##Contributing

You can contribute to this project by adhearing to the following standards.  

Prior to contributing you should install grunt.
```
npm install -g grunt-cli
```

You can then easily validate your code:
```
grunt validate
```

### Formatting
Follow these coding standards
* Use spaces instead of tabs
* Use 2 spaces instead of 4 spaces

### Linting
Run JSHint on your code. Linting can be run via grunt:
```
grunt lint
```

### Testing
Ensure proper code coverage. Tests can be run via grunt
```
grunt test
```

### Commenting
Use JSDoc style commenting for methods and classes. 
Other comments can use standard `//` style comments.
