function getGreetingTime (m) {
	var g = null; // return g

	if(!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.

	var split_afternoon = 12; // 24hr time to split the afternoon
	var split_evening = 17; // 24hr time to split the evening
	var currentHour = parseFloat(m.format('HH'));

	if(currentHour >= split_afternoon && currentHour <= split_evening) {
		g = 'afternoon';
	} else if(currentHour >= split_evening) {
		g = 'evening';
	} else {
		g = 'morning';
	}

	return g;
}

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
	var greeting = 'Good ' + getGreetingTime(moment()) + ', Harriet';
	$scope.message = greeting;
});

app.controller('MainCtrl', function ($scope, $resource, $interval) {
	/*var Tasks = $resource('https://prompto.smileupps.com/tasks');
	$scope.tasks = Tasks.get();*/
	var result;

	$interval(function () {
		var found = false;
		angular.forEach($scope.tasks, function (task){
			if (!found && task.completed === false) {
				task.next = true;
				task.selected = true;
				found = true;
			}
		});
	}, 1000);

	$scope.tasks = [
		{'name':'Take Medication','category':'Medication', time: '08:00', completed: true },
		{'name':'Brush Teeth','category':'Hygene', time: '08:15', completed: true},
		{'name':'Take Medication','category':'Medication', time: '15:00', completed: false},
		{'name':'Eat Dinner','category':'Food', time: '19:00', completed: false},
		{'name':'Take Medication','category':'Medication', time: '21:00', completed: false},
		{'name':'Charge iPad','category':'Devices', time: '22:00', completed: false}
	];

	$scope.taskClick = function ($event, task){
		if(task.next || task.completed){
			$event.preventDefault();
		}else{
			task.selected = !task.selected;
		}
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