angular
    .module('productService', [])
    .factory('Product', function ($http) {
        var productFactory = {};

        productFactory.get = function (id) {
            return $http.get('api/products/' + id);
        };

        productFactory.all = function () {
            return $http.get('api/products/');
        };

        productFactory.create = function (productData) {
            return $http.post('api/products/', productData);
        };

        productFactory.update = function (id, productData) {
            return $http.put('/api/products/' + id, productData);
        };

        productFactory.delete = function (id) {
            return $http.delete('/api/products/' + id);
        };

        return productFactory;
    });
