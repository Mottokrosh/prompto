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

var app = angular.module('Prompto', ['ngResource', 'ngRoute', 'ngSanitize', 'ngTouch']);

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
	function setStates() {
		var found = false;
		angular.forEach($scope.tasks, function (task) {
			task.value.selected = false;
			if (!found && task.value.completed === false && moment(task.value.time, 'HH:mm') > moment()) {
				task.value.next = true;
				task.value.selected = true;
				found = true;
			}
			if (task.value.completed === false && moment(task.value.time, 'HH:mm') < moment()){
				task.value.missed = true;
			}
		});
	}

	$scope.setStates = setStates;

	$http.get('https://prompto.smileupps.com/tasks/_design/tasks/_view/all')
		.success(function (response) {
			$scope.tasks = response.rows;
			setStates();
		});

	$interval(setStates, 10000);

	$scope.taskClick = function ($event, task) {
		angular.forEach($scope.tasks, function (task) {
			task.value.selected = false;
		});
		task.selected = true;
	};
});

app.directive('taskIcon', function () {
	return {
		restrict: 'A',
		scope: {
			task: '=taskIcon'
		},
		link: function (scope, elem) {
			var icon,
				icons = {
					'Charging': 'img/icon_charge.svg',
					'Hygiene': 'img/icon_pill.svg',
					'Nutrition': 'img/icon_nutrition.svg',
					'Medication': 'img/icon_pill.svg',
					'Visit': 'img/photos/Ramone.png'
				},
				defaultIcon = 'img/icon_star.svg';

			if (scope.task.missed) {
				icon = 'img/icon_cross.svg';
			} else if (scope.task.completed) {
				icon = 'img/icon_tick.svg';
			} else {
				icon = icons[scope.task.category] || defaultIcon;
			}

			elem.attr('src', icon);
		}
	};
});

app.directive('buttonOrText', function () {
	return {
		restrict: 'E',
		scope: {
			task: '=task',
			setStates: '='
		},
		template: '<span ng-show="task.next"><a ng-click="doClick()" role="button" class="pill">Mark as Done</a></span>' +
			'<span ng-hide="task.next" class="task-message">{{output}}</span>',
		link: function (scope, elem) {
			scope.output = 'Later';

			scope.doClick = function () {
				scope.task.completed = true;
				scope.setStates();
			};

			if (scope.task.missed) {
				scope.output = 'Missed';
			} else if (scope.task.completed) {
				scope.output = 'Done';
			}
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