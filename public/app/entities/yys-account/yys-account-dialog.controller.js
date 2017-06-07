(function() {
    'use strict';

    angular
        .module('yysApp')
        .controller('YysAccountDialogController', YysAccountDialogController);

    YysAccountDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'YysAccount', 'YysSuipian', 'YysCards'];

    function YysAccountDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, YysAccount, YysSuipian, YysCards) {
        var vm = this;

        vm.yysAccount = entity;
        vm.clear = clear;
        vm.save = save;
        vm.yyssuipians = YysSuipian.query();
        vm.yyscards = YysCards.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.yysAccount.id !== null) {
                YysAccount.update(vm.yysAccount, onSaveSuccess, onSaveError);
            } else {
                YysAccount.save(vm.yysAccount, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('yysApp:yysAccountUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
