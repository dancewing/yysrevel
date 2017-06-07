(function() {
    'use strict';

    angular
        .module('yysApp')
        .controller('YysSuipianDeleteController',YysSuipianDeleteController);

    YysSuipianDeleteController.$inject = ['$uibModalInstance', 'entity', 'YysSuipian'];

    function YysSuipianDeleteController($uibModalInstance, entity, YysSuipian) {
        var vm = this;

        vm.yysSuipian = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            YysSuipian.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
