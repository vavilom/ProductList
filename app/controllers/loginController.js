'use strict';

app.controller('loginController', ['$scope', '$location', 'authService', 'ngAuthSettings', function ($scope, $location, authService, ngAuthSettings) {
    $scope.loginData = {
        userName: "",
        password: "",
        useRefreshTokens: false
    };
    $scope.message = "";

    $scope.login = function () {
        if($scope.loginForm.$valid){
            authService.login($scope.loginData).then(function (response) {
                if (response.isAuth) {
                    $location.path('/home');
                }

                $scope.message = response.message;
            },
            function (err) {
                $scope.message = err.message;
            });
        } else {
            $scope.message = "Fill all data";
        }
    };
}]);
