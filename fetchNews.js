var https = require('http');
var jsonfile = require('jsonfile');
var getJSON = require('get-json');
var cron = require('node-cron');

var web = "http://www.vg.no/siste/?format=json&limit=20&size=100";
var oldFilesRefID = "";

cron.schedule('* * * * *', function () {

  getJSON(web, function (error, response) {
    var file = 'news.json';
    console.log("Old id: " + oldFilesRefID);
    if (oldFilesRefID != response[0].id) {
      oldFilesRefID = response[0].id;
      olderFilesRefID = response[1].id;
      jsonfile.writeFile(file, response, function (err) {
      });
    } else {
      //else happend
    }
  });
  
});