'use strict';

app.factory('authService', ['$http', '$q', 'localStorageService', 'ngAuthSettings', function ($http, $q, localStorageService, ngAuthSettings) {
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: ""
    };
    var _logOut;

    authServiceFactory.saveRegistration = function (registration) {
        _logOut();

        return $http.post(serviceBase + 'api/register/', registration).then(function (response) {
            if (response.data.success) {
                localStorageService.set('authorizationData', { token: response.data.token, userName: loginData.userName });

                _authentication.isAuth = true;
                _authentication.userName = loginData.userName;
            }
            else {
                return { isAuth: false, message: "Failed to register user." };
            }

            return {
                isAuth: true,
                message: "User has been registered successfully, you will be redicted to login page in 2 seconds."
            };
        },
        function (response) {
            console.log(response);
        });

    };

    authServiceFactory.login = function (loginData) {
        var data = {
            username: loginData.userName,
            password: loginData.password
        }

        var deferred = $q.defer();

        $http.post(serviceBase + 'api/login/', data, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            if (response.data.success) {
                localStorageService.set('authorizationData', { token: response.token, userName: loginData.userName });

                _authentication.isAuth = true;
                _authentication.userName = loginData.userName;

                deferred.resolve(response);
            }
            else {
                _logOut();
            }
        },
        function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;
    };

    _logOut = function () {
        localStorageService.remove('authorizationData');

        _authentication.isAuth = false;
        _authentication.userName = "";
    };

    authServiceFactory.fillAuthData = function () {
        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
        }
    };

    authServiceFactory.authentication = _authentication;
    authServiceFactory.logOut = _logOut;

    return authServiceFactory;
}]);