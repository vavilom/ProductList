'use strict';

app.factory('productsService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {
    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var poductsServiceFactory = {};

    //get all products
    poductsServiceFactory.getProducts = function () {
        return $http.get(serviceBase + 'api/products/').then(function (results) {
            return results;
        });
    };

    //get reviews by product id
    poductsServiceFactory.getReviews = function (id) {
        return $http.get(serviceBase + 'api/reviews/' + id).then(function (results) {
            console.log(results);
            return results;
        });
    };

    //add new review
    poductsServiceFactory.addReview = function (id, data) {
        return $http.post(serviceBase + 'api/reviews/' + id, data).then(function (response) {
            return response;
        });
    }

    return poductsServiceFactory;
}]);