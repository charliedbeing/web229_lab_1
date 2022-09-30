/**
File name:: index.js
Student name: Charlie Ding
Student ID:301159548
Date: Sep 30 2022
*/

var express = require('express');
var router = express.Router();

// main page content coming from this json data
var data = require('../data/protfoli')



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact-me',
  {
    summary:'Welcome you to visit Charlie\'s Portolio',
    missions:data.missions
  }
  );
});

router.get('/home', function(req, res, next) {
  res.render('contact-me',{
    summary:'Welcome you to visit Charlie\'s Portolio',
    missions:data.missions
  });

});

/* server for contact form post . */
router.post('/home', function(req, res, next) {
  res.render('contact-me',{
    summary:'Welcome you to visit Charlie\'s Portolio',
    missions:data.missions
  });

});

router.get('/about', function(req, res, next) {
  res.render('about_me',{
    summary:`Zhigang Ding | Full Stack/Web/API Developer(Java, JavaScript)`,
    missions:data.about
  });
});


router.get('/projects', function(req, res, next) {
  res.render('about_projects',{
    summary:'Charlie has many projects experiencs.',
    missions:data.projects
  });
});

router.get('/services', function(req, res, next) {
  res.render('about_projects',{summary:'Charlie has many services technique statck.',
   missions:data.services
});
});


router.get('/contact', function(req, res, next) {
  res.render('about_contact',{summary:'Charlie is waiting to server you.',
  contact:data.contact
});
});

module.exports = router;
