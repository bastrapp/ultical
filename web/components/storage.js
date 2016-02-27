/*
 * ultical Copyright (C) 2016 ultical developers
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful
 * but WITHOUT ANY WARRANTY; without even the implied warranty
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301  USA
 */

'use strict';

var app = angular.module('ultical');

app.factory('storage', ['$filter', 'serverApi', 'authorizer', 'moment',
                        function($filter, serverApi, authorizer, moment) {

	var returnObject = {
			// init structures
			selected: {
				event: {},
			},

			own: {
				teams: [],
			},
			events: [],
			teams: [],
			seasons: [],

			formatsByEventIndexed: {},
			teamsIndexed: {},
			playerIndexed: {},

			getEmptyEvent: function() {
				return createEmptyEvent();
			},

			getEmptyEdition: function() {
				return createEmptyEdition();
			},

			getEmptyFormat: function() {
				return createEmptyFormat();
			},

			getTeam: function(teamId, callback) {
				var that = this;
				serverApi.getTeam(teamId, function(team) {
					storeTeam(team, newLoopIndex());
					callback(team);
				});
			},

			getAllTeams: function(callback) {
				var that = this;
				callback(that.teams);
				serverApi.getAllTeams(function(teams) {
					that.teams = teams;

					var loopIndex = newLoopIndex();
					angular.forEach(teams, function(team) {
						storeTeam(team, loopIndex);
					});
					callback(that.teams);
				});
			},

			getOwnTeams: function(callback) {
				var that = this;
				callback(that.own.teams);
				serverApi.getOwnTeams(function(teams) {
					that.own.teams = teams;
					var loopIndex = newLoopIndex();
					angular.forEach(teams, function(team) {
						storeTeam(team, loopIndex);
					});
					callback(that.own.teams);
				});
			},

      deleteTeam: function(team, callback, errorCallback) {
        var that = this;
        serverApi.deleteTeam(team.id, function() {
          delete that.teamsIndexed[team.id];

          var teamIndexToDelete = -1;
          angular.forEach(that.teams, function(oneTeam, idx) {
            if (oneTeam.id == team.id) {
              teamIndexToDelete = idx;
            }
          });
          if (teamIndexToDelete >= 0) {
            that.teams.splice(teamIndexToDelete, 1);
          }
          var ownTeamIndexToDelete = -1;
          angular.forEach(that.own.teams, function(oneTeam, idx) {
            if (oneTeam.id == team.id) {
              ownTeamIndexToDelete = idx;
            }
          });
          if (ownTeamIndexToDelete >= 0) {
            that.own.teams.splice(ownTeamIndexToDelete, 1);
          }
          callback();
        }, errorCallback);
      },

			saveRoster: function(roster, team, callback, errorCallback) {
				serverApi.postRoster(roster, team.id, callback, errorCallback);
			},

			deleteRoster: function(roster, team, callback, errorCallback) {
				serverApi.deleteRoster(roster, function() {
					var rosterDeleteIdx = -1;
					angular.forEach(team.rosters, function(teamRoster, idx) {
						if (teamRoster.id == roster.id) {
							rosterDeleteIdx = idx;
						}
					});
					if (rosterDeleteIdx >= 0) {
						team.rosters.splice(rosterDeleteIdx, 1);
					}
					callback();
				}, errorCallback);
			},

			removePlayerFromRoster: function(player, roster, callback, errorCallback) {
				var that = this;
				serverApi.removePlayerFromRoster(player, roster, function() {
					var idxToRemove = -1;
					angular.forEach(roster.players, function(rosterPlayer, idx) {
						if (rosterPlayer.player.id == player.id) {
							idxToRemove = idx;
						}
					});
					if (idxToRemove != -1) {
						roster.players.splice(idxToRemove, 1);
					}
					callback();
				}, errorCallback);
			},

			addPlayerToRoster: function(player, roster, callback, errorCallback) {
				var that = this;
				serverApi.addPlayerToRoster(player, roster, function(newPlayer) {
					that.playerIndexed[newPlayer.id] = newPlayer;
					var today = new Date();
					var rosterPlayer = {
							player: newPlayer,
							dateAdded: moment().format('YYYY-MM-DD'),
					};
					roster.players.push(rosterPlayer);
					callback(rosterPlayer);
				}, errorCallback);
			},

			getSeasons: function(callback) {
				var that = this;
				if (isEmpty(this.seasons)) {
					serverApi.getSeasons(function(seasons) {
						that.seasons = seasons;
					});
				} else {
					callback(this.seasons);
				}
			},

			getFormatForEvent: function(eventId, callback) {
				var that = this;

				if (eventId in this.formatsByEventIndexed) {
					callback(this.formatsByEventIndexed[eventId]);
				}
				serverApi.getFormatByEvent(eventId, function(data) {
					storeTournamentFormat(data, newLoopIndex());
					that.formatsByEventIndexed[eventId] = data;
					callback(data);
				});
			},

			getEvent: function(eventId, callback) {
				var that = this;

				serverApi.getEvent(eventId, function(data) {
					storeEvent(data, newLoopIndex());
					callback(data);
				});
			},

			getEvents: function(callback) {
				var that = this;
				callback(this.events);

				// make API call
				serverApi.getEvents(function(data) {
					that.events = data;

					var loopIndex = newLoopIndex();

					// add some fields
					angular.forEach(data, function(event) {
						storeEvent(event, loopIndex);
					});

					callback(that.events);
				});
			},

			registerTeamForEdition: function(teamReg, divisionReg, callback) {
				serverApi.registerTeamForEdition(teamReg, divisionReg, function(newTeamReg) {
					divisionReg.registeredTeams.push(newTeamReg);
					callback(newTeamReg);
				});
			},

			saveTeam: function(team, callback, errorCallback, activeList) {
				var that = this;
				var oldTeam;
				if (team.id == -1) {
					oldTeam = null;
				} else {
					oldTeam = team;
					if (!angular.isObject(team.location)) {
						team.location = {
								id: oldTeam.location.id,
								version: oldTeam.location.version,
						}
					}
				}
				serverApi.saveTeam(team, oldTeam, function(savedTeam) {
					that.teamsIndexed[team.id] = savedTeam;
					var index = -1;
					angular.forEach(that.own.teams, function(ownTeam, idx) {
						if (ownTeam.id == savedTeam.id) {
							index = idx;
						}
					});
					if (index >= 0) {
						that.own.teams.splice(index, 1);
					}
					that.own.teams.push(savedTeam);

					index = -1;
					angular.forEach(that.teams, function(existingTeam, idx) {
						if (existingTeam.id == savedTeam.id) {
							index = idx;
						}
					});
					if (index >= 0) {
						that.teams.splice(index, 1);
					}
					that.teams.push(savedTeam);

					storeTeam(savedTeam, newLoopIndex());

					if (activeList == 'own') {
						callback(that.own.teams);
					} else if (activeList == 'all') {
						callback(that.teams);
					}
				}, errorCallback);
			},
	}

	function newLoopIndex() {
		return Math.floor(Math.random()*10000);
	}

	function storeWithoutLoops(element, loopIndex) {
		// to avoid loops only process every element once
		if (element == null || ('x' in element && element.x.loopIndex == loopIndex)) {
			return false;
		}

		element.x = {loopIndex: loopIndex};

		return true;
	}

	function storeTeam(team, loopIndex) {
		if (!storeWithoutLoops(team, loopIndex)) {
			return;
		}

		if (!isEmpty(team.emails)) {
			team.emails = team.emails.split(',');
		} else {
			team.emails = [];
		}

		angular.forEach(team.admins, function(admin, idx) {
			storeUser(admin, loopIndex);
			team.x.own = authorizer.getUser() != null && (team.x.own || admin.id == authorizer.getUser().id);
		});

		storeClub(team.club, loopIndex);

		angular.forEach(team.rosters, function(roster, idx) {
			storeRoster(roster, loopIndex);
		});
	}

	function storeRoster(roster, loopIndex) {
		if (!storeWithoutLoops(roster, loopIndex)) {
			return;
		}

		angular.forEach(roster.players, function(player, idx) {
			storePlayer(player.player, loopIndex);
		});
	}

	function storeUser(user, loopIndex) {
		if (!storeWithoutLoops(user, loopIndex)) {
			return;
		}

		storePlayer(user.dfvPlayer, loopIndex);
	}

	function storePlayer(player, loopIndex) {
		if (!storeWithoutLoops(player, loopIndex)) {
			return;
		}

		storeClub(player.club, loopIndex);

	}

	function storeClub(club, loopIndex) {
		if (!storeWithoutLoops(club, loopIndex)) {
			return;
		}

		storeAssociation(club.association, loopIndex);
	}

	function storeAssociation(association, loopIndex) {
		if (!storeWithoutLoops(association, loopIndex)) {
			return;
		}

		angular.forEach(association.admins, function(admin, idx) {
			storeUser(admin, loopIndex);
			association.x.own = authorizer.getUser() != null && (association.x.own || admin.id == authorizer.getUser().id);
		});

		storeUser(association.contact, loopIndex);
	}

	function storeContact(contact, loopIndex) {
		if (!storeWithoutLoops(contact, loopIndex)) {
			return;
		}
	}

	function storeEvent(event, loopIndex) {
		if (!storeWithoutLoops(event, loopIndex)) {
			return;
		}

		storeTournamentEdition(event.tournamentEdition, loopIndex);

		storeContact(event.localOrganizer, loopIndex);

		// get main location
		event.x.mainLocation = {};
		angular.forEach(event.locations, function(location) {
			if (location.main || isEmpty(event.x.mainLocation)) {
				event.x.mainLocation = location;
			}
		});

		angular.forEach(event.admins, function(admin, idx) {
			storeUser(admin, loopIndex);
			event.x.own = authorizer.getUser() != null && (event.x.own || admin.id == authorizer.getUser().id);
		});

		event.x.own = authorizer.getUser() != null && (event.x.own ||  event.tournamentEdition.tournamentFormat.x.own);

		event.x.isSingleEvent = event.tournamentEdition.isSingleEdition;
		event.x.hasLocalOrganizer = !isEmpty(event.localOrganizer) && !isEmpty(event.localOrganizer.name) && event.tournamentEdition.organizer.id != event.localOrganizer.id;
		event.x.hasFees = event.tournamentEdition.fees.length > 0 || event.fees.length > 0;

		var today = moment();
		if (moment(event.startDate).isAfter(today)) {
			event.x.timing = 'future';
		} else if (moment(event.endDate).isBefore(today)) {
			event.x.timing = 'past';
		} else {
			event.x.timing = 'running';
		}

		// assign the divisions (and maybe teams) that play this event
		event.x.divisions = [];

		if ('divisionConfirmations' in event && !isEmpty(event.divisionConfirmations)) {
			angular.forEach(event.divisionConfirmations, function(divisionConfirmation) {
				var division = angular.copy(divisionConfirmation.divisionRegistration);

				// if individual assignment is set to false, all teams/players of the registration will play
				if (divisionConfirmation.individualAssignment) {
					division.playingTeams = divisionConfirmation.teams;
				} else {
					// we take all teams of the divisionRegistration
					division.playingTeams = division.registeredTeams;
				}
				event.x.divisions.push(angular.copy(division));
			});
		} else {
			// this event gets all divisions and teams from the edition
			if (isEmpty(event.tournamentEdition.divisionRegistrations)) {
				event.x.divisions = [];
			} else {
				event.x.divisions = angular.copy(event.tournamentEdition.divisionRegistrations);
				angular.forEach(event.x.divisions, function(division) {
					division.playingTeams = division.registeredTeams;
				});

			}
		}
	}

	function storeTournamentEdition(edition, loopIndex) {
		if (!storeWithoutLoops(edition, loopIndex)) {
			return;
		}

		angular.forEach(edition.events, function(event, idx) {
			event.tournamentEdition = edition;
			storeEvent(event, loopIndex);
		});

		storeTournamentFormat(edition.tournamentFormat, loopIndex);

		storeContact(edition.organizer, loopIndex);

		angular.forEach(edition.divisionRegistrations, function(divReg, idx) {
			storeDivReg(divReg, loopIndex);
		});

		edition.x.isSingleEdition = edition.events != null && edition.events.length == 1;

		var todayDateString = moment().format('YYYY-MM-DD');

		edition.x.registrationIsOpen = !isEmpty(edition.registrationStart) && edition.registrationStart  <= todayDateString && edition.registrationEnd >= todayDateString;
		edition.x.registrationTime = isEmpty(edition.registrationStart) ? 'never' : (edition.registrationStart > todayDateString ? 'future' : 'past');
	}

	function storeDivReg(divReg, loopIndex) {
		// divRegs are unique to editions

		angular.forEach(divReg.registeredTeams, function(teamReg, idx) {
			storeTeamRegistration(teamReg, loopIndex);
		});
	}

	function storeTeamRegistration(teamReg, loopIndex) {
		storeTeam(teamReg.team, loopIndex);
	}

	function storeTournamentFormat(format, loopIndex) {
		if (!storeWithoutLoops(format, loopIndex)) {
			return;
		}

		angular.forEach(format.admins, function(admin, idx) {
			storeUser(admin, loopIndex);
			format.x.own = authorizer.getUser() != null && (format.x.own || admin.id == authorizer.getUser().id);
		});

		angular.forEach(format.editions, function(edition, idx) {
			edition.tournamentFormat = format;
			storeTournamentEdition(edition, loopIndex);
		});

		storeAssociation(format.association, loopIndex);
	}

	function createEmptyEvent() {
		return {
			matchdayNumber: -1,
			location: {},
			startDate: '2016-01-01',
			endDate: '2016-01-03',
			fees: {},
			admins: [],
			localOrganizerName: '',
			localOrganizerEmail: '',
			localOrganizerPhone: '',
			divisionConfirmations: {},
			tournamentEdition: {},
		};
	}

	function createEmptyEdition() {
		return {
			alternativeName: '',
			season: {
				year: 2016,
				surface: 'TURF',
				plusOneYear: false,
			},
			registrationStart: '',
			registrationEnd: '',
			fees: {},
			currency: 'EUR',
			organizerName: '',
			organizerEmail: '',
			organizerPhone: '',
			alternativeMatchdayName: '',
			divisionRegistrations: [],
			events: [],
			tournamentFormat: {},
		};
	};

	function createEmptyFormat() {
		return {
			name: '',
			description: '',
			admins: [],
			editions: [],
		};
	};

	return returnObject;

}]);
