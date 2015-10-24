(function () {
    'use strict';

    angular
        .module('app.settings')
        .controller('settingsFormController', settingsFormController);

    settingsFormController.$inject = ['settingsAPI'];
    /* @ngInject */
    function settingsFormController (settingsAPI) {
        /*jshint validthis: true */
        var vm = this;

        vm.selects = {
            src: [
                {'name': 'Android'},
                {'name': 'iOS'},
                {'name': 'Windows settings'}
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

        function submitForm (settings) {
            if (vm.settingsForm.$invalid || !vm.settings.releaseDate) {
                return;
            }
            vm.isRequest = true;
            // call submit method passed in from outer scope
            vm.submit(settings)
                .then(function () {
                    _endRequest();
                    vm.settingsForm.$setPristine();
                })
                .catch(_endRequest);
        }

        function _endRequest () {
            vm.isRequest = false;
        }

    }
})();
