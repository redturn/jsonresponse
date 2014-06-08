jsonresponse
=============

Provides a JSON response helper object that wraps the response data with metadata to provide a consist response format for API endpoints. 

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

##Basic Usage



##Contributing

You can contribute to this project by adhearing to the following standards.  

Prior to contributing you should install grunt.

```
npm install -g grunt-cli
```

### Formatting
Please follow these coding standards
* Use spaces instead of tabs
* Use 2 spaces instead of 4 spaces
* Run JSHint via grunt `grunt lint`



