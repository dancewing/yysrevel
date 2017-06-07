(function() {
    'use strict';

    angular
        .module('yysApp')
        .controller('YysSuipianController', YysSuipianController);

    YysSuipianController.$inject = ['YysSuipian'];

    function YysSuipianController(YysSuipian) {

        var vm = this;

        vm.yysSuipians = [];

        loadAll();

        function loadAll() {
            YysSuipian.query(function(result) {
                vm.yysSuipians = result;
                vm.searchQuery = null;
            });
        }
    }
})();
