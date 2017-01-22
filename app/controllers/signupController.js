'use strict';
app.controller('signupController', ['$scope', '$location', '$timeout', 'authService', function ($scope, $location, $timeout, authService) {
    $scope.savedSuccessfully = false;
    $scope.message = "";

    $scope.registration = {
        userName: "",
        password: "",
        confirmPassword: ""
    };

    $scope.signUp = function () {
        if ($scope.registration.password === $scope.registration.confirmPassword) {
            var dataRegistration = {
                username: $scope.registration.userName,
                password: $scope.registration.password
            };

            authService.saveRegistration(dataRegistration).then(function (response) {
                $scope.savedSuccessfully = response.isAuth;
                $scope.message = response.message;
                startTimer();
            },
            function (response) {
                $scope.message = "Failed to register user.";
            });
        }
        else {
            $scope.message = "Confirm password not equal password.";
        }
    };

    var startTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $location.path('/home');
        }, 2000);
    }
}]);