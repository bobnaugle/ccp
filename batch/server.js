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
var MongoClient = require('mongodb').MongoClient;
var mongourl = process.env.MONGO_URL ? process.env.MONGO_URL : 'mongodb://104.196.155.49:27017/ccp';

function settle(db) {

      db.collection('txns').updateMany(
      { "settlementId":  { $ne: "112233" }},
      {
        $set: { settlementId: "112233" },
        $currentDate: { "lastModified": true }
      }
      ,
      function(err, results) {
        console.log(results);
 //       callback();
   });

    processTxns();
}

var findTxns = function (db, callback) {
    var cursor = db.collection('txns').find(); //{"settled": { $ne: "true" }}
    cursor.each(function (err, doc) {
//        assert.equal(err, null);s
        if (doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    });
};

function processTxns() {
    console.log("processing txns at " + new Date());

    MongoClient.connect(mongourl, function (err, db) {
 //       assert.equal(null, err);
        findTxns(db, function () {
            db.close();
        });
    });
}

function doSettle() {
    MongoClient.connect(mongourl, function (err, db) {
        //       assert.equal(null, err);
        settle(db);
        db.close();
    })
}

var CronJob = require('cron').CronJob;
var job = new CronJob('0 0-59 * * * *', function () {
    processTxns();
}, null, true, 'America/Los_Angeles');

var hourJob = new CronJob('0 11 * * * *', function () {
    console.log('You will see this message every  11 minutes past hour ' + new Date());
}, null, true, 'America/Los_Angeles');
var http = require('http');

var handleRequest = function (request, response) {
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
    } else if (request.url.toString().includes("settle")) {
        doSettle();
        response.writeHead(200);
        response.end('settled');
    } else {
        response.writeHead(500);
        response.end('unknown request');

    }

};
processTxns();
var www = http.createServer(handleRequest);
www.listen(8080);

