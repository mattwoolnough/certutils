(function () {
    'use strict';

    angular
        .module('app.csr')
        .controller('CsrFormController', CsrFormController);

    CsrFormController.$inject = ['csrAPI'];
    /* @ngInject */
    function CsrFormController (csrAPI) {
        var vm = this;

        vm.selects = {
            src: [
                {'name': 'Android'},
                {'name': 'iOS'},
                {'name': 'Windows Csr'}
            ],
            toModel: _toModel,
            toSelection: _toSelection
        };

        vm.submitForm = submitForm;

        init();

        /////////////

        function init () {

        }

        function _toModel (selection, callback) {
            if (selection) {
                callback(selection.name);
            } else {
                callback();
            }
        }

        function _toSelection (model, callback) {
            var target;
            if (model) {
                target = vm.selects.src.filter(function (item) {
                    return item.name === model;
                });
                callback(target[0]);
            } else {
                callback();
            }
        }

        function submitForm (csr) {
            if (vm.csrForm.$invalid || !vm.csr.releaseDate) {
                return;
            }
            vm.isRequest = true;
            // call submit method passed in from outer scope
            vm.submit(csr)
                .then(function () {
                    _endRequest();
                    vm.csrForm.$setPristine();
                })
                .catch(_endRequest);
        }

        function _endRequest () {
            vm.isRequest = false;
        }

    }
})();
