var Socrata = require('../Socrata');

//test public dataset
var dataset = new Socrata.Dataset();
dataset.setHost("https://opendata.socrata.com");
dataset.setUID("pumv-9uad");

dataset.query("$select=programming_language", function(data){
  console.log(data);
});

dataset.getColumns(function(columns){
  console.log(columns);
});
