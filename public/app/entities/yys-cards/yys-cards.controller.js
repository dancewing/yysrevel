(function() {
    'use strict';

    angular
        .module('yysApp')
        .controller('YysCardsController', YysCardsController);

    YysCardsController.$inject = ['YysCards'];

    function YysCardsController(YysCards) {

        var vm = this;

        vm.yysCards = [];

        loadAll();

        function loadAll() {
            YysCards.query(function(result) {
                vm.yysCards = result;
                vm.searchQuery = null;
            });
        }
    }
})();
