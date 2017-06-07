(function() {
    'use strict';

    angular
        .module('yysApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('yys-suipian', {
            parent: 'entity',
            url: '/yys-suipian',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'yysApp.yysSuipian.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'public/app/entities/yys-suipian/yys-suipians.html',
                    controller: 'YysSuipianController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('yysSuipian');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('yys-suipian-detail', {
            parent: 'yys-suipian',
            url: '/yys-suipian/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'yysApp.yysSuipian.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'public/app/entities/yys-suipian/yys-suipian-detail.html',
                    controller: 'YysSuipianDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('yysSuipian');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'YysSuipian', function($stateParams, YysSuipian) {
                    return YysSuipian.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'yys-suipian',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('yys-suipian-detail.edit', {
            parent: 'yys-suipian-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'public/app/entities/yys-suipian/yys-suipian-dialog.html',
                    controller: 'YysSuipianDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['YysSuipian', function(YysSuipian) {
                            return YysSuipian.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('yys-suipian.new', {
            parent: 'yys-suipian',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'public/app/entities/yys-suipian/yys-suipian-dialog.html',
                    controller: 'YysSuipianDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                quantity: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('yys-suipian', null, { reload: 'yys-suipian' });
                }, function() {
                    $state.go('yys-suipian');
                });
            }]
        })
        .state('yys-suipian.edit', {
            parent: 'yys-suipian',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'public/app/entities/yys-suipian/yys-suipian-dialog.html',
                    controller: 'YysSuipianDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['YysSuipian', function(YysSuipian) {
                            return YysSuipian.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('yys-suipian', null, { reload: 'yys-suipian' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('yys-suipian.delete', {
            parent: 'yys-suipian',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'public/app/entities/yys-suipian/yys-suipian-delete-dialog.html',
                    controller: 'YysSuipianDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['YysSuipian', function(YysSuipian) {
                            return YysSuipian.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('yys-suipian', null, { reload: 'yys-suipian' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
