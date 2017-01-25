'use strict';
app.controller('signupController', ['$scope', '$location', '$timeout', 'authService', function ($scope, $location, $timeout, authService) {
    $scope.savedSuccessfully = false;
    $scope.message = "";
    $scope.registration = {
        userName: "",
        password: "",
        confirmPassword: ""
    };

    $scope.getError = function (error) {
        if (angular.isDefined(error)) {
            if (error.required) {
                return "Please enter a value";
            } else if (error.email) {
                return "Please enter a valid email address";
            } else if (error.compareTo) {
                return "Passwords don't match";
            }
        }
    };

    $scope.signUp = function () {
        if ($scope.signUpForm.$valid) {
            var dataRegistration = {
                username: $scope.registration.userName,
                password: $scope.registration.password
            };

            authService.saveRegistration(dataRegistration).then(function (response) {
                $scope.savedSuccessfully = response.isAuth;
                $scope.message = response.message;
                if(response.isAuth) startTimer();
            },
            function (response) {
                $scope.message = response.message;
            });
        } else {
            $scope.showValidation = true;
        }
        
    };

    var startTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $location.path('/home');
        }, 2000);
    }
}]);