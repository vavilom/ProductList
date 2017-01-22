'use strict';

app.controller('productsCtrl', function ($scope, productsService, ngAuthSettings) {
    $scope.products = {};

    $scope.getImageUrl = function (prodImg) {
        return ngAuthSettings.apiServiceBaseUri + "static/" + prodImg;
    };

    productsService.getProducts().then(function (results) {
        $scope.products = results.data;
    }, function (error) {
        //alert(error.data.message);
    });
});


