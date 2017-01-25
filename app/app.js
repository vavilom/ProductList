var app = angular.module('ShopApp', ['ngRoute', 'LocalStorageModule']);

app.config(function ($routeProvider) {
    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "/app/views/home.html"
    });

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "/app/views/login.html"
    });

    $routeProvider.when("/signup", {
        controller: "signupController",
        templateUrl: "/app/views/signup.html"
    });

    $routeProvider.when("/home/:productId", {
        controller: "productInfoController",
        templateUrl: "/app/views/productDetail.html"
    });

    $routeProvider.otherwise({ redirectTo: "/home" });
});

var serviceUrl = 'http://smktesting.herokuapp.com/';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceUrl
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);