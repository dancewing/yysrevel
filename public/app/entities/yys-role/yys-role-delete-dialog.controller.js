(function() {
    'use strict';

    angular
        .module('yysApp')
        .controller('YysRoleDeleteController',YysRoleDeleteController);

    YysRoleDeleteController.$inject = ['$uibModalInstance', 'entity', 'YysRole'];

    function YysRoleDeleteController($uibModalInstance, entity, YysRole) {
        var vm = this;

        vm.yysRole = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            YysRole.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
