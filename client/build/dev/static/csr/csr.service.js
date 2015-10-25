// jshint ignore: start
(function () {
    'use strict';

    angular
        .module('app.csr')
        .service('forge', function () {
            // return the global forge instance
            return forge;
        })
        .factory('csrAPI', csrService);

    csrService.$inject = ['$http', '$q', 'ajaxErrorHandler'];
    /* @ngInject */
    function csrService ($http, $q, ajaxError) {
        var service = {
            createNewCsr: createNewCsr,
            generateCSR: generateCSR
        };

        return service;

        /////////////
        ////  Load Forge global as a service
        /////////////
        //function forge () {
        //    return forge;
        //}

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

        function generateCSR (library, keyalg, keylen, subject, sigalg) {
                //https://github.com/digitalbazaar/forge/issues/103
                var deferred = $q.defer ();
                if (library === 'forge') {
                    var keys = forge.pki.rsa.generateKeyPair (keylen);
                    var privKey = forge.pki.privateKeyToPem (keys.privateKey);
                    var csr = forge.pki.createCertificationRequest ();

                    csr.publicKey = keys.publicKey;

                    csr.setSubject ([{
                        name: 'commonName',
                        value: subject.CN
                    }, {
                        name: 'countryName',
                        value: subject.C
                    }, {
                        shortName: 'ST',
                        value: subject.ST
                    }, {
                        name: 'localityName',
                        value: subject.L
                    }, {
                        name: 'organizationName',
                        value: subject.O
                    }, {
                        shortName: 'OU',
                        value: subject.OU
                    }]);

                    // sign certification request
                    csr.sign (keys.privateKey);

                    // verify certification request
                    var verified = csr.verify ();

                    // convert certification request to PEM-format
                    var pem = forge.pki.certificationRequestToPem (csr);

                    deferred.resolve ({
                        pem: pem,
                        key: privKey
                    });
                    return deferred.promise;
                } else if (library === 'jsrsasign') {
                    //Do something
                    console.log('something to stop JSLINT barfing');
                } else {
                    return deferred.$$reject('Not using a valid library');
                }
            }
    }
})();
