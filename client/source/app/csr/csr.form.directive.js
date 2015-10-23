(function () {
    'use strict';

    angular
        .module('app.csr')
        .directive('aioCsrForm', CsrForm);

    CsrForm.$inject = [];
    /* @ngInject */
    function CsrForm () {
        var directive = {
            restrict: 'AE',
            transclude: true,
            scope: {
                csr: '=',
                state: '=',
                submit: '=',
                cancel: '='
            },
            controller: 'CsrFormController',
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'static/csr/csr.form.html'
        };
        return directive;
    }
})();
