var express = require('express');
var router = express.Router();
var nodePandoc = require('node-pandoc');
var fs = require('fs');
var mime =require('mime')
var args, callback;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


router.post('/pandoc', function (req, res, next) {
    var params = req.body

    console.log(params.text)
    console

    args = '-f ' + params.from + ' -t ' + params.to + '';

    callback = function (err, result) {
        if (err) {
            console.error('Oh Nos: ', err);
        }

        res.send(result);
        fs.writeFile("./converted-content/content", result, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });
        return result;
    };
    nodePandoc(params.text, args, callback);

});

router.get('/test', function (req, res, next) {
    res.send('<h1>Welcome to </h1><p>Home</p>')
});

router.post('/upload', function (req, res,next) {
     res.send(req.files.file.data.toString('utf8'));
});

router.get('/download', function(req, res,next){
    var path = require('path');
    res.download(path.join('./converted-content','content'),'content')
    /*res.download('./converted-content/content', function(err){
        if(err) {
            // Check if headers have been sent
            if(res.headersSent) {
                // You may want to log something here or do something else
            } else {
                return res.sendStatus(err); // 404, maybe 500 depending on err
            }
        }
        // Don't need res.end() here since already sent
    })*/
});


module.exports = router;
