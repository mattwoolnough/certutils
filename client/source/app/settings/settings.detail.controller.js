(function () {
    'use strict';

    angular
        .module('app.settings')
        .controller('settingsDetailController', settingsDetailController);

    settingsDetailController.$inject = ['settingsAPI', '$stateParams',
        'LxNotificationService', '$q'];
    /* @ngInject */
    function settingsDetailController (settingsAPI, $stateParams,
        LxNotificationService, $q) {
        /*jshint validthis: true */
        var vm = this;

        vm.state = 'view';
        vm.beginEdit = beginEdit;
        vm.cancelUpdate = cancelUpdate;
        vm.updatesettings = updatesettings;

        var _originalsettings;

        init();

        /////////////

        function init () {
            var id = $stateParams.id;
            if (id) {
                _getsettingsDetail(id);
            }
        }

        function _getsettingsDetail (id) {
            settingsAPI.getsettingsDetail(id)
                .then(function (data) {
                    vm.settings = data;
                });
        }

        function beginEdit () {
            _originalsettings = angular.copy(vm.settings);
            vm.state = 'edit';
        }

        function cancelUpdate () {
            vm.settings = angular.copy(_originalsettings);
            vm.state = 'view';
        }

        function updatesettings (settings) {
            // return promise here to let the settings form controller know the response status
            return settingsAPI.updatesettings(settings.id, settings)
                .then(_success)
                .catch(_error);

            function _success (data) {
                vm.state = 'view';
                vm.settings = data;
            }

            function _error (message) {
                LxNotificationService.alert('Update settings error', message, 'OK', function () {
                    cancelUpdate();
                });
                return $q.reject();
            }
        }

    }
})();
