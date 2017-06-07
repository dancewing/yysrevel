(function() {
    'use strict';
    angular
        .module('yysApp')
        .factory('YysRole', YysRole);

    YysRole.$inject = ['$resource'];

    function YysRole ($resource) {
        var resourceUrl =  'api/yys-roles/:id';

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
