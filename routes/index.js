var express = require('express');
var router = express.Router();
var nodePandoc = require('node-pandoc');
var fs = require('fs');
var args, callback;
var downloadExtenstion;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login', {title: 'Express'});
});
router.get('/home', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/pandoc', function (req, res, next) {
    var params = req.body

    console.log(params.to)

    if (params.to === 'epub' || params.to === 'docx') {
        downloadExtenstion = params.to;
        args = '-f ' + params.from + ' -t ' + params.to + ' -o ./converted-content/content.' + params.to + '';
    } else {
        args = '-f ' + params.from + ' -t ' + params.to + '';
    }

    callback = function (err, result) {
        if (err) {
            console.error('Oh Nos: ', err);
        }

        res.send(result);
        fs.writeFile("./converted-content/content", result, function (err) {
            if (err) {
                return console.log(err);
            }
        });
        return result;
    };
    nodePandoc(params.text, args, callback);

});

router.get('/test', function (req, res, next) {
    res.send('<h1>Welcome to </h1><p>Home</p>')
});

router.post('/upload', function (req, res, next) {
    res.send(req.files.file.data.toString('utf8'));
});

router.get('/download', function (req, res, next) {
    var path = require('path');

    if (downloadExtenstion === 'docx') {
        res.download(path.join('./converted-content', 'content.docx'), 'content.docx')

    } else if (downloadExtenstion === 'epub') {
        res.download(path.join('./converted-content', 'content.epub'), 'content.epub')
    } else {
        res.download(path.join('./converted-content', 'content'), 'content')

    }
});


module.exports = router;
