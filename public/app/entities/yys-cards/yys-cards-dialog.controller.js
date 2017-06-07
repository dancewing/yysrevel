(function() {
    'use strict';

    angular
        .module('yysApp')
        .controller('YysCardsDialogController', YysCardsDialogController);

    YysCardsDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'YysCards', 'YysAccount'];

    function YysCardsDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, YysCards, YysAccount) {
        var vm = this;

        vm.yysCards = entity;
        vm.clear = clear;
        vm.save = save;
        vm.yysaccounts = YysAccount.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.yysCards.id !== null) {
                YysCards.update(vm.yysCards, onSaveSuccess, onSaveError);
            } else {
                YysCards.save(vm.yysCards, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('yysApp:yysCardsUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
