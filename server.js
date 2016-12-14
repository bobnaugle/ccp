var express = require('express');
var bodyParser = require('body-parser')
var path = require("path");
var database = require('./mongodb.js')
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())

app.post('/processTxn', function (request, response) {
	// parse the request for txn JSON object 
	txn = request.body;
	console.log("The incoming txn is:");
	console.log(txn);

	// get approval
	approval(txn);

	if (txn.approvalCode.startsWith("error")) {
		statusCode = 400;
	} else {
		// persiste the approved txn 
		storeTxn(txn);

		statusCode = 200;
	}

	// response 
	response.writeHead(statusCode, {'Content-Type': 'text/plain'});
	response.end(txn.approvalCode);
})

var server = app.listen(8081, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("CCP listening at http://%s:%s", host, port);
})

function storeTxn( txn ) {
	database(txn);
}

function approval( txn ) {
	if (txn.cardNumber.length > 2) {
		txn.approvalCode = "ABC123";
	} else {
		txn.approvalCode = "error";
	}
}

/*
Requires the following module installed 
npm install express --save
npm install body-parser --save
npm install cookie-parser --save
npm install multer --save
npm install mongoose --save
*/
/*
Test with the following curl command (with the endpoint url adjusted):
curl  -H "Content-Type: application/json" -X POST -d '{"merchantId":"123456789","customerName":"Bogus Fake","customerZip":"08054","cardNumber":"9876543210","cardExpiration":"01/01","cardCVV":"123","timestamp":"Tue, Dec 13, 2016 12:27:11 PM","amount":"100.00"}' http://localhost:8081/processTxn
*/