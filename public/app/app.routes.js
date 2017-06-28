angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider
		.when('/', {
			templateUrl : 'app/views/main.html',
			// controller: 'homeController',
			// controllerAs: 'home'
		})

		.when('/login', {
			templateUrl : 'app/views/pages/login.html',
   			controller  : 'mainController',
    		controllerAs: 'login'
		})

		.when('/users', {
			templateUrl: 'app/views/pages/users/all.html',
			controller: 'userController',
			controllerAs: 'user'
		})

		.when('/users/create', {
			templateUrl: 'app/views/pages/users/single.html',
			controller: 'userCreateController',
			controllerAs: 'user'
		})

		.when('/users/:user_id', {
			templateUrl: 'app/views/pages/users/single.html',
			controller: 'userEditController',
			controllerAs: 'user'
		})

		.when('/products', {
			templateUrl: 'app/views/pages/products/all.html',
			controller: 'productController',
			controllerAs: 'product'
		})

		.when('/products/create', {
			templateUrl: 'app/views/pages/products/single.html',
			controller: 'productCreateController',
			controllerAs: 'product'
		})

		.when('/products/:product_id', {
			templateUrl: 'app/views/pages/products/single.html',
			controller: 'productEditController',
			controllerAs: 'product'
		})

		.when('/dashboard', {
			templateUrl: 'app/views/pages/dashboard.html',
			// controller: 'dashboardController',
			// controllerAs: 'dashboard'
		})

		.when('/order', {
			templateUrl: 'app/views/pages/order.html',
			controller: 'orderController',
			controllerAs: 'order'
		})

		.when('/about', {
			templateUrl: 'app/views/pages/about.html',
		})

		.otherwise({
 			redirectTo: '/'
		});

	$locationProvider.html5Mode(true);
});
