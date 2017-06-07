(function() {
    'use strict';
    angular
        .module('yysApp')
        .factory('YysSuipian', YysSuipian);

    YysSuipian.$inject = ['$resource'];

    function YysSuipian ($resource) {
        var resourceUrl =  'api/yys-suipians/:id';

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
