(function () {
    'use strict';

    angular
        .module('app.settings')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['settingsAPI', 'LxNotificationService'];
    /* @ngInject */
    function SettingsController (settingsAPI, LxNotificationService) {
        var vm = this;

        vm.deletesettings = deletesettings;

        init();

        /////////////

        function init () {
            _getsettingsList();
        }

        function _getsettingsList () {
            settingsAPI.getsettings()
                .then(function (data) {
                    vm.settings = data;
                });
        }

        function deletesettings (id, name) {
            LxNotificationService.confirm('Are your sure?',
                'All information about [' + name + '] will be REMOVED!',
                {cancel:'cancel', ok:'delete'},
                function (answer) {
                    if (answer) {
                        _doDelete(id);
                    }
                }
            );
        }

        function _doDelete (id) {
            settingsAPI.removesettings(id)
                .then(_success)
                .catch(_error);

            function _success (data) {
                _getsettingsList();
            }

            function _error (message) {
                LxNotificationService.alert('Delete settings error', message, 'OK', function () {
                    _getsettingsList();
                });
            }
        }

    }
})();
