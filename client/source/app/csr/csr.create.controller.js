(function () {
    'use strict';

    angular
        .module('app.csr')
        .controller('CsrAddController', CsrAddController);

    CsrAddController.$inject = ['csrAPI', '$state',
        'LxNotificationService', '$q'];
    /* @ngInject */
    function CsrAddController (csrAPI, $state,
        LxNotificationService, $q) {
        var vm = this;

        vm.addNewCsr = addNewCsr;

        init();

        /////////////

        function init () {
            vm.csr = {};
            vm.state = 'add';
        }

        function addNewCsr (csr) {
            // return promise here to let the csr form controller know the response status
            return csrAPI.addNewCsr(csr)
                .then(_success)
                .catch(_error);

            function _success (data) {
                $state.go('root.csr');
            }

            function _error (message) {
                LxNotificationService.alert('Add csr error', message, 'OK');
                return $q.reject();
            }
        }

    }
})();
