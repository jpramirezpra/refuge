'use strict';
var express = require('express');
var request = require('request');
var fs = require('fs');
var router = express.Router();

var hereUrl = "https://cle.cit.api.here.com";

/* GET home page. */
router.get('/', function (req, res) {


    res.render('index', { title: 'REFUGE', array: getListofRefugee() });
});

router.get('/uploadShapeFile', function (req, res) {
    var postUrl = hereUrl + '/2/layers/upload.json';

    var formData = {
        file: fs.createReadStream(__dirname + '/shape/Camps_in_Progress.wkt'),
        app_id: 'siqtyDjqWHW6QTGXwbtY',
        app_code: '9HTj_sF6NO0dometkPDDfg',
        layer_id: '1',
        // Pass optional meta-data with an 'options' object with style: {value: DATA, options: OPTIONS} 
        // Use case: for some types of streams, you'll need to provide "file"-related information manually. 
        // See the `form-data` README for more information about options: https://github.com/form-data/form-data 
        //custom_file: {
        //    value: fs.createReadStream('/dev/urandom'),
        //    options: {
        //        filename: 'topsecret.jpg',
        //        contentType: 'image/jpeg'
        //    }
        //}
    };
    request.post({ url: 'http://service.com/upload', formData: formData }, function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body);
    });

    res.render('UploadFile');
});

function getListofRefugee() {
    return [{ name: "Title", num: 3 }, { name: "Text", num: 4 } ]
}

module.exports = router;
