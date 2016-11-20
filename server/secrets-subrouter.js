const express = require('express');
const router = express.Router();
module.exports = router;

const models = require('../db/models');
const Secret = models.Secret;
const Comment = models.Comment;

router.get('/', function (req, res, next) {
	res.render('index')

});

router.get('/add', function (req, res, next) {
	res.render('add')

});

router.get('/:secretId', function (req, res, next) {
	Secret.findById(req.params.secretId, { include: [Comment] })

	.then(function(foundSecret){
		res.render('secret', {
			secret: foundSecret
		})
	})
	.catch(next)

});

router.post('/', function (req, res, next) {

	Secret.create({
		text: req.body.text
	})
	.then(function(createdSecret){
		console.log("secret has been created");
		res.redirect("/secrets");
	})
	.catch(next);

});


router.use('/:secretId/comments', require('./comments-subrouter'));