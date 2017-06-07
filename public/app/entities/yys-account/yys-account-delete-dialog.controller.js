(function() {
    'use strict';

    angular
        .module('yysApp')
        .controller('YysAccountDeleteController',YysAccountDeleteController);

    YysAccountDeleteController.$inject = ['$uibModalInstance', 'entity', 'YysAccount'];

    function YysAccountDeleteController($uibModalInstance, entity, YysAccount) {
        var vm = this;

        vm.yysAccount = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            YysAccount.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
