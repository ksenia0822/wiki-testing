var supertest = require('supertest');
var app = require('../app');
var agent = supertest.agent(app);
var Page = require('../models').Page;


describe('http requests', function(){
	var myPage, sharedTagPage, noSharedTagPage;
	beforeEach(function(){
		Page.create({
			title: '1601',
			content: '1601 is great',
			tags: ['todayisthursday', 'gracehopper', 'werethebest'],
			// urlTitle: 'iamfake'
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
	})
	afterEach(function(done){
		Page.remove({})
		.then(function(){
			done();
		})
		.then(null, done);
	});

	describe('GET /', function() {
        it('gets 200', function(done) {
        	agent.get('/').expect(200, done);
        });
    });

    describe('GET /add', function () {
        it('gets 200', function(done) {
        	agent.get('/wiki/add').expect(200)
        	.end(function(err, res){
        		if (err) return done(err);
        		done();
        	});
        });
    });

    describe('GET /wiki/:urlTitle', function() {

        it('gets 404 on page that doesnt exist', function(done) {
        	agent.get('/wiki/cats').expect(404, done);
        });
        it('gets 200 on page that does exist', function(done) {
        	agent.get('/wiki/1601').expect(200, done);
        });
    });

    describe('GET /wiki/search', function() {
        it('gets 200', function(done) {
        	agent.get('/wiki/search').expect(200, done);
        });
    });

    describe('GET /wiki/:urlTitle/similar', function() {
        it('gets 404 for page that doesn\'t exist', function(done) {
        	agent.get('/wiki/cats/similar').expect(404, done);
        });

        it('gets 200 for similar page', function(done) {
        	agent.get('/wiki/1601/similar').expect(200, done);
        });
    });

// ??? WHY BOTH /ADD AND WIKI/ADD?
    describe('GET /wiki/add', function() {
        it('gets 200', function(done) {
        	agent.get('/wiki/add').expect(200, done);
        });
    });


    describe('POST /wiki', function() {
        it('creates a page in db', function(done) {
        	return agent.post('/wiki')
        	.send({title: 'specialTitle', content: 'special content', name: 'Emma', email: 'e@gmail.com', tags: ['tag1', 'tag2'] })
        	.expect(302)
        	.then(function() {
				return Page.find({title: 'specialTitle'})
        	})
        	.then(function(query) {
	        	console.log(query);
	        	expect(query.content).to.equal('special content');
	        	//done();
	        })
	        //.then(null, done)


   
         });
    });

})














