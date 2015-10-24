//jscs:disable maximumLineLength
(function () {
    'use strict';

    angular
    .module ('app.settings')
    .controller ('settingsAddController', settingsAddController);

    settingsAddController.$inject = ['settingsAPI', '$state',
        'LxNotificationService', '$q'];
    /* @ngInject */
    function settingsAddController (settingsAPI, $state,
                               LxNotificationService, $q) {
        /*jshint validthis: true */
        var vm = this;

        vm.createNewsettings = createNewsettings;

        init ();

        /////////////

        function init () {
            vm.settings = {};
            vm.state = 'add';
            vm.formFields = [{
                key: 'left',
                type: 'lx-flex',
                templateOptions: {
                    className: 'anarchy', // ng-class
                    flex: {
                        container: 'row', // row | column | row-reverse | column-reverse
                        wrap: 'wrap', // nowrap | wrap | wrap-reverse
                        align: 'flex-start', // flex-start | flex-end | center | space-between | space-around | stretch
                        item: 6 // width (between 1 & 12)
                    },
                    style: 'height: 200px',
                    fields: [
                        {
                            key: 'CN',
                            type: 'lx-input',
                            defaultValue: 'google.com',
                            wrapper: 'lx-wrapper-flex',
                            templateOptions: {
                                type: 'text',
                                label: 'Common Name',
                                placeholder: 'Server Name',
                                flex: {
                                    item: '1',
                                    'flex-order': '1'
                                }
                            }
                        },
                        {
                            key: 'O',
                            type: 'lx-input',
                            wrapper: 'lx-wrapper-flex',
                            templateOptions: {
                                type: 'text',
                                label: 'Organization',
                                flex: {
                                    item: '2',
                                    'flex-order': '2'
                                }

                            }
                        },
                        {
                            key: 'OU',
                            type: 'lx-input',
                            wrapper: 'lx-wrapper-flex',
                            templateOptions: {
                                type: 'text',
                                label: 'Organizational Unit',
                                flex: {
                                    item: '3',
                                    'flex-order': '3'
                                }
                            }
                        },
//          }]
//      }
//},
//{
//  template: '<br/><h4>Blah 2</h4>'
//},
//      {
//        'key': 'right',
//        'type': 'lx-flex',
//        'templateOptions': {
//          'flex': {
//            'container': 'column', // row | column | row-reverse | column-reverse
//            'wrap': 'wrap', // nowrap | wrap | wrap-reverse
//            'align': 'space-between', // flex-start | flex-end | center | space-between | space-around | stretch
//            'item': 3  // width (between 1 & 12)
//          },
//          'className': 'bgc-red-500 right', // ng-class
//          'style': 'height: 200px',
//          'fields': [
                        {
                            key: 'L',
                            type: 'lx-input',
                            wrapper: 'lx-wrapper-flex',
                            templateOptions: {
                                type: 'text',
                                label: 'Locality',
                                flex: {
                                    item: '4',
                                    'flex-order': '5'
                                }
                            }
                        },
                        {
                            key: 'ST',
                            type: 'lx-input',
                            wrapper: 'lx-wrapper-flex',
                            templateOptions: {
                                type: 'text',
                                label: 'State',
                                flex: {
                                    item: '5'
                                }
                            }
                        }, {
                            key: 'C',
                            type: 'lx-input',
                            wrapper: 'lx-wrapper-flex',
                            templateOptions: {
                                type: 'text',
                                label: 'Country',
                                flex: {
                                    item: '6'
                                }
                            },
                            validators: {
                                TwoCharCountry: function ($viewValue, $modelValue, scope) {
                                    var value = $modelValue || $viewValue;
                                    if (value) {
                                        return value.match (/^[A-Z]{2}$/g);
                                    } else {
                                        return 'true';
                                    }
                                }
                            }
                        }]
                }
            },
                {
                    template: '<br/><h2>Key Options</h2>'
                },
                {
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
                                defaultValue: '2048',
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
                                defaultValue: 'SHA256withRSA',
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
                }];

        }

        function createNewsettings (settings) {
            // return promise here to let the settings form controller know the response status
            return settingsAPI.createNewsettings (settings)
                .then (_success)
                .catch (_error);

            function _success (data) {
                $state.go ('root.settings');
            }

            function _error (message) {
                LxNotificationService.alert ('Add settings error', message, 'OK');
                return $q.reject ();
            }
        }

    }
}) ();
