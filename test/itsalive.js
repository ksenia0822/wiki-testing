var chai = require('chai');
chai.should();

var spies = require('chai-spies');
chai.use(spies);

var expect = chai.expect

// describe('plus operation', function() {
// 	it('should add two numbers', function() {
// 		expect(2+2).to.equal(4);
// 	})
// })


// describe('set timeout' , function() {

// 	it('takes approx 1000 milliseconds', function(done){
// 		setTimeout(function() {
// 			done();
// 		}, 1000)

// 	})
// })




describe('spies', function(){

	// it('expect foobar have been called', function() {
	// 	var obj = {
	// 	    foobar: function () {
	// 	        console.log('foo');
	// 	        return 'bar';
	// 	    }
	// 	}

	// 	chai.spy.on(obj, 'foobar');
	// 	obj.foobar();
	// 	obj.foobar();

	// 	expect(obj.foobar).to.have.been.called.exactly(2);
	// })

	it('expect foobar have been called', function() {
		function testFunc() {return 12;}
			var test = chai.spy(testFunc);
			expect(test()).to.equal(12);
	})
})







