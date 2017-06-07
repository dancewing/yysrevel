(function() {
    'use strict';

    angular
        .module('yysApp')
        .factory('ProfileService', ProfileService);

    ProfileService.$inject = ['$http'];

    function ProfileService($http) {

        var dataPromise;

        var service = {
            getProfileInfo : getProfileInfo
        };

        return service;

        function getProfileInfo() {
            if (angular.isUndefined(dataPromise)) {
                dataPromise = $http.get('profile/get').then(function(result) {
                    if (result.data.activeProfiles) {
                        var response = {};
                        response.activeProfiles = result.data.activeProfiles;
                        response.ribbonEnv = result.data.ribbonEnv;
                        response.inProduction = result.data.activeProfiles.indexOf("prod") !== -1;
                        response.swaggerEnabled = result.data.activeProfiles.indexOf("swagger") !== -1;
                        return response;
                    }
                });
            }
            return dataPromise;
        }
    }
})();
