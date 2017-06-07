(function() {
    'use strict';

    angular
        .module('yysApp')
        .controller('YysCardsDetailController', YysCardsDetailController);

    YysCardsDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'YysCards', 'YysAccount'];

    function YysCardsDetailController($scope, $rootScope, $stateParams, previousState, entity, YysCards, YysAccount) {
        var vm = this;

        vm.yysCards = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('yysApp:yysCardsUpdate', function(event, result) {
            vm.yysCards = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
