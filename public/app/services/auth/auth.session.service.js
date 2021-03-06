(function() {
    'use strict';

    angular
        .module('yysApp')
        .factory('AuthServerProvider', AuthServerProvider);

    AuthServerProvider.$inject = ['$http', '$localStorage' ];

    function AuthServerProvider ($http, $localStorage ) {
        var service = {
            getToken: getToken,
            hasValidToken: hasValidToken,
            login: login,
            logout: logout
        };

        return service;

        function getToken () {
            var token = $localStorage.authenticationToken;
            return token;
        }

        function hasValidToken () {
            var token = this.getToken();
            return !!token;
        }

        function login (credentials) {
            var data = 'username=' + encodeURIComponent(credentials.username) +
                '&password=' + encodeURIComponent(credentials.password) +
                '&remember=' + credentials.rememberMe + '&submit=Login';

            return $http.post('account/login', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (response) {
                return response;
            });
        }

        function logout () {

            
            // logout from the server
            $http.post('account/logout').success(function (response) {
                delete $localStorage.authenticationToken;
                // to get a new csrf token call the api
                $http.get('account/current');
                return response;
            });
            
        }
    }
})();
