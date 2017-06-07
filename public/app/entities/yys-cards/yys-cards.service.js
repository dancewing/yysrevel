(function() {
    'use strict';
    angular
        .module('yysApp')
        .factory('YysCards', YysCards);

    YysCards.$inject = ['$resource'];

    function YysCards ($resource) {
        var resourceUrl =  'api/yys-cards/:id';

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
