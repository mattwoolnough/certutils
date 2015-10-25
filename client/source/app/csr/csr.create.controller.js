//jscs:disable maximumLineLength
(function () {
    'use strict';

    angular
    .module ('app.csr')

    .controller ('CsrAddController', CsrAddController);

    CsrAddController.$inject = ['csrAPI', '$state',
        'LxNotificationService', '$q', 'resultService'];
    /* @ngInject */
    function CsrAddController (csrAPI, $state,
                               LxNotificationService, $q) {
        var vm = this;

        //vm.createNewCsr = createNewCsr;
        vm.submitForm = submitForm;

        init ();

        /////////////

        function init () {
            vm.csr = {};
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
                    fields: [{
                        key: 'CN',
                        type: 'lx-input',
                        //defaultValue: 'google.com',
                        wrapper: 'lx-wrapper-flex',
                        templateOptions: {
                            type: 'text',
                            label: 'Common Name',
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
                        {
                            key: 'L',
                            type: 'lx-input',
                            wrapper: 'lx-wrapper-flex',
                            templateOptions: {
                                type: 'text',
                                label: 'Locality',
                                flex: {
                                    item: '4',
                                    'flex-order': '4'
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
                                    item: '5',
                                    'flex-order': '5'
                                }
                            }
                        },
                        {
                            key: 'C',
                            type: 'lx-input',
                            wrapper: 'lx-wrapper-flex',
                            templateOptions: {
                                type: 'text',
                                label: 'Country',
                                flex: {
                                    item: '6',
                                    'flex-order': '6'
                                }
                                //},
                                //validators: {
                                //    TwoCharCountry: function ($viewValue, $modelValue, scope) {
                                //        var value = $modelValue || $viewValue;
                                //        if (value) {
                                //            return value.match (/^[A-Z]{2}$/g);
                                //        } else {
                                //            return 'true';
                                //        }
                                //    }
                            }
                        }
                    ]
                }
            },
            {
                template: '<br/><h4>Blah 2</h4>'
            }];
        }

        function submitForm () {
            $state.go('root.csr.detail');
            console.log('state.go(root.csr.detail)');
            //var subject = vm.constructSubject (vm.user);
            //var subject = 'www.google.com';
            //var keyalg = vm.user.keyalg,
            //    keylen = vm.user.keylength,
            //    sigalg = vm.user.sigalg;
            var keyalg = 'RSA',
                keylen = '2048',
                sigalg = 'SHA256withRSA';

            csrAPI.generateCSR('forge', keyalg, keylen, vm.formData, sigalg).then (function (result) {
                console.log('PEM: ' + result.pem);
                console.log('KEY: ' + result.key);
                //http://stackoverflow.com/questions/20181323/passing-data-between-controllers-in-angular-js

                resultService.addResult(result);

                vm.pem = result.pem;
                vm.key = result.key;
            });
        }

        //function createNewCsr (csr) {
        //    // return promise here to let the csr form controller know the response status
        //    return csrAPI.createNewCsr (csr)
        //        .then (_success)
        //        .catch (_error);
        //
        //    function _success (data) {
        //        $state.go ('root.csr');
        //    }
        //
        //    function _error (message) {
        //        LxNotificationService.alert ('Add csr error', message, 'OK');
        //        return $q.reject ();
        //    }
        //}
    }

}) ();
