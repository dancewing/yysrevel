(function() {
    'use strict';

    angular
        .module('yysApp')
        .controller('YysCardsDeleteController',YysCardsDeleteController);

    YysCardsDeleteController.$inject = ['$uibModalInstance', 'entity', 'YysCards'];

    function YysCardsDeleteController($uibModalInstance, entity, YysCards) {
        var vm = this;

        vm.yysCards = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            YysCards.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
