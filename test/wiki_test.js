var chai = require('chai');
chai.should();
expect = chai.expect;


var Page = require('../models').Page;


describe('Page model', function(){
	var emptyPage, myPage;
	beforeEach(function(){
		emptyPage = new Page(); //entirely synchronous because it doesn't need to access database
	});

	beforeEach(function(done){
		Page.create({
			title: '1601',
			content: '1601 is great'
		})
		.then(function(page){
			myPage = page;
			done(); // done is necessary because the test needs to access the database
		});

	});
	it('page should have title', function(){
		expect(myPage.title).to.equal('1601');
	})
})