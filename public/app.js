var CCrUS = angular.module('CCrUS', []);

function mainController($scope, $http) {
	$scope.loading = false;
	$scope.status = "";
    $scope.postData = function() {
        var req = {
            method: 'POST',
            url: '/processTxn',
            headers: {
                'Content-Type': 'application/json'
            },
            data: { 'merchantId': this.data.merchantId,
                    'customerName': this.data.customerName,
                    'customerZip': this.data.customerZip,
                    'cardNumber': this.data.cardNumber,
                    'cardExpiration': this.data.cardExpiration,
                    'cardCVV': this.data.cardCVV,
                    'amount': this.data.amount,
                    'timestamp': new Date()          
            }
        }
        $http(req).then(function successCallabck(response) {
            $scope.status = response.data;
        }, function errorCallback(response) {
            $scope.status = "ERROR - " + response.data;
        });
        this.data.merchantId = '';
        this.data.customerName = '';
        this.data.customerZip = '';
        this.data.cardNumber = '';
        this.data.cardExpiration = '';
        this.data.cardCVV = '';
        this.data.amount = '';
    }
}
