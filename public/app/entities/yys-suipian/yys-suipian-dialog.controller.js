(function() {
    'use strict';

    angular
        .module('yysApp')
        .controller('YysSuipianDialogController', YysSuipianDialogController);

    YysSuipianDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'YysSuipian', 'YysAccount', 'YysRole'];

    function YysSuipianDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, YysSuipian, YysAccount, YysRole) {
        var vm = this;

        vm.yysSuipian = entity;
        vm.clear = clear;
        vm.save = save;
        vm.yysaccounts = YysAccount.query();
        vm.yysroles = YysRole.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.yysSuipian.id !== null) {
                YysSuipian.update(vm.yysSuipian, onSaveSuccess, onSaveError);
            } else {
                YysSuipian.save(vm.yysSuipian, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('yysApp:yysSuipianUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
