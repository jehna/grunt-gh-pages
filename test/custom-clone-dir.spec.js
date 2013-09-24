var fs = require('fs');
var path = require('path');

var helper = require('./helper');

var assert = helper.assert;

describe('custom-clone-dir', function() {
  var fixture, repo;

  before(function(done) {
    this.timeout(3000);
    helper.buildFixture('custom-clone-dir', function(error, dir) {
      fixture = dir;
      repo = path.join(fixture, 'clone-dir');
      done(error);
    });
  });

  after(function(done) {
    helper.afterFixture(fixture, done);
  });

  it('creates clone-dir directory', function(done) {
    fs.stat(repo, function(error, stats) {
      if (error) {
        return done(error);
      }
      assert.isTrue(stats.isDirectory(), 'directory');
      done();
    });
  });

  it('pushes the gh-pages branch to remote', function(done) {
    helper.git(['ls-remote', '--exit-code', '.', 'origin/gh-pages'], repo)
        .then(function() {
          done();
        })
        .fail(done);
  });

});