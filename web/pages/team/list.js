'use strict';

angular.module('ultical.team', [])

.controller('TeamListCtrl', ['$scope', '$stateParams', 'storage', '$state', '$filter', 'authorizer', 'serverApi', '$http', 'mapService',
                             function($scope, $stateParams, storage, $state, $filter, authorizer, serverApi, $http, mapService) {

	$scope.loggedIn = function() {
		return authorizer.loggedIn();
	}

	$scope.activeUserId = authorizer.getUser() != null ? authorizer.getUser().id : -1;

	// make sure we are directly at the right tab ('own' or 'all')
	$scope.tabs = { activeTab: $stateParams.activeTab ? $stateParams.activeTab: 'all' };

	$scope.newEmail = { text: ''};

	$scope.teams = [];

	$scope.$watch('tabs.activeTab', function() {
		$scope.editing = false;
		$scope.teams = [];
		getTeams();
	});

	$scope.teamOrder = 'name';

	// get teams
	function getTeams() {
		if ($scope.tabs.activeTab == 'all') {
			storage.getAllTeams(function(teams) {
				$scope.teams = teams;
			});
		} else {
			storage.getOwnTeams(function(teams) {
				$scope.teams = teams;
			});
		};
	}

	$scope.createNewTeam = function() {
		$scope.editTeam({
			id: -1,
			name: '',
			description: '',
			admins: [authorizer.getUser()],
			emails: [],
			location: {},
			foundingDate: '',
			rosters: [],
			url: '',
			facebookUrl: '',
			twitterName: '',
			contactEmail: '',
		});

	};

	$scope.editTeam = function(team) {
		$scope.editing = true;

		$scope.teamToEdit = angular.copy(team);
	};

	$scope.saveTeam = function(team) {
		$scope.addAdmin($scope.newAdmin);
		$scope.addEmail($scope.newEmail);

		storage.saveTeam(team, function(ownTeams) {
			console.log("own teams", ownTeams);
			$scope.teams = ownTeams;
			$scope.editing = false;
		}, $scope.tabs.activeTab);

	};

	$scope.cancel = function() {
		$scope.teamToEdit = {};
		$scope.editing = false;
	}

	$scope.addAdmin = function(newAdmin) {
		if (isEmpty(newAdmin)) {
			return;
		}

		if (!angular.isObject(newAdmin)) {
			return;
		}

		// check if admin is already in the list
		var alreadyAdmin = false;
		angular.forEach($scope.teamToEdit.admins, function(admin) {
			if (admin.id == newAdmin.id) {
				alreadyAdmin = true;
			}
		});

		if (!alreadyAdmin) {
			$scope.teamToEdit.admins.push(newAdmin);
		}

		$scope.newAdmin = '';
	}

	$scope.removeAdmin = function(adminId) {
		var indexToRemove = -1;
		angular.forEach($scope.teamToEdit.admins, function(admin, idx) {
			if (admin.id == adminId) {
				indexToRemove = idx;
			}
		});

		if (indexToRemove >= 0) {
			$scope.teamToEdit.admins.splice(indexToRemove, 1);
		}
	}

	$scope.addEmail = function(emailForm, newEmail) {
		if (isEmpty(newEmail) || isEmpty(newEmail.text)) {
			return;
		}
		newEmail = newEmail.text;

		if (!emailForm.$valid) {
			return;
		}

		var alreadyEmail = false;
		angular.forEach($scope.teamToEdit.emails, function(email) {
			if (email == newEmail) {
				alreadyEmail = true;
			}
		});

		if (!alreadyEmail) {
			$scope.teamToEdit.emails.push(newEmail);
		}

		$scope.newEmail = {};
	}

	$scope.removeEmail = function(emailToRemove) {
		var indexToRemove = -1;
		angular.forEach($scope.teamToEdit.emails, function(email, idx) {
			if (email == emailToRemove) {
				indexToRemove = idx;
			}
		});

		if (indexToRemove >= 0) {
			$scope.teamToEdit.emails.splice(indexToRemove, 1);
		}
	}

	// return user proposals
	$scope.getUsers = function(userName) {
		if (userName.length < 4) {
			return [];
		}

		return serverApi.getUserProposals(userName, function(result) {
			angular.forEach(result, function(user) {
				if (angular.isObject(user.dfvPlayer)) {
					user.fullName = user.dfvPlayer.firstName + ' ' + user.dfvPlayer.lastName;
				} else {
					user.fullName = user.email;
				}
			});
			return result;
		});
	};

	$scope.deleteTeam = function(team) {
		console.log("delete?", alert("Do you really want to delete this team?"));
	}

	// return location-proposals from mapbox api
	$scope.getLocations = function(locationName) {
		if (locationName.length < 4) {
			return [];
		}

		return mapService.getLocations(locationName, 'city', function(res) {
			return res;
		});
	};

	$scope.locationMatching = function() {
		return true;
	};

}]);
