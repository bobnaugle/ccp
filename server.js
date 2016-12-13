var express = require('express');
var bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.json())

app.post('/processTxn', function (request, response) {
   txn = request.body
   console.log("The incoming txn is:")
   console.log(txn)
   response.writeHead(200, {'Content-Type': 'text/plain'});
   approvalCode = "ABC123"
   response.end(approvalCode);
       
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)

})

/*
Requires the following module installed 
npm install express --save
npm install body-parser --save
npm install cookie-parser --save
npm install multer --save
npm install mongodb --save
*/
/*
Test with the following curl command (with the endpoint url adjusted):
curl  -H "Content-Type: application/json" -X POST -d '{"merchant-id":"123456789","customer-name":"Bogus Fake","customer-zip":"08054","card-number":"9876543210","card-expiration":"01/01","card-cvv":"123","txn-timestamp":"Tue, Dec 13, 2016 12:27:11 PM","amount":"100.00"}' http://localhost:8081/processTxn
*/