(function() {
    'use strict';
    angular
        .module('yysApp')
        .factory('YysAccount', YysAccount);

    YysAccount.$inject = ['$resource'];

    function YysAccount ($resource) {
        var resourceUrl =  'api/yys-accounts/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
