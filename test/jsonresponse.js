
// Dependencies
var mocha         = require('mocha')
  , chai          = require('chai')
  , sinon         = require('sinon')
  , JsonResponse  = require('../lib/jsonresponse')

// Locals
  , expect = chai.expect
  , Clientable;


// Represents an object that has a toClient method
Clientable = function() {
  this.client = false;
};
Clientable.prototype.toClient = function() {
  this.client = true;
  return this;
};

describe('JsonResponse constructor', function () {

  describe('with Result', function () {

    it('sets success property to true', function () {
      var sut = new JsonResponse(null, 'Hello');
      expect(sut.success).to.be.true;
    });

    it('sets error property to null', function () {
      var sut = new JsonResponse(null, 'Hello');
      expect(sut.error).to.be.null;
    });    

    it('sets results property to value', function () {
      var sut = new JsonResponse(null, 'Hello');
      expect(sut.results).to.equal('Hello');
    });

    describe('that is instanceOf Object', function () {

      it('executes toClient on object if available', function () {
        var result = new Clientable();
        var sut = new JsonResponse(null, result);
        expect(sut.results.client).to.be.true;
      });

      it('executes toClient on properties if no object toClient', function () {
        var result = { 
          sub1: new Clientable(),
          sub2: new Clientable()
        };

        var sut = new JsonResponse(null, result);
        expect(sut.results.sub1.client).to.be.true;
        expect(sut.results.sub2.client).to.be.true;
      });

    });

    describe('that is instanceOf Array', function () {
      it('executes toClient on each ', function () {
        var results = [ new Clientable(), new Clientable() ];
        var sut = new JsonResponse(null, results);
        expect(sut.results[0].client).to.be.true;
        expect(sut.results[1].client).to.be.true;
      });
    });

  });

  describe('with Error', function () {
    
    it('sets success property to false', function() {
      var sut = new JsonResponse('Bad');
      expect(sut.success).to.be.false;
    });

    it('sets error property to error arg', function () {
      var sut = new JsonResponse('Bad');
      expect(sut.error).to.equal('Bad');
    });

    it('sets results to null', function () {
      var sut = new JsonResponse('Bad');
      expect(sut.results).to.be.null;
    });
  
    describe('that is instanceOf Error', function () {

      it('sets error to an object ', function () {
        var sut = new JsonResponse(new Error('Bad'));
        expect(sut.error).to.be.an.instanceOf(Object);
        expect(sut.error.message).to.equal('Bad');
      });

      it('sets a stacktrace in dev mode', function () {
        var sut = new JsonResponse(new Error('Bad'));
        expect(sut.error.stack).to.not.be.null;
      });

    });

  });

  describe('with null', function() {
    it('sets success to true', function () {
      var sut = new JsonResponse(null, null);
      expect(sut.success).to.be.true;
    });
    it('sets error to null', function () {
      var sut = new JsonResponse(null, null);
      expect(sut.error).to.be.null;
    });
    it('sets results to null', function () {
      var sut = new JsonResponse(null, null);
      expect(sut.results).to.be.null;
    });
  });

});

describe('JsonResponse.expressHandler', function () {

  var res = {
    send: function () { }
  };

  var spy;

  // build spy
  beforeEach(function () {
    spy = sinon.spy(res, 'send');
  });

  // tear down spy
  afterEach(function() {
    res.send.restore();
  });

  describe('when no error', function () {

    it('sends JsonResponse', function () {
      var handler = JsonResponse.expressHandler(res)
        , error = null
        , result = { foo: 'bar' };

      handler(error, result);
      expect(spy.getCall(0).args[0]).is.an.instanceOf(JsonResponse);
    });

  });

  describe('when error', function () {

    it('sends 500 response', function () {
      var handler = JsonResponse.expressHandler(res)
        , error = new Error('boom')
        , result = null;  

      handler(error, result);
      expect(spy.getCall(0).args[0]).to.equal(500);
    });

    it('sends JsonResponse', function () {
      var handler = JsonResponse.expressHandler(res)
        , error = new Error('boom')
        , result = null;  

      handler(error, result);
      expect(spy.getCall(0).args[1]).is.an.instanceOf(JsonResponse);
    });

  });

});