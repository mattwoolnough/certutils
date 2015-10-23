(function () {
    'use strict';

    angular
        .module('app.csr')
        .controller('CsrController', CsrController);

    CsrController.$inject = ['csrAPI', 'LxNotificationService'];
    /* @ngInject */
    function CsrController (csrAPI, LxNotificationService) {
        var vm = this;

        vm.deleteCsr = deleteCsr;

        init();

        /////////////

        function init () {
            _getCsrList();
        }

        function _getCsrList () {
            csrAPI.getCsrs()
                .then(function (data) {
                    vm.csrs = data;
                });
        }

        function deleteCsr (id, name) {
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
            csrAPI.removeCsr(id)
                .then(_success)
                .catch(_error);

            function _success (data) {
                _getCsrList();
            }

            function _error (message) {
                LxNotificationService.alert('Delete csr error', message, 'OK', function () {
                    _getCsrList();
                });
            }
        }

    }
})();
