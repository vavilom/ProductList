'use strict';

app.controller('productsInfoCtrl', function ($scope, productsService, ngAuthSettings, $routeParams, authService) {
    $scope.products = {};
    $scope.reviews = {};
    $scope.productId = $routeParams.productId;
    $scope.reviewData = {
        rate: 1
    };
    $scope.message = "";
    $scope.authentication = authService.authentication;

    $scope.getImageUrl = function (prodImg) {
        return ngAuthSettings.apiServiceBaseUri + "static/" + prodImg;
    };

    productsService.getProducts().then(function (results) {
        $scope.products = results.data;
    });

    productsService.getReviews($scope.productId).then(function (results) {
        $scope.reviews = results.data;
    });

    $scope.dateValue = function (date) {
        return Date.parse(date);
    };

    $scope.saveReview = function () {
        productsService.addReview($scope.productId, $scope.reviewData).then(function (results) {
            if (results.status == 200) {
                var newReview = {
                    created_by: {
                        "username": $scope.authentication.userName
                    },
                    rate: $scope.reviewData.rate,
                    text: $scope.reviewData.text,
                    created_at: new Date()
                };

                $scope.reviews.push(newReview);

                $scope.reviewData = {};
            }
        },
        function () {
            $scope.message = "Error";
        });
    }
});

app.directive('product', function () {
    return {
        template: function () {
            return angular.element(document.querySelector("#productTemplate")).html();
        }
    };
});

app.directive('reviews', function () {
    return {
        template: function () {
            return angular.element(document.querySelector("#reviewsTemplate")).html();
        }
    };
});