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

Additionally, this module will automatically call `toClient` method on the Object or Array that JsonResponse receives in its constructor.

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

To create an error response, pass in the error result as the first argument.
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
app.get('/error', function(req, res) {
  
  var jsonResponse = JsonResponse.expressHandler(res);
  makeAsyncCall(jsonResponse);

});

```

### toClient
The `toClient` handling of the result argument will automatically execute for Objects or Arrays. The toClient method should return a mutated version of the object.

Take for example this object with its `toClient` method:
```
var result = {
  _id: '1234'
  __V: 0,

  toClient: function() {
    this.id = this._id;
    delete this._id;
    delete this.__V;
  }
};
```

The `toClient` method will conver `_id` to `id` and strip out the `_id` and `__V` properties for a result that looks like:
```
{
  id: '1234'
}
```

The JsonResponse object will automatically perform that conversion in its constructor.


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
