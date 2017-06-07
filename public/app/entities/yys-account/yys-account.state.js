(function() {
    'use strict';

    angular
        .module('yysApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('yys-account', {
            parent: 'entity',
            url: '/yys-account?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'yysApp.yysAccount.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'public/app/entities/yys-account/yys-accounts.html',
                    controller: 'YysAccountController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }],
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('yysAccount');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('yys-account-detail', {
            parent: 'yys-account',
            url: '/yys-account/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'yysApp.yysAccount.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'public/app/entities/yys-account/yys-account-detail.html',
                    controller: 'YysAccountDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('yysAccount');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'YysAccount', function($stateParams, YysAccount) {
                    return YysAccount.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'yys-account',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('yys-account-detail.edit', {
            parent: 'yys-account-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'public/app/entities/yys-account/yys-account-dialog.html',
                    controller: 'YysAccountDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['YysAccount', function(YysAccount) {
                            return YysAccount.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('yys-account.new', {
            parent: 'yys-account',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'public/app/entities/yys-account/yys-account-dialog.html',
                    controller: 'YysAccountDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                email: null,
                                name: null,
                                comment: null,
                                level: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('yys-account', null, { reload: 'yys-account' });
                }, function() {
                    $state.go('yys-account');
                });
            }]
        })
        .state('yys-account.edit', {
            parent: 'yys-account',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'public/app/entities/yys-account/yys-account-dialog.html',
                    controller: 'YysAccountDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['YysAccount', function(YysAccount) {
                            return YysAccount.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('yys-account', null, { reload: 'yys-account' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('yys-account.delete', {
            parent: 'yys-account',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'public/app/entities/yys-account/yys-account-delete-dialog.html',
                    controller: 'YysAccountDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['YysAccount', function(YysAccount) {
                            return YysAccount.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('yys-account', null, { reload: 'yys-account' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('yys-account-detail.cardnew', {
                parent: 'yys-account-detail',
                url: '/cardnew',
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
                                    id: null,
                                    yysAccountId : $stateParams.id
                                };
                            }
                        }
                    }).result.then(function() {
                        $state.go('^', {}, { reload: 'yys-account-detail' });
                    }, function() {
                        $state.go('^');
                    });
                }]
            })
            .state('yys-account-detail.cardedit', {
                parent: 'yys-account-detail',
                url: '/cardedit/{cardId}/',
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
                                return YysCards.get({id : $stateParams.cardId}).$promise;
                            }]
                        }
                    }).result.then(function() {
                        $state.go('^', null, { reload: 'yys-account-detail' });
                    }, function() {
                        $state.go('^');
                    });
                }]
            })
            .state('yys-account-detail.carddelete', {
                parent: 'yys-account-detail',
                url: '/carddelete/{cardId}/',
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
                                return YysCards.get({id : $stateParams.cardId}).$promise;
                            }]
                        }
                    }).result.then(function() {
                        $state.go('^', null, { reload: 'yys-account-detail' });
                    }, function() {
                        $state.go('^');
                    });
                }]
            })
            .state('yys-account-detail.suipiannew', {
                parent: 'yys-account-detail',
                url: '/suipiannew',
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
                                    id: null,
                                    yysAccountId:$stateParams.id
                                };
                            }
                        }
                    }).result.then(function() {
                        $state.go('^', null, { reload: 'yys-account-detail' });
                    }, function() {
                        $state.go('^');
                    });
                }]
            })
            .state('yys-account-detail.suipianedit', {
                parent: 'yys-account-detail',
                url: '/suipianedit/{suipianId}',
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
                                return YysSuipian.get({id : $stateParams.suipianId}).$promise;
                            }]
                        }
                    }).result.then(function() {
                        $state.go('^', null, { reload: 'yys-account-detail' });
                    }, function() {
                        $state.go('^');
                    });
                }]
            })
            .state('yys-account-detail.suipiandelete', {
                parent: 'yys-account-detail',
                url: '/suipiandelete/{suipianId}/',
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
                                return YysSuipian.get({id : $stateParams.suipianId}).$promise;
                            }]
                        }
                    }).result.then(function() {
                        $state.go('^', null, { reload: 'yys-account-detail' });
                    }, function() {
                        $state.go('^');
                    });
                }]
            });

    }

})();
