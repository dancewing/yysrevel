(function() {
    'use strict';

    angular
        .module('yysApp')
        .controller('YysRoleController', YysRoleController);

    YysRoleController.$inject = ['YysRole'];

    function YysRoleController(YysRole) {

        var vm = this;

        vm.yysRoles = [];

        loadAll();

        function loadAll() {
            YysRole.query(function(result) {
                vm.yysRoles = result;
                vm.searchQuery = null;
            });
        }
    }
})();
