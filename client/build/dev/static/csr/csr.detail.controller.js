(function () {
    'use strict';

    angular
        .module('app.csr')
        .controller('CsrDetailController', CsrDetailController);

    CsrDetailController.$inject = ['csrAPI', '$stateParams',
        'LxNotificationService', '$q'];
    /* @ngInject */
    function CsrDetailController (csrAPI, $stateParams,
        LxNotificationService, $q) {
        var vm = this;

        vm.state = 'view';
        vm.beginEdit = beginEdit;
        vm.cancelUpdate = cancelUpdate;
        vm.updateCsr = updateCsr;

        var _originalCsr;

        init();

        /////////////

        function init () {
            var id = $stateParams.id;
            if (id) {
                _getCsrDetail(id);
            }
        }

        function _getCsrDetail (id) {
            csrAPI.getCsrDetail(id)
                .then(function (data) {
                    vm.csr = data;
                });
        }

        function beginEdit () {
            _originalCsr = angular.copy(vm.csr);
            vm.state = 'edit';
        }

        function cancelUpdate () {
            vm.csr = angular.copy(_originalCsr);
            vm.state = 'view';
        }

        function updateCsr (csr) {
            // return promise here to let the csr form controller know the response status
            return csrAPI.updateCsr(csr.id, csr)
                .then(_success)
                .catch(_error);

            function _success (data) {
                vm.state = 'view';
                vm.csr = data;
            }

            function _error (message) {
                LxNotificationService.alert('Update csr error', message, 'OK', function () {
                    cancelUpdate();
                });
                return $q.reject();
            }
        }

    }
})();
