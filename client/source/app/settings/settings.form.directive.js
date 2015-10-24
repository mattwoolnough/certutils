(function () {
    'use strict';

    angular
        .module('app.settings')
        .directive('aiosettingsForm', settingsForm);

    settingsForm.$inject = [];
    /* @ngInject */
    function settingsForm () {
        var directive = {
            restrict: 'AE',
            transclude: true,
            scope: {
                settings: '=',
                state: '=',
                submit: '=',
                cancel: '='
            },
            controller: 'settingsFormController',
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'static/settings/settings.form.html'
        };
        return directive;
    }
})();
