﻿'use strict';

app.controller('productsInfoCtrl', function ($scope, productsService, ngAuthSettings, $routeParams, authService) {
    $scope.products = {};
    $scope.reviews = [];
    $scope.productId = $routeParams.productId;
    $scope.reviewData = {
        rate: 1
    };
    $scope.message = "";
    $scope.authentication = authService.authentication;

    console.log("start controller");

    //get all products because not opportunity get one product by id
    productsService.getProducts().then(function (results) {
        $scope.products = results.data;
    });

    productsService.getReviews($scope.productId).then(function (results) {
        $scope.reviews = results.data;
    });

    $scope.saveReview = function () {
        if ($scope.reviewForm.$valid) {
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

                    $scope.reviewData = { rate: 1 };
                }
            },
            function (err) {
                $scope.message = "Error";
            });
        }
    }
});

app.directive('product', function () {
    return {
        template: function () {
            return angular.element(document.querySelector("#productTemplate")).html();
        },
        scope: {
            product: "=product"
        },
        controller: function ($scope, ngAuthSettings) {
            $scope.getImageUrl = function (prodImg) {
                return ngAuthSettings.apiServiceBaseUri + "static/" + prodImg;
            };
        }
    };
});

app.directive('reviews', function () {
    return {
        restrict: "A",
        template: function () {
            return angular.element(document.querySelector("#reviewsTemplate")).html();
        },
        scope: {
            reviews: "=reviews"
        },
        controller: function ($scope) {
            $scope.dateValue = function (review) {
                return Date.parse(review.created_at);
            };
        }
    };
});