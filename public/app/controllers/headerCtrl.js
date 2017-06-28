angular
	.module('headerCtrl', [])
	.controller('headerController', function($scope, $location) {
		var vm = this;

		vm.headerController = function() { 
			$scope.isActive = function (viewLocation) { 
				return viewLocation === $location.path();
			};
		};
});