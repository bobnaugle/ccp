#!/bin/sh

url=http://localhost:8081/processTxn
curl -H "Content-Type: application/json" -X POST -d '{"merchantId":"123456789","customerName":"Bogus Fake","customerZip":"0054","cardNumber":"9876543210","cardExpiration":"01/01","cardCVV":"123","timestamp":"Tue, Dec 13, 2016 12:27:11 PM","amount":"100.00"}' $url
curl -H "Content-Type: application/json" -X POST -d '{"merchantId":"1","customerName":"John Smith","customerZip":"08054","cardNumber":"9876543211","cardExpiration":"01/17","cardCVV":"123","timestamp":"Tue, Dec 14, 2016 12:27:11 PM","amount":"133.00"}' $url
curl -H "Content-Type: application/json" -X POST -d '{"merchantId":"2","customerName":"Joe Smith","customerZip":"08054","cardNumber":"9876543211","cardExpiration":"01/17","cardCVV":"123","timestamp":"Tue, Dec 14, 2016 12:29:11 PM","amount":"24.00"}' $url
