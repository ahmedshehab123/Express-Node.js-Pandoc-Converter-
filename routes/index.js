var express = require('express');
var router = express.Router();
var nodePandoc = require('node-pandoc');
var  args, callback;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/pandoc',function (req,res,next) {
  var params=req.body

  console.log(params.text)
  console

  args = '-f '+params.from+' -t '+params.to+'';

  callback = function (err, result) {
    if (err) {
      console.error('Oh Nos: ',err);
    }
    res.send(result)
    return result;
  };
  nodePandoc(params.text, args, callback);

});

router.get('/test', function(req, res, next) {
  res.send('<h1>Welcome to </h1><p>Home</p>')
});



module.exports = router;
