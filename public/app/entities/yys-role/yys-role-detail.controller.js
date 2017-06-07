(function() {
    'use strict';

    angular
        .module('yysApp')
        .controller('YysRoleDetailController', YysRoleDetailController);

    YysRoleDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'YysRole'];

    function YysRoleDetailController($scope, $rootScope, $stateParams, previousState, entity, YysRole) {
        var vm = this;

        vm.yysRole = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('yysApp:yysRoleUpdate', function(event, result) {
            vm.yysRole = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
