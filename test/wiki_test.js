var chai = require('chai');
should = chai.should();
expect = chai.expect;


var Page = require('../models').Page;
require('../models');

describe('Page model', function(){
		//set up empty page
		var emptyPage, myPage, sharedTagPage, noSharedTagPage;
		beforeEach(function(){
			emptyPage = new Page(); //entirely synchronous because it doesn't need to access database
		});
		//set up page with title & content
		beforeEach(function(done){
		Page.create({
			title: '1601',
			content: '1601 is great',
			tags: ['todayisthursday', 'gracehopper', 'werethebest'],
			urlTitle: 'iamfake'
		})
		.then(function(page){
			myPage = page;
			});


		Page.create({
			title: 'testing tags',
			content: '1601 is still great',
			tags: ['i am different', 'gracehopper', 'i am also green']
		})
		.then(function(page){
			sharedTagPage = page;
			});

		Page.create({
			title: 'things that hop',
			content: '1601 is great',
			tags: ['frogs', 'grasshoppers', 'rabbits']
		})
		.then(function(page){
			noSharedTagPage = page;
			done(); // done is necessary because the test needs to access the database
			});
		});

		afterEach(function(done){
			Page.remove({})
			.then(function(){
				done();
			})
			.then(null, done);
		});

	describe('Validations', function(){
	
		
		xit('exptect title to be required', function(done){
			emptyPage.validate(function(err){
				expect(err.errors).to.have.property('title');
				done();
			})
		});
		xit('expect content to be required', function(done){
			emptyPage.validate(function(err){
				expect(err.errors).to.have.property('content');
				done();
			})
		});
		// don't test urlTitle because the pre-validation in models creates one
	});

    xdescribe('Statics', function() {
        describe('findByTag', function() {
            xit('gets pages with the search tag', function(done) {
            	Page.findByTag('todayisthursday') //WHAAAAT?
            	.then(function(pages){
            		console.log(pages.length);
	            	expect(pages).to.have.lengthOf(1);
	            	done();
            	})
            	.then(null, done);
            });
            xit('does not get pages without the search tag', function(done) {
			    Page.findByTag('falafel')
			    .then(function (pages) {
			        expect(pages).to.have.lengthOf(0)
			        done();
			    }).then(null, done);
			})
        });
    });

    describe('Methods', function(){
    	describe('findSimilar', function(){
    		it('finds pages with any same tags', function(done){
    			myPage.findSimilar()
    			.then(function(pages){
    				expect(pages).to.have.lengthOf(1);
    				done();
    			})
    			.then(null, done);
    		})
    	})
    })

    describe('Virtuals', function(){
    	it('myPage should have a urlTitle /wiki/ + urlTitle', function(){
    		expect(myPage.route).to.equal('/wiki/' + myPage.urlTitle);
    	})
    })

    describe('Hooks', function(){
    	it('page with no pre-set urlTitle is validate after urlTitle is created', function(){
    		should.not.exist(emptyPage.urlTitle);
    		should.exist(noSharedTagPage.urlTitle);
    		expect(noSharedTagPage.route).to.equal('/wiki/' + noSharedTagPage.urlTitle);
    	})
    })

})