(function() {
    'use strict';

    angular
        .module('yysApp')
        .controller('YysSuipianDetailController', YysSuipianDetailController);

    YysSuipianDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'YysSuipian', 'YysAccount', 'YysRole'];

    function YysSuipianDetailController($scope, $rootScope, $stateParams, previousState, entity, YysSuipian, YysAccount, YysRole) {
        var vm = this;

        vm.yysSuipian = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('yysApp:yysSuipianUpdate', function(event, result) {
            vm.yysSuipian = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
