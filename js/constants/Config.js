/* eslint-disable max-len */

import SecretConfig from './SecretConfig';

export default {
  // Auth
  TEST_USER_ID: SecretConfig.TEST_USER_ID,
  TEST_SECRET: SecretConfig.TEST_SECRET,
  // Google
  GOOGLE: 'google',
  GOOGLE_IOS_CLIENT_ID: SecretConfig.GOOGLE_IOS_CLIENT_ID,
  GOOGLE_WEB_CLIENT_ID: SecretConfig.GOOGLE_WEB_CLIENT_ID,

  // Errors
  ERROR_GET_ALL_ANSWERS: 'Error when trying to load all answers.',
  ERROR_GET_ANSWERS_FOR_TYPE: 'Error when trying to load answers for specific type.',
  ERROR_GET_HIGHSCORE: 'Error when trying to load highscore.',
  ERROR_GET_MISSIONS: 'Error when trying to load missions.',
  ERROR_GET_STATISTICS: 'Error when trying to load statistics.',
  ERROR_GET_USER: 'Error when trying to load user.',
  ERROR_GET_USER_BADGES: 'Error when trying to load user badges.',
  ERROR_GET_VALIDATIONS: 'Error when trying to load missions.',
  ERROR_GET_PROMOTIONS: 'Error when trying to load promotions.',
  ERROR_LOCATION_DENIED: 'Location could not be loaded because user denied permission.',
  ERROR_LOG_OUT_USER: 'Error when trying to log out user.',
  ERROR_POSITION_UNAVAILABLE: 'The acquisition of the geolocation failed because at least one internal source of position returned an internal error or the time allowed to acquire the geolocation was exceeded.',
  ERROR_POST_MISSION: 'Error when trying to submit a solved mission.',
  ERROR_UPDATE_USER: 'Error when trying to update user.',
  ERROR_VERIFY_USER: 'Error when trying to verify user.',

  // Highscore
  HIGHSCORE_LIMIT: 7435885969,
  HIGHSCORE_PREFETCH_LIMIT: 10,

  // Kort
  KORT_VERSION: '0.2',
  KORT_GITHUB: 'https://github.com/kort/kort-reloaded',
  KORT_USERVOICE: 'kort.uservoice.com',
  KORT_WEBSITE: 'www.kort.ch',

  // Kort API
  SERVER: 'https://kort.herokuapp.com',
  PROD_SERVER: 'https://kort.herokuapp.com',
  DEV_SERVER: 'https://kort-dev.herokuapp.com',
  API_PATH: '/server/webservices',
  ANSWER_PATH: '/answer',
  HIGHSCORE_PATH: '/highscore',
  HIGHSCORE_ABSOLUTE_PATH: '/highscore/absolute',
  HIGHSCORE_RELATIVE_PATH: '/highscore/relative',
  MISSION_PATH: '/mission',
  MISSION_POST_PATH: '/mission/fix',
  MISSIONS_GET_PATH: '/mission/position',
  VALIDATION_PATH: '/validation',
  VALIDATION_POST_PATH: '/validation/vote',
  VALIDATIONS_GET_PATH: '/validation/position',
  PROMOTION_PATH: '/promotion',
  STATISTICS_PATH: '/statistics',
  USER_PATH: '/user',
  USER_VERIFY_PATH: '/user/verify',

  // Location
  LOCATION_DISTANCE_FILTER: 100,

  // Mapbox
  MAP_REF: 'OpenStreetMap',
  STYLE_URL: 'https://raw.githubusercontent.com/osm2vectortiles/mapbox-gl-styles/master/styles/bright-v9-cdn.json',
  ZOOM_LEVEL: 13,
  MAPBOX_ACCESS_TOKEN: SecretConfig.MAPBOX_ACCESS_TOKEN,

  // Storage
  STORAGE_KEY_USER_ID: 'LoggedInUserId',
  STORAGE_KEY_SECRET: 'LoggedInSecret',

  // Store
  CHANGE_EVENT: 'change',

  // String Definitions
  // Task Type
  TASK_TYPE_MOTORWAY_REF: 'motorway_ref',
  TASK_TYPE_RELIGION: 'religion',
  TASK_TYPE_POI_NAME: 'poi_name',
  TASK_TYPE_MISSING_MAXSPEED: 'missing_maxspeed',
  TASK_TYPE_LANGUGAGE_UNKNOWN: 'language_unknown',
  TASK_TYPE_MISSING_TRACK_TYPE: 'missing_track_type',
  TASK_TYPE_WAY_WITHOUT_TAGS: 'way_wo_tags',
  TASK_TYPE_MISSING_CUISINE: 'missing_cuisine',

  // Tasks
  MISSIONS_LIMIT: 7,
  VALIDATIONS_LIMIT: 50,
  RADIUS: 5000,

  // Modal View taskTypes
  SELECT: 'select',
  TEXT: 'text',
};
