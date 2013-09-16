node-socrata
===========

* Node Library to interact with the [Socrata Open Data API](http://dev.socrata.com/consumers/getting-started).
* Alpha version 0.0.1

Example

```javascript
var Socrata = require('./Socrata');

var dataset = new Socrata.Dataset();
dataset.setHost("https://data.maryland.gov");
dataset.setUID("xxxx-xxxx");
dataset.setAppToken(app_token);

//if dataset is private
dataset.setCredentials(username, password);

dataset.query("$select=column1&$where=column2='something'" function(data){

});

dataset.getColumns(function(columns){

});

```

Test

```javascript
node test/test.js
```