(function () {
    'use strict';

    angular
        .module('app.csr')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /* @ngInject */
    function appRun (routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates () {
        return [
            {
                state: 'root.csr',
                config: {
                    url: '/csr',
                    views: {
                        'main@': {
                            templateUrl: 'static/csr/csr.html',
                            controller: 'CsrController as vm'
                        }
                    },
                    data: {
                        title: 'Csr',
                        _class: 'csr',
                        requireLogin: false
                    },
                    sidebar: {
                        icon: 'mdi-cellcsr-android',
                        text: 'CSRs'
                    },
                    breadcrumb: 'CSRs'
                }
            },
            {
                state: 'root.csr.create',
                config: {
                    url: '/create',
                    views: {
                        'main@': {
                            templateUrl: 'static/csr/csr.create.html',
                            controller: 'CsrAddController as vm'
                        }
                    },
                    breadcrumb: 'Add Csr'
                }
            },
            {
                state: 'root.csr.detail',
                config: {
                    url: '/:id',
                    views: {
                        'main@': {
                            templateUrl: 'static/csr/csr.detail.html',
                            controller: 'CsrDetailController as vm'
                        }
                    },
                    breadcrumb: 'Csr Detail'
                }
            }
        ];
    }
})();
