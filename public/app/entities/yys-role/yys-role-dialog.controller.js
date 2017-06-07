(function() {
    'use strict';

    angular
        .module('yysApp')
        .controller('YysRoleDialogController', YysRoleDialogController);

    YysRoleDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'YysRole'];

    function YysRoleDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, YysRole) {
        var vm = this;

        vm.yysRole = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.yysRole.id !== null) {
                YysRole.update(vm.yysRole, onSaveSuccess, onSaveError);
            } else {
                YysRole.save(vm.yysRole, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('yysApp:yysRoleUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
