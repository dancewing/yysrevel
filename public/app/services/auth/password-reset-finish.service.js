(function() {
    'use strict';

    angular
        .module('yysApp')
        .factory('PasswordResetFinish', PasswordResetFinish);

    PasswordResetFinish.$inject = ['$resource'];

    function PasswordResetFinish($resource) {
        var service = $resource('account/resetPassword/finish', {}, {});

        return service;
    }
})();
