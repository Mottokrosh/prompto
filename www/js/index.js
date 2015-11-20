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

app.controller('MainCtrl', function ($scope, $http, $interval) {
	$http.get('https://prompto.smileupps.com/tasks/_design/tasks/_view/all')
		.success(function (response) {
			$scope.tasks = response.rows;
		});

	$interval(function () {
		var found = false;
		angular.forEach($scope.tasks, function (task) {
			if (!found && task.value.completed === false) {
				task.value.next = true;
				task.value.selected = true;
				found = true;
			}
		});
	}, 1000);

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