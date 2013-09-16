node-socrata
===========

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