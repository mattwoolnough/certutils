//jscs:disable maximumLineLength
(function () {
    'use strict';

    angular
        .module ('app.settings')
        .controller ('SettingsController', SettingsController);

    SettingsController.$inject = ['settingsAPI', 'LxNotificationService'];
    /* @ngInject */
    function SettingsController (settingsAPI, LxNotificationService) {
        var vm = this;

        vm.deletesettings = deletesettings;

        init ();

        vm.formData = {
            library: vm.$storage.library,
            keyalg: vm.$storage.keyalg,
            keylength: vm.$storage.keylength,
            sigalg: vm.$storage.sigalg
        };

        vm.formFields = [{
            'key': 'top',
            'type': 'lx-flex',
            'templateOptions': {
                'flex': {
                    'container': 'column', // row | column | row-reverse | column-reverse
                    'wrap': 'wrap', // nowrap | wrap | wrap-reverse
                    'align': 'center', // flex-start | flex-end | center | space-between | space-around | stretch
                    'item': 2 // width (between 1 & 12)
                },
                'className': 'bgc-red-500', // ng-class
                'style': 'height: 200px',
                'fields': [{
                    key: 'library',
                    type: 'lx-select',
                    wrapper: 'lx-wrapper-flex',
                    defaultValue: 'forge',
                    templateOptions: {
                        label: 'Crypto Library',
                        selected: 'name',
                        choice: 'name',
                        //valueProp: 'name',
                        //labelProp: 'name',
                        options: [
                            {
                                name: 'forge'
                            },
                            {
                                name: 'jsrsasign'
                            }
                        ],
                        flex: {
                            item: '7'
                        }
                    }
                },
                    {
                        key: 'keyalg',
                        type: 'lx-select',
                        wrapper: 'lx-wrapper-flex',
                        defaultValue: 'RSA',
                        templateOptions: {
                            label: 'Key Alg',
                            options: [],
                            selected: 'name',
                            choice: 'name',
                            flex: {
                                item: '8'
                            }
                        },
                        controller: /* @ngInject */ function ($scope, DataService) {
                            $scope.$watch ('model.library', function (newValue, oldValue, theScope) {
                                if (newValue.name !== oldValue) {
                                    // logic to reload this select's options asynchronously based on state's value (newValue)
                                    console.log ('new value is different from old value');
                                    console.log ('was: ' + JSON.stringify (oldValue) + ' now: ' + JSON.stringify (newValue.name));
                                    //if ($scope.model[$scope.options.key] && oldValue) {
                                    //  // reset this select
                                    //  $scope.model[$scope.options.key] = '';
                                    //}
                                    // Reload options
                                    $scope.to.loading = DataService.keyalg (newValue.name).then (function (res) {
                                        $scope.to.options = res;
                                    });
                                }
                            });

                        }
                        //controller: /* @ngInject */ function ($scope, DataService) {
                        //  $scope.to.loading = DataService.keyalg ().then (function (response) {
                        //    $scope.to.options = response;
                        //    return response;
                        //  });

                    },
                    {
                        key: 'keylength',
                        type: 'lx-select',
                        wrapper: 'lx-wrapper-flex',
                        templateOptions: {
                            label: 'Key Length',
                            options: [],
                            selected: 'name',
                            choice: 'name',
                            flex: {
                                item: '9'
                            }
                        },
                        controller: /* @ngInject */ function ($scope, DataService) {
                            $scope.$watch ('model.keyalg', function (newValue, oldValue, theScope) {
                                if (newValue.name !== oldValue) {
                                    // logic to reload this select's options asynchronously based on state's value (newValue)
                                    console.log ('new value is different from old value');
                                    console.log ('was: ' + oldValue + ' now: ' + newValue.name);
                                    //if ($scope.model[$scope.options.key] && oldValue) {
                                    //  // reset this select
                                    //  $scope.model[$scope.options.key] = '';
                                    //}
                                    // Reload options
                                    $scope.to.loading = DataService.keylength (newValue.name).then (function (res) {
                                        $scope.to.options = res;
                                    });
                                }
                            });
                        }
                    },
                    {
                        key: 'sigalg',
                        type: 'lx-select',
                        templateOptions: {
                            label: 'Signature Algorithm',
                            options: [],
                            selected: 'name',
                            choice: 'name',
                            flex: {
                                item: '10'
                            }
                        },
                        controller: /* @ngInject */ function ($scope, DataService) {
                            $scope.$watch ('model.keyalg', function (newValue, oldValue, theScope) {
                                if (newValue.name !== oldValue) {
                                    // logic to reload this select's options asynchronusly based on state's value (newValue)
                                    console.log ('new value is different from old value');
                                    //if ($scope.model[$scope.options.key] && oldValue) {
                                    //  // reset this select
                                    //  $scope.model[$scope.options.key] = '';
                                    //}
                                    // Reload options
                                    $scope.to.loading = DataService.sigalg (newValue.name).then (function (res) {
                                        $scope.to.options = res;
                                    });
                                }
                            });
                        }
                    }
                ]
            }
        }
        ];

        /////////////

        function init () {
            _getsettingsList ();
        }

        function _getsettingsList () {
            settingsAPI.getsettings ()
                .then (function (data) {
                    vm.settings = data;
                });
        }

        function deletesettings (id, name) {
            LxNotificationService.confirm ('Are your sure?',
                'All information about [' + name + '] will be REMOVED!',
                {cancel: 'cancel', ok: 'delete'},
                function (answer) {
                    if (answer) {
                        _doDelete (id);
                    }
                }
            );
        }

        function _doDelete (id) {
            settingsAPI.removesettings (id)
                .then (_success)
                .catch (_error);

            function _success (data) {
                _getsettingsList ();
            }

            function _error (message) {
                LxNotificationService.alert ('Delete settings error', message, 'OK', function () {
                    _getsettingsList ();
                });
            }
        }

    }
}) ();
