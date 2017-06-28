angular
	.module('mainCtrl', ['mgcrea.ngStrap', 'pascalprecht.translate'])
	.controller('mainController', function($rootScope, $location, Auth) {
		var vm = this;
		// get info if a person is logged in
		vm.loggedIn = Auth.isLoggedIn();
		// check to see if a user is logged in on every request
		$rootScope.$on('$routeChangeStart', function() {
			vm.loggedIn = Auth.isLoggedIn();
			// get user information on page load
			Auth.getUser()
				.then(function(data) {
					vm.user = data.data;
				});
		});

		vm.doLogin = function() {
			vm.processing = true;
			vm.error = '';
			Auth.login(vm.loginData.username, vm.loginData.password)
				.success(function(data) {
					vm.processing = false;
					if (data.success)
						$location.path('/dashboard');
					else
						vm.error = data.message;
				});
		};

		vm.doLogout = function() {
			Auth.logout();
			vm.user = '';
			$location.path('/');
			// $routeScope.reload();
			// $location.reload();
		};
		vm.createSample = function() {
			Auth.createSampleUser();
		};

		vm.headerController = function($rootScope, $location){
			$rootScope.isActive = function(viewLocation) {
				return viewLocation === $location.path();
			};
		};

		vm.showFirstTab = function() {
			angular.element(['dara-target="#tab1"']).tab('show');
		};
});
