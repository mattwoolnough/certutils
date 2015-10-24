(function () {
    'use strict';

    angular
        .module('app.settings')
        .factory('settingsAPI', settingsService);

    settingsService.$inject = ['$http', '$q', 'ajaxErrorHandler'];
    /* @ngInject */
    function settingsService ($http, $q, ajaxError) {
        var service = {
            createNewsettings: createNewsettings
        };

        return service;

        /////////////

        function createNewsettings (settings) {
            var req = {
                'settings': settings
            };
            return $http.post('api/settings', req)
                .then(_success)
                .catch(ajaxError.catcher);

            function _success (response) {
                var data = response.data;
                if (response.status === 200 && data.code === 0) {
                    return data.result.settings;
                } else {
                    return $q.reject(data.message);
                }
            }
        }
    }
})();
