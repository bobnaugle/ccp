var express = require('express');
var bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.json())

app.post('/processTxn', function (request, response) {
   txn = request.body
   console.log("The incoming txn is:")
   console.log(txn)
   response.writeHead(200, {'Content-Type': 'text/plain'});
   approvalCode = approval(txn);
   response.end(approvalCode);
       
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)

})

function approval( txn ) {
	if (txn.cardNumber.length > 2) {
		return "ABC123"
	} else {
		return "error"
	}
}

function settlement( txns ) {
	// TODO
}

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
curl  -H "Content-Type: application/json" -X POST -d '{"merchantId":"123456789","customerName":"Bogus Fake","customerZip":"08054","cardNumber":"9876543210","cardExpiration":"01/01","cardCVV":"123","timestamp":"Tue, Dec 13, 2016 12:27:11 PM","amount":"100.00"}' http://localhost:8081/processTxn
*/