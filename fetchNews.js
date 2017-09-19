var https = require('http');
var jsonfile = require('jsonfile');
var getJSON = require('get-json');
var cron = require('node-cron');

var web = "http://www.vg.no/siste/?format=json&limit=20&size=100";
var oldFilesRefID = "";
cron.schedule('* * * * *', function () {
    console.log("Runned");
    getJSON(web, function (error, response) {
        var file = 'news.json';

        if (oldFilesRefID!=response[0].id){
            console.log("if"+1);
            oldFilesRefID=response[0].id;
            jsonfile.writeFile(file, response, function (err) {
            });
        }
        else if (oldFilesRefID=="") {
            console.log("Else if"+2);
            jsonfile.writeFile(file, response, function (err) {
            });
        } else {
            //do nothing
        }
    });

    https.get(web, function (res) {
        res.on('data', function (chunk) {});
    });
});