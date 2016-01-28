var chai = require('chai');
chai.should();
expect = chai.expect;


var Page = require('../models').Page;
require('../models');

describe('Page model', function(){
		//set up empty page
		var emptyPage, myPage;
		beforeEach(function(){
			emptyPage = new Page(); //entirely synchronous because it doesn't need to access database
		});
		//set up page with title & content
		beforeEach(function(done){
		Page.create({
			title: '1601',
			content: '1601 is great',
			tags: ['todayisthursday', 'gracehopper', 'werethebest']
		})
		.then(function(page){
			myPage = page;
			done(); // done is necessary because the test needs to access the database
			});
		});

		afterEach(function(done){
			myPage.remove({})
			.then(function(){
				done();
			})
			.then(null, done);
		});

	describe('Validations', function(){
	
		
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
            it('gets pages with the search tag', function(done) {
            	Page.findByTag('todayisthursday') //WHAAAAT?
            	.then(function(pages){
            		console.log(pages.length);
	            	expect(pages).to.have.lengthOf(1);
	            	done();
            	})
            	.then(null, done);
            });
            it('does not get pages without the search tag', function(done) {
			    Page.findByTag('falafel')
			    .then(function (pages) {
			        expect(pages).to.have.lengthOf(0)
			        done();
			    }).then(null, done);
			})
        });
    });

})