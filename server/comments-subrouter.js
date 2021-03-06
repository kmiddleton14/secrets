const express = require('express');
const router = express.Router({
    mergeParams: true // so these routes can receive "secretId"
});
module.exports = router;

const models = require('../db/models');
const Secret = models.Secret;
const Comment = models.Comment;

router.post('/', function (req, res, next) {

	Comment.create({
		text: req.body.text,
		secretId: req.params.secretId
	})
	.then(function(createdComment){
		res.redirect('/secret/' + req.params.secretId)
	})
	.catch(next);



});