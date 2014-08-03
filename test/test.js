var should = require('should'),
    parseLinkHeader = require('link-header-parser');

var emptySample = {
  input: '',
  output: false
};

var samples = [{
  input: '<https://api.github.com/resource?page=2>; rel="next",<https://api.github.com/resource?page=5>; rel="last"',
  output: {
    next: {
      url: 'https://api.github.com/resource?page=2'
    },
    last: {
      url: 'https://api.github.com/resource?page=5'
    }
  }
}, {
  input: '<http://example.com/TheBook/chapter2>; rel="previous"; title="previous chapter"',
  output: {
    previous: {
      url: 'http://example.com/TheBook/chapter2',
      title: 'previous chapter'
    }
  }
}];

describe('link-header-parser', function() {
  it('should return false if no header is passed', function() {
    parseLinkHeader(emptySample.input).should.be.false;
  })

  it('should return a parsed link header for sample 1', function() {
    var sample = samples[0];
    parseLinkHeader(sample.input).should.eql(sample.output);
  })

  it('should return a parsed link header for sample 2', function() {
    var sample = samples[1];
    parseLinkHeader(sample.input).should.eql(sample.output);
  })
})
