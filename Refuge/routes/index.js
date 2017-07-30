'use strict';
var express = require('express');
var request = require('request');
var fs = require('fs');
var nano = require('nano')('http://localhost:5984');
var router = express.Router();

var hereUrl = "https://cle.cit.api.here.com";
//var hereUrl = "http://cle.api.here.com/";



/* GET home page. */
router.get('/', function (req, res) {
    var refuge = nano.db.use('refugedb');

    refuge.get('refugeecamps', { NAME: { "$not": "" } }, function (err, body) {
        delete body._id;
        delete body._rev;
        res.render('index', { title: 'REFUGE', camps: body });
    });
});

router.get('/plotpoints', function (req, res) {
    var refuge = nano.db.use('refugedb');

    refuge.get('refugeecamps', { NAME: { "$not": "" }, _id: false},
        function (err, body) {

            res.send(JSON.stringify(body));
        });
})

router.get('/uploadShapeFile', function (req, res) {
    //var postUrl = hereUrl + '/2/layers/upload.json?app_id=siqtyDjqWHW6QTGXwbtY&app_code=9HTj_sF6NO0dometkPDDfg';

    //var formData = {
    //    file: fs.createReadStream(__dirname + '/shape/test.wkt'),
    //    layer_id: 'TESTLAYER',
    //};
    //request.post({ url: postUrl, formData: formData }, function optionalCallback(err, httpResponse, body) {

    //    if (err) {
    //        return console.error('upload failed:', err);
    //    }
    //    console.log('Upload successful!  Server responded with:', body);
    //});

    //res.render('UploadFile');

    var postUrl = hereUrl + '/2/layers/upload.json?app_id=siqtyDjqWHW6QTGXwbtY&app_code=9HTj_sF6NO0dometkPDDfg';
    var filename = __dirname + '/shape/Camps_in_Progress.zip';

    var req = request.post(postUrl, function (err, resp, body) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(body);
        }
    })

    var form = req.form();
    form.append('layer_id', 'TESTLAYER');
    form.append('file', fs.createReadStream(filename));
});

function getListofRefugee() {
    return [{ name: "Title", num: 3 }, { name: "Text", num: 4 } ]
}

module.exports = router;
