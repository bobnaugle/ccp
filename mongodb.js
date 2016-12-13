var mongourl = process.env.MONGO_URL ? process.env.MONGO_URL : 'mongodb://104.196.155.49:27017/ccp';
var mongoose = require('mongoose');
var http = require('http')

var model = mongoose.model('txn', {
    merchantId: String,
    customerName: String,
    customerZip: String,
    cardNumber: String,
    cardExpiration: String,
    cardCVV: String,
    timeStamp: String,
    amount: String,
    approvalCode: String
});

try {
    mongoose.connect(mongourl);
} catch (err) {
    console.log(err);
}

module.exports = function(txn) {
    model.create({
          merchantId: txn.merchantId,
          customerName: txn.customerName,
          customerZip: txn.customerZip,
          cardNumber: txn.cardNumber,
          cardExpiration: txn.cardExpiration,
          cardCVV: txn.cardCVV,
          timeStamp: txn.timeStamp,
          amount: txn.amount,
          approvalCode: txn.approvalCode
    });
}
