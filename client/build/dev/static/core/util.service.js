(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('util', utilService);

    utilService.$inject = [];
    /* @ngInject */
    function utilService () {
        var service = {
            preloadImage: preloadImage
        };

        return service;

        /////////////

        function preloadImage (url) {
            var img = new Image();
            img.src = url;
        }
    }
})();
