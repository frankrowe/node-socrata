node-socrata
===========

*** Example

```javascript
var socrataDataset = new Socrata.Dataset();
socrataDataset.setHost("https://data.maryland.gov");
socrataDataset.setAppToken(YOUR_APP_TOKEMN);
socrataDataset.setCredentials(username, password);

socrataDataset.query("$select=column1&$where=column2='something'" function(data){

});
```