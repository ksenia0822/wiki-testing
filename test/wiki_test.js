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
	
	describe('validations', function(){
		it('exptect title to be required', function(done){
			emptyPage.validate(function(err){
				expect(err.errors).to.have.property('title');
				done();
			})
		});
		
		it('expect content to be required', function(done){
			emptyPage.validate(function(err){
				expect(err.errors).to.have.property('content');
				done();
			})
		});
		// don't test urlTitle because the pre-validation in models creates one
	});

    describe('Statics', function() {
        describe('findByTag', function() {
            xit('gets pages with the search tag', function() {});
            xit('does not get pages without the search tag', function() {});
        });
    });

})