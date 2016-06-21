/* eslint-disable spaced-comment, max-len */

const German = {
  // Main View (TabPanel)
  tab_map: 'Karte',
  tab_bugmap: 'Aufträge',
  tab_validation: 'Prüfen',
  tab_highscore: 'Highscore',
  tab_profile: 'Profil',
  tab_about: 'Über Kort',
  tab_news: 'News',

  // Login
  login_kort_description_1: 'Löse Aufträge',
  login_kort_description_2: 'Sammle Koins',
  login_kort_description_3: 'Verbessere OpenStreetMap',
  login_kort_introduction_1: 'Kort soll dazu beitragen die Daten in OpenStreetMap zu verbessern.',
  login_kort_introduction_2: 'Dazu werden dir auf der Karte Fehler in Form von Aufträgen angezeigt. Durch das Lösen solcher Aufträge erhältst du Koins und kannst Auszeichnungen gewinnen.',
  login_kort_introduction_3: 'Gelöste Aufträge können dann wiederum von anderen Spielern überprüft werden, um deren Korrektheit zu bestätigen. Sobald ein Lösungsvorschlag genügend positive Bewertungen erhalten hat, ist er bereit, um zu OpenStreetMap zurückgeschrieben zu werden.',
  login_kort_introduction_4: 'Logge dich jetzt ein, um damit zu beginnen\!',
  login_oauth_providers: 'Weitere Provider werden noch hinzugefügt.',
  login_button_google: 'Login mit Google',
  login_button_osm: 'Login mit OpenStreetMap',
  login_button_facebook: 'Login mit Facebook',
  login_loadmask_message: 'Login...',

  // Firststeps
  firststeps_introduction: 'Willkommen bei Kort\! Wähle einen Benutzernamen\:',
  firststeps_form_button_submit: 'Mission beginnen\!',
  firststeps_alert_username_empty_title: 'Benutzernamen eingeben',
  firststeps_alert_username_empty_message: 'Bitte gib einen Benutzernamen ein.',
  firststeps_alert_username_specialchars_title: 'Zeichenproblem',
  firststeps_alert_username_specialchars_message: 'Verwende bitte nur Buchstaben und Zahlen für deinen Benutzernamen.',
  firststeps_alert_submit_failure_title: 'Fehler beim Senden',
  firststeps_alert_submit_failure_message: 'Ups\! Beim Übertragen deines Benutzernamens ist etwas schief gelaufen. Eventuell hilft ein Neustart der App.',

  // Geolocation error',
  geolocationerror_introduction: 'Um Kort verwenden zu können, muss auf deine Position zugegriffen werden können.',
  geolocationerror_button_reload: 'Applikation neu laden',
  geolocationerror_loadmask_message: 'Lade App neu...',

  //Map
  map_title: 'Aufträge',
  map_loadmask_message: 'Lade Aufträge...',
  map_mission_promotionmessagebox_close: 'Schliessen',
  map_mission_promotionmessagebox_earn: 'Hol dir zusätzliche {{extra_coins}} Koins',
  map_mission_promotionmessagebox_date: '{{startdate}} bis {{enddate}}',
  map_mission_missionmessagebox_koins_earn: 'Verdiene dir {{fix_koin_count}} Koins',
  map_mission_missionmessagebox_koins_earnpromotion: 'Verdiene dir {{fix_koin_count}} + {{extra_coins}} Koins',
  map_mission_missionmessagebox_yes: 'Beantworten',
  map_mission_missionmessagebox_no: 'Weiss nicht',
  map_mission_missionmessagebox_close: 'Schliessen',
  map_mission_layername: 'Aufträge',
  map_missionInactive_layername: 'Inaktive Aufträge',
  map_validation_layername: 'Überprüfungen',
  map_validation_validationmessagebox_koins_earn: 'Verdiene dir {{validation_koin_count}} Koins',
  map_validation_validationmessagebox_koins_earnpromotion: 'Verdiene dir {{validation_koin_count}} + {{extra_coins}} Koins',
  map_mission_validationmessagebox_yes: 'Beantworten',
  map_mission_validationmessagebox_no: 'Weiss nicht',
  map_mission_validationmessagebox_close: 'Schliessen',
  map_validation_validationmessagebox_checkit: 'Überprüfe die Lösung',

  //// Fix
  fix_form_title: 'Auftrag',
  fix_form_koins_earn: 'Hol dir die {{fix_koin_count}} Koins\!',
  fix_form_koins_earnpromotion: 'Hol dir die {{fix_koin_count}} + {{extra_coins}} Koins\!',
  fix_form_message_placeholder: 'Deine Antwort...',
  fix_form_button_showonmap: 'Auf der Karte anzeigen',
  fix_form_button_submit: 'Auftrag abschliessen',
  fix_form_loadmask_message: 'Lade Antworten...',
  fix_form_falsepositive_toggle_label: 'Nicht lösbar',
  fix_map_title: 'Karte',
  fix_sendmask_message: 'Sende Lösung...',
  fix_alert_fixfield_empty_title: 'Felder ausfüllen',
  fix_alert_fixfield_empty_message: 'Bitte alle Felder ausfüllen.',
  fix_alert_submit_failure_title: 'Fehler beim Senden',
  fix_alert_submit_failure_message: 'Ups\! Beim Übertragen der Lösung ist etwas schief gelaufen. Eventuell hilft ein Neustart der App.',

  //// Vote
  vote_falsepositive_question: 'Es wurde angegeben, dass es keine Lösung zu dieser Frage gibt. Ist dies korrekt?',
  vote_container_button_answer: 'Beantworten',
  vote_container_votes_left: '{{votes_left}} Bewertungen nötig',
  vote_answeractionsheet_button_accept: 'Ja',
  vote_answeractionsheet_button_decline: 'Nein',
  vote_answeractionsheet_button_cancel: 'Weiss nicht',
  vote_answeractionsheet_question: 'Ist die Antwort korrekt?',
  vote_sendmask_message: 'Sende Antwort...',
  vote_alert_submit_failure_title: 'Fehler beim Senden',
  vote_alert_submit_failure_message: 'Ups\! Beim Übertragen deiner Antwort ist etwas schief gelaufen. Eventuell hilft ein Neustart der App.',

  // Highscore
  highscore_title: 'Highscore',
  highscore_absolute_tabtitle: 'Top',
  highscore_relative_tabtitle: 'Meine Platzierung',
  highscore_loadmask_message: 'Lade Highscore...',
  highscore_emptytext: 'Highscore kann nicht geladen werden.',
  highscore_you: 'Das bist du\!',
  highscore_koins: 'Koins',
  highscore_fixcount: 'Aufträge\:',
  highscore_votecount: 'Prüfungen\:',
  highscore_user_badges_emptytext: 'Die Auszeichnungen konnten nicht geladen werden.',

  // Profil
  profile_title: 'Profil',
  profile_button_logout: 'Logout',
  profile_button_changeusername: 'Benutzername ändern',
  profile_settings_messagebox_title: 'Einstellungen',
  profile_settings_messagebox_message: 'Gib deinen neuen Benutzernamen ein',
  profile_username_loadmask_message: 'Benutzername wird gespeichert',
  profile_content_username: 'Benutzername',
  profile_content_oauthprovider: 'Eingeloggt über',
  profile_content_fixes: 'Erledigte Aufträge',
  profile_content_votes: 'Getätigte Überprüfungen',
  profile_content_koins_header: 'Gesammelte Koins',
  profile_content_koins_title: 'Koins',
  profile_content_ranking_title: 'Platz',
  profile_content_badges_header: 'Gewonnene Auszeichnungen',
  profile_logout_loadmask_message: 'Logout...',
  profile_refresh_loadmask_message: 'Lade Profil...',
  profile_badges_title: 'Deine Auszeichnungen',
  profile_badges_recieved: 'Erhalten am\:',
  profile_badges_emptytext: 'Deine Auszeichnungen konnten nicht geladen werden.',
  profile_badges_button_close: 'Schliessen',
  profile_alert_username_empty_title: 'Benutzernamen eingeben',
  profile_alert_username_empty_message: 'Bitte gib einen Benutzernamen ein.',
  profile_alert_username_specialchars_title: 'Zeichenproblem',
  profile_alert_username_specialchars_message: 'Verwende bitte nur Buchstaben und Zahlen für deinen Benutzernamen.',
  profile_alert_submit_failure_title: 'Fehler beim Senden',
  profile_alert_submit_failure_message: 'Ups\! Beim Übertragen deines Benutzernamens ist etwas schief gelaufen. Eventuell hilft ein Neustart der App.',

  //News
  news_title: 'News',
  news_unread: 'Ungelesen',
  news_read: 'Gelesen',
  news_list_emptytext: 'Derzeit keine News',
  news_updated: 'Publiziert am',
  news_settings_save: 'Speichern',
  news_settings_cancel: 'Abbrechen',
  news_settings_acceptNoLanguage: 'Keine auswählen',
  news_settings_acceptAllLanguages: 'Alle auswählen',
  news_settings_label: 'Die News welcher Sprache möchtest du erhalten?',

  // About
  about_title: 'Über',
  about_version_title: 'Version',
  about_information_title: 'Weitere Informationen',
  about_information_homepage: 'Webseite\:',
  about_information_feedback: 'Feedback/FAQ\:',
  about_information_bugs: 'Fehler melden\:',
  about_developers_title: 'Entwickler',
  about_project_title: 'Projekte',
  about_project_advisor: 'Leitung\:',
  about_credits_title: 'Credits',
  about_credits_partner: 'Partner\:',
  about_credits_mapdata: 'Geodaten\:',
  about_credits_tiledata: 'Kartenkacheln\:',
  about_credits_markers: 'Marker Icons\:',
  about_credits_translation: 'Übersetzung\:',
  about_credits_dbhosting: 'DB Hosting\:',
  about_legal_title: 'Rechtliche Hinweise\:',
  about_legal_message: 'Halte die Richtlinien von OpenStreetMap ein und verwende z.B. keine urheberrechtlich geschützten Quellen ohne Erlaubnis.',

  // Error
  error_title_default: 'Ein Fehler ist aufgetreten',
  error_message_default: 'Versuch es nochmals oder starte die App neu.',

  // PullRefresh Plugin
  pullrefresh_pullrefresh: 'Zum Aktualisieren herunterziehen',
  pullrefresh_releaserefresh: 'Zum Aktualisieren loslassen...',
  pullrefresh_loading: 'wird aktualisiert...',
  pullrefresh_lastupdated: 'Zuletzt aktualisiert\:',

  // ListPaging Plugin
  listpaging_loadmore: 'Weitere Einträge laden...',
  listpaging_nomorerecords: 'Keine weiteren Einträge vorhanden.',

  // Button
  button_back: 'Zurück',

  // MessageBox
  messagebox_ok: 'OK',
  messagebox_yes: 'Ja',
  messagebox_no: 'Nein',
  messagebox_cancel: 'Abbrechen',

  // Picker
  picker_done: 'Fertig',
  picker_cancel: 'Abbrechen',

  // Reward
  reward_alert_title: 'Dein Ansehen ist gestiegen\!',
  reward_alert_koins_new: 'Bravo\! Du hast {{koin_count_new}} Koins gewonnen.',
  reward_alert_koins_total: 'Deine Gesamtpunktzahl beträgt nun {{koin_count_total}} Koins.',
  reward_alert_badges_title: 'Gewonnene Auszeichnungen',

  // App update
  update_title: 'Neue App-Version',
  update_message: 'Die App wurde auf die neuste Version aktualisiert. App neu laden?',

  //Languages
  en: 'Englisch',
  de: 'Deutsch',
  it: 'Italienisch',
  fr: 'Französisch',
  sl: 'Slowenisch',
  hr: 'Kroatisch',
  cs: 'Tschechisch',
  nl: 'Holländisch',
  gl: 'Galizisch',
  pt: 'Portugiesisch',
  ro: 'Rumänisch',
  ja: 'Japanisch',
  ca: 'Katalanisch',
  es: 'Spanisch',

  //////////////////////////////////////////////////////////////
  // Labels used directly in source files (without Ext_i18n_Bundle plugin)
  //////////////////////////////////////////////////////////////

  // index_html
  //// App startscreen
  startscreen_loadingtext: 'Kort wird geladen. Gleich gehts los...',
  startscreen_browsererror: 'Dein Browser wird leider noch nicht unterstützt. Kort ist optimiert für den Betrieb auf mobilen Geräten. Versuch es doch damit.',

  // app/util/Config_js
  //// Firststeps',
  firststeps_form_username_placeholder: 'Benutzername',

  //// PullRefresh Plugin
  pullrefresh_dateformat: 'd_m_Y H\:i\:s',
};

export default German;
