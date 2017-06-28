angular
    .module('productCtrl', ['productService'])

    // .filter('filterByBurgers', function () {
    //     return function(product) {
    //         return product === 'Burgers';
    //     };
    // })

    .controller('productController', function (Product) {
        var vm = this;

        // Функции для поиска и сортировки
        vm.sortType     = 'title';
        vm.sortReverse  = false;
        vm.searchProduct   = '';

        // функция для загрузки данных
        vm.processing = true;

        Product.all()
            .success(function (data) {
                vm.processing = false;
                vm.products = data;
            });

        vm.deleteProduct = function (id) {
            vm.processing = true;
            Product.delete(id)
                .success(function (data) {
                    Product.all()
                        .success(function (data) {
                            vm.processing = false;
                            vm.users = data;
                        });
                });
        };
    })

    .controller('productCreateController', function (Product) {
        var vm = this;

        vm.type = 'create';
        vm.saveProduct = function () {
            vm.processing = true;
            vm.message = '';

            Product.create(vm.productData)
                .success(function (data) {
                    vm.processing = false;
                    vm.productData = {};
                    vm.message = data.message;
                });
        };
    })

    .controller('productEditController', function ($routeParams, Product) {
        var vm = this;

        vm.type = 'edit';

        Product.get($routeParams.product_id)
            .success(function (data) {
                vm.productData = data;
            });

        vm.saveProduct = function () {
            vm.processing = true;
            vm.message = '';

            Product.update($routeParams.product_id, vm.productData)
                .success(function (data) {
                    vm.processing = false;
                    vm.productData = {};
                    vm.message = data.message;
                });
        };
    });
