var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact-me',{summary:'Welcome you to visit Charlie\'s Portolio'});
});

router.get('/home', function(req, res, next) {
  res.render('contact-me',{summary:'Welcome you to visit Charlie\'s Portolio'});

});

router.get('/about', function(req, res, next) {
  res.render('home',{summary:'Charlie has many years experiencs.'});
});


router.get('/projects', function(req, res, next) {
  res.render('home',{summary:'Charlie has many projects experiencs.'});
});

router.get('/services', function(req, res, next) {
  res.render('home',{summary:'Charlie has many services technique statck.'});
});


router.get('/contact', function(req, res, next) {
  res.render('home',{summary:'Charlie is waiting to server you.'});
});

module.exports = router;
