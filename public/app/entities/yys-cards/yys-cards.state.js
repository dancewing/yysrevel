(function() {
    'use strict';

    angular
        .module('yysApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('yys-cards', {
            parent: 'entity',
            url: '/yys-cards',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'yysApp.yysCards.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'public/app/entities/yys-cards/yys-cards.html',
                    controller: 'YysCardsController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('yysCards');
                    $translatePartialLoader.addPart('yysCard');
                    $translatePartialLoader.addPart('yysCardLevel');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('yys-cards-detail', {
            parent: 'yys-cards',
            url: '/yys-cards/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'yysApp.yysCards.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'public/app/entities/yys-cards/yys-cards-detail.html',
                    controller: 'YysCardsDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('yysCards');
                    $translatePartialLoader.addPart('yysCard');
                    $translatePartialLoader.addPart('yysCardLevel');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'YysCards', function($stateParams, YysCards) {
                    return YysCards.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'yys-cards',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('yys-cards-detail.edit', {
            parent: 'yys-cards-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'public/app/entities/yys-cards/yys-cards-dialog.html',
                    controller: 'YysCardsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['YysCards', function(YysCards) {
                            return YysCards.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('yys-cards.new', {
            parent: 'yys-cards',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'public/app/entities/yys-cards/yys-cards-dialog.html',
                    controller: 'YysCardsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                card: null,
                                level: null,
                                quantity: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('yys-cards', null, { reload: 'yys-cards' });
                }, function() {
                    $state.go('yys-cards');
                });
            }]
        })
        .state('yys-cards.edit', {
            parent: 'yys-cards',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'public/app/entities/yys-cards/yys-cards-dialog.html',
                    controller: 'YysCardsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['YysCards', function(YysCards) {
                            return YysCards.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('yys-cards', null, { reload: 'yys-cards' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('yys-cards.delete', {
            parent: 'yys-cards',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'public/app/entities/yys-cards/yys-cards-delete-dialog.html',
                    controller: 'YysCardsDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['YysCards', function(YysCards) {
                            return YysCards.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('yys-cards', null, { reload: 'yys-cards' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
