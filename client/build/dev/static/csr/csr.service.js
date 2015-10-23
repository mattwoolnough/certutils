(function () {
    'use strict';

    angular
        .module('app.csr')
        .factory('csrAPI', csrService);

    csrService.$inject = ['$http', '$q', 'ajaxErrorHandler'];
    /* @ngInject */
    function csrService ($http, $q, ajaxError) {
        var service = {
            createNewCsr: createNewCsr
        };

        return service;

        /////////////

        function createNewCsr (csr) {
            var req = {
                'csr': csr
            };
            return $http.post('api/csrs', req)
                .then(_success)
                .catch(ajaxError.catcher);

            function _success (response) {
                var data = response.data;
                if (response.status === 200 && data.code === 0) {
                    return data.result.csr;
                } else {
                    return $q.reject(data.message);
                }
            }
        }
    }
})();
