(function() {
    'use strict';

    angular
        .module('yysApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('yys-role', {
            parent: 'entity',
            url: '/yys-role',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'yysApp.yysRole.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'public/app/entities/yys-role/yys-roles.html',
                    controller: 'YysRoleController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('yysRole');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('yys-role-detail', {
            parent: 'yys-role',
            url: '/yys-role/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'yysApp.yysRole.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'public/app/entities/yys-role/yys-role-detail.html',
                    controller: 'YysRoleDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('yysRole');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'YysRole', function($stateParams, YysRole) {
                    return YysRole.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'yys-role',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('yys-role-detail.edit', {
            parent: 'yys-role-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'public/app/entities/yys-role/yys-role-dialog.html',
                    controller: 'YysRoleDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['YysRole', function(YysRole) {
                            return YysRole.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('yys-role.new', {
            parent: 'yys-role',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'public/app/entities/yys-role/yys-role-dialog.html',
                    controller: 'YysRoleDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                roleName: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('yys-role', null, { reload: 'yys-role' });
                }, function() {
                    $state.go('yys-role');
                });
            }]
        })
        .state('yys-role.edit', {
            parent: 'yys-role',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'public/app/entities/yys-role/yys-role-dialog.html',
                    controller: 'YysRoleDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['YysRole', function(YysRole) {
                            return YysRole.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('yys-role', null, { reload: 'yys-role' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('yys-role.delete', {
            parent: 'yys-role',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'public/app/entities/yys-role/yys-role-delete-dialog.html',
                    controller: 'YysRoleDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['YysRole', function(YysRole) {
                            return YysRole.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('yys-role', null, { reload: 'yys-role' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
