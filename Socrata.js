var request = require('request');

function Dataset() {
  this.host = "http://www.socrata.com";
}

Dataset.prototype.setHost = function(host){
  this.host = host;
};

Dataset.prototype.setUID = function(uid){
  this.uid = uid;
};

Dataset.prototype.setAppToken = function(apptoken){
  this.apptoken = apptoken;
};

Dataset.prototype.setCredentials = function(username, password){
  this.username = username;
  this.password = password;
}

// Given a string, look for a properly formatted UID. 
//  returns: false on failure
Dataset.prototype.extractUID = function(url) {
  matches = url.match(/.*([a-z0-9]{4}-[a-z0-9]{4}).*/);
  if ( matches == null || matches.length < 2 ) {
    return false;
  }
  this.uid = matches[1];
  return true;
};

// TODO: Better protocol handling
Dataset.prototype.extractHost = function(url) {
  matches = url.match(/^(?:[^\/]+:\/\/)?([^\/]+)/im);
  if ( matches == null || matches.length < 2 ) {
    return;
  }
  this.host = "http://" + matches[1];
};

Dataset.prototype.columnsCallback = function(data) {
  this.columns = data;
};

Dataset.prototype.rowsCallback = function(data) {
  this.rows = data.data;
}

Dataset.prototype.jsonWrap = function(url) {
  return this.host + url;
};

// Ready a string for use in JSONP callback
Dataset.prototype.jsonpWrap = function(url) {
  return this.host + url + (url.indexOf('?') == -1 ? '?' : '&') + 'jsonp=?';
};

// Where to get general information about this dataset
Dataset.prototype.viewDataURL = function() {
  return this.jsonWrap("/views/" + this.uid);
};

// Where to get the rows JSON from
Dataset.prototype.rowsURL = function() {
  return this.jsonWrap("/views/" + this.uid + "/rows.json");
};

// And the columns
Dataset.prototype.columnsURL = function() {
  return this.jsonWrap("/views/" + this.uid + "/columns.json");
};

Dataset.prototype.getColumns = function(callback){
  var url = this.columnsURL() + "?$$app_token=" + this.apptoken;
  request({
    url: url,
    json: true,
    auth: {
      user: this.username,
      pass: this.password
    }}, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(body);
      } else {
        console.log(error);
        console.log(response.statusCode);
      }
  });
}

// A short link to this dataset
Dataset.prototype.shortURL = function() {
  return this.host + "/d/" + this.uid;
};

Dataset.prototype.apiURL = function() {
  return this.host + "/resource/" + this.uid + ".json?$$app_token=" + this.apptoken;
};

Dataset.prototype.queryURL = function(query){
  return this.apiURL() + "&" + query;
}

Dataset.prototype.query = function(query, callback){
  var url = this.queryURL(query);
  request({
    url: url,
    json: true,
    auth: {
      user: this.username,
      pass: this.password
    }}, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(body);
      } else {
        console.log(error);
        console.log(response.statusCode);
      }
  });
}

exports.Dataset = Dataset;