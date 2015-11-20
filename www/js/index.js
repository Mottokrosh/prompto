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

	$scope.tasks = [
		{'name':'Take Medication','category':'Medication', time: '08:00', completed: true },
		{'name':'Brush Teeth','category':'Hygene', time: '08:15', completed: true},
		{'name':'Take Medication','category':'Medication', time: '15:00'},
		{'name':'Eat Dinner','category':'Food', time: '19:00'},
		{'name':'Take Medication','category':'Medication', time: '21:00'},
		{'name':'Charge iPad','category':'Devices', time: '22:00'}
	];

	$scope.taskClick = function (task){
		task.selected = !task.selected;
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