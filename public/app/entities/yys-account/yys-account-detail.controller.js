(function() {
    'use strict';

    angular
        .module('yysApp')
        .controller('YysAccountDetailController', YysAccountDetailController);

    YysAccountDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'YysAccount', 'YysSuipian', 'YysCards'];

    function YysAccountDetailController($scope, $rootScope, $stateParams, previousState, entity, YysAccount, YysSuipian, YysCards) {
        var vm = this;

        vm.yysAccount = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('yysApp:yysAccountUpdate', function(event, result) {
            vm.yysAccount = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
