'use strict';

app.factory('authInterceptorService', ['$q', '$injector', '$location', 'localStorageService', function ($q, $injector, $location, localStorageService) {
    var authInterceptorServiceFactory = {};

    authInterceptorServiceFactory.request = function (config) {
        config.headers = config.headers || {};

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            config.headers.Authorization = 'Token ' + authData.token;
        }

        return config;
    }

    authInterceptorServiceFactory.responseError = function (rejection) {
        if (rejection.status === 401) {
            var authService = $injector.get('authService');
            var authData = localStorageService.get('authorizationData');

            authService.logOut();
            $location.path('/login');
        }
        return $q.reject(rejection);
    }

    return authInterceptorServiceFactory;
}]);