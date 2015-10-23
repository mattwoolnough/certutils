(function () {
    'use strict';

    angular
        .module('app.csr')
        .factory('csrAPI', csrSerivce);

    csrSerivce.$inject = ['$http', '$q', 'ajaxErrorHandler'];
    /* @ngInject */
    function csrSerivce ($http, $q, ajaxError) {
        var service = {
            getCsrs: getCsrs,
            getCsrDetail: getCsrDetail,
            addNewCsr: addNewCsr,
            updateCsr: updateCsr,
            removeCsr: removeCsr
        };

        return service;

        /////////////

        function getCsrs () {
            return $http.get('api/csrs')
                .then(_success)
                .catch(ajaxError.catcher);

            function _success (response) {
                var data = response.data;
                if (response.status === 200 && data.code === 0) {
                    return data.result.csrs;
                } else {
                    return $q.reject(data.message);
                }
            }
        }

        function getCsrDetail (id) {
            return $http.get('api/csrs/' + id)
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

        function addNewCsr (csr) {
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

        function updateCsr (id, csr) {
            var req = {
                'csr': csr
            };
            return $http.put('api/csrs/' + id, req)
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

        function removeCsr (id) {
            return $http.delete('api/csrs/' + id)
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
