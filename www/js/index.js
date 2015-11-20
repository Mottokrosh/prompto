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

app.controller('HeaderCtrl', function ($scope) {
	var timeOfDay = 'Good morning, ';
	$scope.message = timeOfDay + 'Harriet';
});

app.controller('MainCtrl', function ($scope, $resource) {
	var Tasks = $resource('https://prompto.smileupps.com/tasks');
	//$scope.tasks = Tasks.get();
	$scope.tasks = [{'name':'Take Medication','category':'Medication'},{'name':'Brush Teeth','category':'Hygene'},{'name':'Eat Dinner','category':'Food'}];
	$scope.taskClick = function (){
		console.log("clciked.");
	}
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