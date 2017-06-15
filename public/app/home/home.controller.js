(function() {
    'use strict';

    angular
        .module('yysApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state'];

    function HomeController ($scope, Principal, LoginService, $state) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();

        bind();

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }
        function register () {
            $state.go('register');
        }

        function bind() {
            var pgwBrowser = $.pgwBrowser();
            if (pgwBrowser.os.group == 'iOS' || pgwBrowser.os.group == 'Android' || pgwBrowser.os.group == 'Windows Phone') {
                $('#searchMonsters').bind('input', searchMonsters);
            } else {
                $('#searchMonsters').bind('keyup', searchMonsters);
            }
        }

        function searchMonsters() {
        //reset highlight
            $('div.table').find('div.table-cell').each(function(){
                $(this).html($(this).text());
            });
            var searchValue = this.value;
            if (searchValue.length==0){
                $('div.table').find('div.table-row').each(function(){
                    $(this).removeClass('hidden');
                });
            } else {
                $('div.table').find('div.table-row').each(function(){
                    $(this).addClass('hidden');
                })

                $('div.table').find('div.table-cell:contains("'+ searchValue +'")').each(function(){
                    $(this).parent().removeClass('hidden');

                    if (!$(this).parent().parent().parent().hasClass('explore')) {
                        $(this).parent().parent().find('div.table-row').each(function(){
                            $(this).removeClass('hidden');
                        })
                    }

                    $(this).parent().parent().find('.chapter-header').removeClass('hidden');
                    $(this).html($(this).text().replace(searchValue, '<font color="red">'+searchValue+'</font>'));
                });

            }
        }
    }
})();
