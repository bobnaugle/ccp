

function function1() {
    // stuff you want to happen right away
    console.log('Welcome to My Console,');

}

function function2() {
    // all the stuff you want to happen after that pause
    console.log('Blah blah blah blah extra-blah');
}

// call the first chunk of code right away
//function1();
//setTimeout(function2, 3000);

var CronJob = require('cron').CronJob;
var job = new CronJob('0 0-59 * * * *', function() {
  console.log('You will see this message every minute ' + new Date());
}, null, true, 'America/Los_Angeles');

var hourJob =  new CronJob('0 11 * * * *', function() {
  console.log('You will see this message every  11 minutes past hour ' + new Date());
}, null, true, 'America/Los_Angeles');
var http = require('http');

var handleRequest = function(request, response) {
  console.log('Received request for URL: ' + request.url);
    if (request.url.toString().includes("stop")) {
        job.stop();
        hourJob.stop();
      response.writeHead(200);
      response.end('stopping job');
    } else if (request.url.toString().includes("start")) {
        job.start();
        hourJob.start();
        response.writeHead(200);
        response.end('starting job');
    } else {
           response.writeHead(500);
          response.end('unknown request');

    }

};
var www = http.createServer(handleRequest);
www.listen(8080);

