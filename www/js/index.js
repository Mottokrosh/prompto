var app = angular.module('Prompto', ['ngResource', 'ngRoute']);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/main.html',
			controller: "MainCtrl"
		})
		.otherwise({
			redirectTo: '/'
		});
});

app.controller('MainCtrl', function ($scope, $resource) {
	$scope.test = {
		foo: 'bar',
		bla: 'thing'
	};
});


var app = {
	initialize: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},

	onDeviceReady: function() {
		console.log('device ready');

	}
};

app.initialize();