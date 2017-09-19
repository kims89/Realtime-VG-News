var https = require('http');
var jsonfile = require('jsonfile');
var getJSON = require('get-json');
var cron = require('node-cron');

var web = "http://www.vg.no/siste/?format=json&limit=20&size=100";
var oldFilesRefID = "";
var olderFilesRefID = "";
cron.schedule('* * * * *', function () {
    console.log("Runned");
    getJSON(web, function (error, response) {
        var file = 'news.json';
        console.log("Old id: "+oldFilesRefID);
        console.log("Older id: "+olderFilesRefID);
        if (oldFilesRefID!=response[0].id || olderFilesRefID!=response[0].id){
            console.log("if"+1);
            oldFilesRefID=response[0].id;
            olderFilesRefID=response[1].id;
            jsonfile.writeFile(file, response, function (err) {

            });
        }
        else {
            console.log("Else happend");
        }
    });

    https.get(web, function (res) {
        res.on('data', function (chunk) {});
    });
});