angular
	.module('userCtrl', ['userService'])
	.controller('userController', function(User) {
		var vm = this;

		vm.sortType     = 'name';
        vm.sortReverse  = false;
        vm.searchProduct   = '';

		vm.processing = true;

		User.all()
			.success(function(data) {
				// когда все юзеры возвращены, удаляем processing
				vm.processing = false;
				// привязываем юзеров, которые были возвращены, к vm.users
				vm.users = data;
			});
		// функция удаления юзера
		vm.deleteUser = function(id) {
			vm.processing = true;
			User.delete(id)
				.success(function(data) {
					// получаем всех юзеров и обновляем таблицу
					User.all()
						.success(function(data) {
							vm.processing = false;
							vm.users = data;
						});
				});
		};
	})

	// контроллер привязанный к странице создания юзера
	.controller('userCreateController', function(User) {
		var vm = this;
		// variable to hide/show elements of the view
		// differentiates between create or edit pages
		vm.type = 'create';
		// function to create a user
		vm.saveUser = function() {
			vm.processing = true;
			vm.message = '';
			// use the create function in the userService
			User.create(vm.userData)
				.success(function(data) {
					vm.processing = false;
					vm.userData = {};
					vm.message = data.message;
				});
		};
	})

	// controller applied to user edit page
	.controller('userEditController', function($routeParams, User) {
		var vm = this;
		// variable to hide/show elements of the view
		// differentiates between create or edit pages
		vm.type = 'edit';
		// get the user data for the user you want to edit
		// $routeParams is the way we grab data from the URL
		User.get($routeParams.user_id)
			.success(function(data) {
				vm.userData = data;
			});
		// function to save the user
		vm.saveUser = function() {
			vm.processing = true;
			vm.message = '';
			// call the userService function to update
			User.update($routeParams.user_id, vm.userData)
				.success(function(data) {
					vm.processing = false;
					// clear the form
					vm.userData = {};
					// bind the message from our API to vm.message
					vm.message = data.message;
				});
		};
	});
