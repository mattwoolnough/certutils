(function () {
    'use strict';

    angular
        .module('app.settings')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /* @ngInject */
    function appRun (routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates () {
        return [
            {
                state: 'root.settings',
                config: {
                    url: '/settings',
                    views: {
                        'main@': {
                            templateUrl: 'static/settings/settings.html',
                            controller: 'SettingsController as vm'
                        }
                    },
                    data: {
                        title: 'settings',
                        _class: 'settings',
                        requireLogin: false
                    },
                    //sidebar: {
                    //    icon: 'mdi-cellsettings-android',
                    //    text: 'settings'
                    //},
                    breadcrumb: 'settings List'
                }
            },
            {
                state: 'root.settings.create',
                config: {
                    url: '/create',
                    views: {
                        'main@': {
                            templateUrl: 'static/settings/settings.create.html',
                            controller: 'settingsAddController as vm'
                        }
                    },
                    breadcrumb: 'Add settings'
                }
            },
            {
                state: 'root.settings.detail',
                config: {
                    url: '/:id',
                    views: {
                        'main@': {
                            templateUrl: 'static/settings/settings.detail.html',
                            controller: 'settingsDetailController as vm'
                        }
                    },
                    breadcrumb: 'settings Detail'
                }
            }
        ];
    }
})();
