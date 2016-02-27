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

if (undefined === TRANSLATIONS) {
	var TRANSLATIONS = {};
}
TRANSLATIONS['de'] = {

		general: {
			pageTitle: 'DFV-Turniere',
			amDateFormat: "DD.MM.YYYY",
			amDateFormatShort: "D.M.YY",
			amDatetimeFormat : "DD.MM.YYYY - HH:mm [Uhr]",
			amDateFromSameMonthShort: "D.",
			amDateFromSameMonth: "D.",
			amDateFromDiffMonthShort: "M.",
			amDateFromDiffMonth: " MMMM ",
			amDateToShort: "D.M.",
			amDateTo: "D. MMMM",
			amDateToFull: "D. MMMM YYYY",
			na: 'Noch keine Informationen',
			close: 'schließen',
			email: 'Email',
			phone: 'Telefon',
			optional: 'optional',
			save: 'Speichern',
			cancel: 'Abbrechen',
			delete: 'Löschen',
			create: 'Erstellen',
			done: 'Fertig',
			or: 'oder',
			team: 'Team',
			teams: 'Teams',
			player: 'Spieler',
			players: 'Spieler',
			currencyFormat: '{{ amount }} {{ currencySymbol }}',
			decimalSeparator: ',',
			club: 'Verein',
		},

		nav: {
			titleFlipText: 'Deutscher Frisbeesport Verband e.V.',
			login: 'Login',
			loginFail: {
				wrongCredentials: 'Email oder Passwort fehlerhaft!',
				wrongCredentialsAction: 'Passwort vergessen?',
				emailNotConfirmed: 'Email Adresse noch nicht bestätigt!',
				emailNotConfirmedAction: 'Bestätigungsemail erneut senden?',
				dfvEmailNotOptIn: 'Die Mail an die beim DFV hinterlegte Emailadresse wurde noch nicht bestätigt!',
				dfvEmailNotOptInAction: 'Mail erneut senden?',
				loginFail: 'Felher bei der Anmeldung',
			},
			loginEmailActions: {
				successTitle: 'Email erfolgreich gesendet!',
				passwordReset: 'Weitere Anweisungen, wie das Passwort zurückgesetzt werden kann findest du in der Email',
				confirmationEmailSendContent: 'Bitte bestätige den Erhalt der Email mit dem enthaltenen Link. Danach kannst du dich einloggen.',
			},
			register: 'Registrieren',
			eventDropdown: {
				label: 'Turniere',
				newEvent: 'Neues Turnier',
				listEvents: 'Turniere anzeigen',
			},
			teams: 'Teams',
			profileDropdown: {
				ownTeams: 'Meine Teams',
				ownEvents: 'Meine Turniere',
				logout: 'Abmelden',
			},
		},

		season: {
			season: 'Saison',
			indoor: 'Indoor',
			indoorFullName: 'Indoor',
			outdoor: '',
			outdoorFullName: 'Outdoor',
		},

		division: {
			u14: 'U14',
			u17: 'U17',
			u20: 'Juniors',
			u23: 'U23',
			regular: 'jedes Alter',
			masters: 'Masters',
			grandmasters: 'Grandmasters',
			open: 'Open',
			women: 'Damen',
			mixed: 'Mixed',
		},

		start: {

		},

		tournaments: {

		},

		user: {
			registration: {
				title: 'Neuen Benutzer registrieren',
				dfvLabel: 'Hinweis',
				dfvDescription: 'Nur DFV Mitglieder können sich hier registrieren. Außerdem ist es notwendig, dass du beim DFV (über deinen Verein) eine gültige Email Adresse angegeben hast.',
				register: 'Benutzer registrieren',
				dfvEmail: 'DFV Emailadresse',
				dfvEmailPlaceholder: 'Emailadresse, die beim DFV gemeldet ist',
				error: {
					title: 'Fehler bei der Registrierung!',
					passwordsNotEqual: 'Die Passwörter stimmen nicht überein',
					validation_error: 'Das Passwort muss mindestens 10 Zeichen lang sein.',
					not_found: 'Ein Eintrag mit diesem Namen und Geburtstag konnte in der DFV Datenbank nicht gefunden werden.',
					ambiguous_email: 'Es existieren mehrere Einträge mit dem gleichen Namen, Geburtstag und Emailadresse. Bitte wähle unten deinen Verein. Ist dein Verein nicht in der Liste, wende dich bitte an {{ supportEmail }}.',
					ambiguous: 'Es existieren mehrere Einträge mit dem gleichen Namen und Geburtstag. Bitte wähle unten deinen Verein. Ist dein Verein nicht in der Liste, dann bist du nicht beim DFV gemeldet bzw. hast dort keine Emailadresse angegeben. Wende dich in dem Fall an die verantwortlichen Stellen in deinem Verein.',
					no_dfv_email: 'Du hast keine Emailadresse beim DFV hinterlegt. Bitte wende dich an die verantwortlichen Stellen in deinem Verein.',
					email_already_taken: 'Diese Emailadresse wird bereits benutzt. Bitte wähle eine andere.',
					user_already_registered: 'Du bist bereits registriert. Bitte benutze den Login Button. Dort kannst du auch ein neues Passwort anfordern.',
				},
				success: {
					title: 'Registrierung erfolgreich!',
					confirmationEmail: 'Eine Email mit einem Bestätigungslink wurde an {{ email }} verschickt. Sobald du deine Adresse bestätigt hast, kannst du dich einloggen.',
					dfvEmail: 'Außerdem wurde eine Email an deine beim DFV hinterlegte Adresse ({{ dfvEmail }}) gesendet. Bitte bestätige auch diese.',
				},
			},
			firstname: 'Vorname',
			lastname: 'Nachname',
			email: 'Emailadresse',
			dob: 'Geburtsdatum',
			club: 'Verein',
			password: 'Passwort',
			passwordCheck: 'Passwort wiederholen',
		},

		emailCode: {
			noCodeTitle: 'Ungültiger Link',
			noCodeForgotPw: 'Der benutzte Link ist abgelaufen (er ist 3 Stunden gültig) oder er wurde schon einmal benutzt. Bitte fordere einen neuen Code an',
			noCodeConfirm: 'Der benutzte Link wurde schon einmal benutzt. Bitte benutze das Login Feld, um einen neuen Code anzufordern.',
			successTitle: 'Email erfolgreich bestätigt!',
			successText: 'Du kannst dich nun mit deiner Mailadresse und deinem Passwort einloggen und die Seite nutzen',
			missingEmailConfirm: 'Deine primäre Mailadresse ist allerdings noch nicht bestätigt. Bitte klicke auf den Link in der entsprechenden Email oder fordere eine neue Bestätigungsmail an (über das Login-Menü).',
			missingDfvOptIn: 'Deine beim DFV hinterlegte Mailadresse ist allerdings noch nicht bestätigt. Bitte klicke auf den Link in der entsprechenden Email oder fordere eine neue Bestätigungsmail an (über das Login-Menü).',
			changePassword: 'Passwort ändern',
			successPasswordChangedTitle: 'Passwort erfolgreich geändert',
			successPasswordChangedText: 'Du kannst dich nun mit deiner Emailadresse und dem neuen Passwort einloggen.',
		},

		event: {
			list: {
				title: 'Turniere',
			},
			matchday: 'Spieltag',
			registration: 'Anmeldung',
			registrationIsOverSince: 'ist vorbei seit dem',
			registrationStartsAt: 'beginnt am',
			registrationEndsAt: 'offen bis zum',
			registrationUndefined: 'Es gibt keine Informationen zur Anmeldung',
			register: {
				notLoggedIn: 'Bitte einloggen, um ein Team anzumelden.',
				title: 'Team anmelden',
				description: 'Um dein Team für {{ eventName }} anzumelden, fülle bitte die folgenden Felder aus. Mit Sternchen (*) gekennzeichnete Felder müssen ausgefüllt werden.',
				teamAlreadyInDivision: 'Dieses Team ist bereits in dieser Division registriert.',
				division: 'Division',
				button: 'Anmelden',
				comment: 'Nachricht',
				commentPlaceholder: 'Hinterlasse eine Nachricht an die Organisatoren, wenn du willst...',
			},
			organizer: 'Ausrichter',
			localOrganizer: 'Veranstalter vor Ort',
			linkToMaps: 'Google Maps Link',
			spotsAvailable: 'Plätze',
			spotsApplied: 'Anmeldungen',
			fee: {
				label: 'Kosten',
				team: 'Teamfee',
				player: 'Playersfee',
				guest: 'Gast',
				breakfast: 'Frühstück',
				lunch: 'Mittagessen',
				dinner: 'Abendessen',
				night: 'Nacht',
				perUnit: 'pro',
				perPerson: 'p.P.',
				editionLabel: 'Für alle Termine von',
				matchdayLabel: 'Für diesen Termin',
			},
			rosterNotFixed: 'Aktuelles Roster',
			rosterFixed: 'Roster zum Zeitpunkt des Turniers',
			printRosterNotFixed: 'Spielerlisten (offen) zum Zeitpunkt',
			printRosterFixed: 'Spielerlisten (fest) zum Zeitpunkt des Turniers',
			datePlayerAdded: 'Hinzugefügt am',
			teamList: {
				noTeams: 'Noch keine Teams angemeldet',
				title: 'Teams',
				confirmed: 'Bestätigt',
				pending: 'Angemeldet (unbestätigt)',
				waiting_list: 'Warteliste (unsortiert)',
				declined: 'Nicht dabei',
				printPlayerList: 'Spielerliste drucken',
				printAllPlayerLists: 'Spielerlisten aller Divisionen drucken',
			},
		},

		team: {
			list: {
				title: 'Teams',
				own: 'Meine Teams',
				all: 'Alle Teams',
				newTeam: 'Neues Team erstellen',
				save: 'Team speichern',
			},
			foundingDate: 'Gegründet',
			admins: 'Admins',
			roster: {
				label: 'Aktuelle Roster',
				newRoster: 'Neues Roster erstellen',
				divisionAgeLabel: 'Division',
				empty: 'Keine Spieler hinzugefügt',
				remove: 'Roster entfernen',
				editTooltip: 'Roster bearbeiten',
				confirmDelete: 'Soll dieses Roster wirklich gelöscht werden?',
				newPlayerPlaceholder: 'Name des Spielers',
				playerAlreadyInRoster: 'Dieser Spieler ist bereits in einem Roster für diese Saison und Division gemeldet',
				playerWrongGender: 'Dieser Spieler ist aufgrund des angegebenen Geschlechts in dieser Division nicht startberechtigt. Ist diese Information fehlerhaft, wende dich an euren Vereinsadmin, um die Angabe beim DFV zu korrigieren.',
				playerWrongAge: 'Dieser Spieler ist aufgrund seines Alters in dieser Division in diesem Jahr nicht spielberechtigt. Ist diese Information fehlerhaft, wende dich an euren Vereinsadmin, um die Angabe beim DFV zu korrigieren.',
				playerBlocked: 'Dieser Spieler war Teil dieses Rosters während eines offiziellen Turniers. Er ist für diese Saison festgespielt und kann nicht entfernt werden.',
				rosterBlocked: 'Dieses Roster war während eines vergangenen, offiziellen Turniers im Einsatz. Aus Dokumentationszwecken kann es nicht gelöscht werden.',
				rosterDuplicated: 'Es existiert bereits ein Roster für die gleiche Saison, Division und mit dem gleichen Bezeichner.',
				removePlayerTooltip: 'Spieler aus Roster entfernen',
				player: 'Spieler',
				players: 'Spieler',
				notLoggedIn: 'Spieler sind nur für angemeldete Benutzer sichtbar',
			},
			edit: {
				deleteTeam: 'Team löschen',
				deletionFailed: 'Dieses Team kann nicht gelöscht werden, da es für mindestens ein Turnier angemeldet war oder ist.',
				deletionConfirm: 'Soll dieses Team wirklich gelöscht werden. Alle Roster werden entfernt. Dieser Vorgang kann nicht rückgängig gemacht werden.',
				introduction: 'Um ein Team zu erstellen fülle bitte die folgenden Felder aus. In einem Team können verschiedenen Divisionen und Altersklassen gemeinsam verwaltet werden (also beispielsweise Open und Damen Teams oder U14 und U17 Teams), wenn sie unter dem gleichen Namen antreten.',
				tooltip: 'Team bearbeiten',
				nameLabel: 'Name',
				namePlaceholder: 'Teamname',
				foundingDateLabel: 'Gründungsjahr',
				descriptionLabel: 'Beschreibung',
				descriptionPlaceholder: 'Ein paar Worte zum Team...',
				adminsPlaceholder: 'Name des Benutzers',
				adminsHelp: 'Nur registrierte Benutzer dieser Seite können Admins werden',
				adminsRemoveTooltip: 'Benutzer entfernen',
				emailsLabel: 'Zusätzliche Emailadressen',
				emailsPlaceholder: 'Email',
				emailsRemoveTooltip: 'Email entfernen',
				emailsHelp: 'Nachrichten an dieses Team werden außer den Admins auch an die angegebenen Emailadressen gesendet.',
				urlLabel: 'Webseite',
				urlPlaceholder: 'www. ...',
				contactEmailLabel: 'Kontakt',
				contactEmailPlaceholder: 'Emailadresse',
				contactEmailHelp: 'Diese Adresse ist öffentlich einsehbar. Informationen von Turnierausrichtern, etc. werden an die unten angegebenen Admins und zusätzlichen Emailadressen gesendet.',
				twitterNameLabel: 'Twitter',
				twitterNamePlaceholder: 'Twittername',
				facebookUrlLabel: 'Facebook',
				facebookUrlPlaceholder: 'https://www.facebook.com/...',
				locationCityLabel: 'Stadt/Land',
				locationMissing: 'Bitte gib eine Stadt oder ein Land ein, um dein Team zuzuordnen.',
				clubLabel: 'Verein',
				clubPlaceholder: 'Name des Vereins',
			},
			remove: {
				tooltip: 'Team löschen',
			},
			confirmDelete: 'Soll dieses Team wirklich gelöscht werden? Dieser Vorgang kann nicht rückgängig gemacht werden!',
		},

		footer: {
			mainText: 'Entwickelt vom ultiCal-Team',
			emailContactText: 'Gib uns Feedback',
			gitHubBugText: 'Berichte von Bugs',
			emailSupportText: 'Stelle Fragen',
			gitHubText: 'Schau dir den Code an',
		},

		countries: {
			de: 'Deutschland',
			fr: 'Frankreich',
			ch: 'Schweiz',
			at: 'Österreich',
			nl: 'Niederlande',
			be: 'Belgien',
			dk: 'Dänemark',
			pl: 'Polen',
			it: 'Italien',
			uk: 'England',
			es: 'Spanien',
			gr: 'Griechenland',
			lu: 'Luxemburg',
			pt: 'Portugal',
			us: 'USA',
			jp: 'Japan',
			au: 'Australien',
		},

		currencySymbol: {
			EUR: '€',
			USD: '$',
			GBP: '£',
			CHF: 'CHF',
			CAD: '$',
			INR: '₹',
			AUD: '$',
			NZD: '$',
			BGN: 'лв',
			HRK: 'kn',
			CZK: 'Kč',
			DKK: 'kr.',
			HUF: 'Ft',
			ISK: 'Íkr',
			NOK: 'kr',
			PLN: 'zł',
			RON: 'lei',
			RUB: 'руб.',
			RSD: 'RSD',
			SEK: 'kr',
			TRY: 'TRY',
			UAH: '₴',
			CNY: '¥',
		},
};
TRANSLATIONS['de-at'] = TRANSLATIONS['de'];
