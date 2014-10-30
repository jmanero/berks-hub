var Request = require('request');

var Organization = module.exports = function(params) {
  this.__requests = new RateLimiter(params);
};

Organization.prototype.cookbooks = function(callback) {

};

Organization.prototype.metadata = function(cookbook, version, callback) {

};

Organization.prototype.request = function(params, callback) {
  this.__requests.push(request, callback);
};

var RateLimiter = Organization.RateLimiter = function(options) {
  options = options || {};

  this.rate = options.rate || 5; // Requests/second
  this.parallel = options.parallel || 1; // Parallel requests

  this.pending = [];
  this.inflight = 0;
};

function worker() {
  if(this.inflight >= this.parallel) return;
  if(this.pending.length === 0) return;

  this.inflight++;
  this.__client(request, function(err, res, body) {
    callback(err, body, res);
  });
}

RateLimiter.prototype.push = function(params, callback) {
  this.pending.push([params, callback]);

};
