var TRANSLATIONS_DE = {

		general: {
			pageTitle: 'DFV-Turniere',
			dateFormat : "dd.MM.yyyy",
			dateFormatShort: "dd.MM.yy",
			datetimeFormat : "dd.MM.yy - HH:mm",
			na: 'Noch keine Informationen',
			close: 'schließen',
			email: 'Email',
			phone: 'Telefon',
			optional: 'optional',
			save: 'Speichern',
			cancel: 'Abbrechen',
			create: 'Erstellen',
			done: 'Fertig',
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
					title: 'Fehler bei der Registrierung',
					passwordsNotEqual: 'Die Passwörter stimmen nicht überein',
					validation_error: 'Das Passwort muss mindestens 10 Zeichen lang sein.',
					not_found: 'Ein Eintrag mit diesem Namen und Geburtstag konnte in der DFV Datenbank nicht gefunden werden.',
					ambiguous: 'Es existieren mehrere Einträge mit den gleichen Namen, Geburtstag und Emailadresse. Bitte wende dich an support@ultical.de.',
					email_not_found: 'Deine Emailadresse konnte nicht verifiziert werden. Bitte gib unten in dem neuen Feld die Emailadresse an, mit der du in deinem Verein gemeldet bist.',
					no_dfv_email: 'Du hast keine Emailadresse beim DFV hinterlegt. Bitte wende dich an die Verantwortlichen Stellen in deinem Verein.',
					email_already_taken: 'Diese Emailadresse wird bereits benutzt. Bitte wähle eine andere.',
					user_already_registered: 'Du bist bereits registriert. Bitte benutze den Login Button. Dort kannst du auch ein neues Passwort anfordern.',
				},
				success: {
					title: 'Registrierung erfolgreich',
					confirmationEmail: 'Eine Email mit einem Bestätigungslink wurde an {{ email }} verschickt. Sobald du deine Adresse bestätigt hast, kannst du dich einloggen.',
					dfvEmail: 'Außerdem wurde eine Email an deine beim DFV hinterlegte Adresse ({{ dfvEmail }}) gesendet. Bitte bestätige auch diese.',
				},
			},
			firstname: 'Vorname',
			lastname: 'Nachname',
			email: 'Emailadresse',
			dob: 'Geburtsdatum',
			password: 'Passwort',
			passwordCheck: 'Passwort wiederholen',
		},

		emailCode: {
			noCodeTitle: 'Ungültiger Link',
			noCodeforgotPw: 'Der benutzte Link ist abgelaufen (er ist 3 Stunden gültig) oder er wurde schon einmal benutzt. Bitte fordere einen neuen Code an',
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
			registrationIsOverSince: 'ist vorbei seit',
			registrationStartsAt: 'beginnt am',
			registrationEndsAt: 'endet am',
			registrationUndefined: 'Es gibt noch keine Informationen zur Anmeldung',
			organizer: 'Veranstalter',
			localOrganizer: 'Ausrichter',
			feesEventLabel: 'Kosten',
			feesLeagueLabel: 'Kosten (für alle Termine)',
			feesMatchdayLabel: 'Kosten für diesen',
			feePerTeam: 'Teamfee',
			feePerPlayer: 'Playersfee',
			feePerGuest: 'Pro Gast',
			feePerBreakfast: 'Pro Frühstück',
			feePerLunch: 'Pro Mittagessen',
			feePerDinner: 'Pro Abendessen',
			feePerNight: 'Pro Nacht',
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
				empty: 'Noch keine Spieler hinzugefügt',
				removeTooltip: 'Roster entfernen',
				editTooltip: 'Roster bearbeiten',
				confirmDelete: 'Soll dieses Roster wirklich gelöscht werden?',
				newPlayerPlaceholder: 'Name des Spielers',
				playerAlreadyInRoster: 'Dieser Spieler ist bereits in einem Roster für diese Saison und Division gemeldet',
				playerWrongGender: 'Dieser Spieler ist aufgrund des angegebenen Geschlechts in dieser Division nicht startberechtigt.',
				removePlayerTooltip: 'Spieler aus Roster entfernen',
				player: 'Spieler',
				players: 'Spieler',
				notLoggedIn: 'Spieler sind nur für angemeldete Benutzer sichtbar',
			},
			edit: {
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
				twitterNameLabel: 'Twitter',
				twitterNamePlaceholder: 'Twittername',
				facebookUrlLabel: 'Facebook',
				facebookUrlPlaceholder: 'https://www.facebook.com/...',
				locationCityLabel: 'Stadt/Land',
			},
			remove: {
				tooltip: 'Team löschen',
			},
			confirmDelete: 'Soll dieses Team wirklich gelöscht werden? Dieser Vorgang kann nicht rückgängig gemacht werden!',
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
		}
};
