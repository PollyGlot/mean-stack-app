angular
    .module('customNavbar')
    .directive('customNavbar') 

function customNavbar() {
    return {
        restrict: 'E',
        templateUrl: '../modules/custom-navbar.html',
    }
}