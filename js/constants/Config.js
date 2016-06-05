import SecretConfig from './SecretConfig';

export default {
  // Auth
  TEST_USER_ID: SecretConfig.TEST_USER_ID,
  TEST_SECRET: SecretConfig.TEST_SECRET,
  // Google
  GOOGLE: 'google',
  GOOGLE_IOS_CLIENT_ID: SecretConfig.GOOGLE_IOS_CLIENT_ID,
  GOOGLE_WEB_CLIENT_ID: SecretConfig.GOOGLE_WEB_CLIENT_ID,

  // Highscore
  HIGHSCORE_LIMIT: 100000,

  // Kort API
  SERVER: 'https://kort-dev.herokuapp.com',
  PROD_SERVER: 'https://kort.herokuapp.com',
  DEV_SERVER: 'https://kort-dev.herokuapp.com',
  API_PATH: '/server/webservices',
  ANSWER_PATH: '/answer',
  HIGHSCORE_PATH: '/highscore',
  HIGHSCORE_ABSOLUTE_PATH: '/highscore/absolute',
  HIGHSCORE_RELATIVE_PATH: '/highscore/relative',
  MISSION_PATH: '/mission',
  MISSION_PUTPATH: '/mission/fix',
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
  MISSIONS_LIMIT: 10,
  VALIDATIONS_LIMIT: 1000,
  RADIUS: 5000,

  // Modal View taskTypes
  SELECT: 'select',
  TEXT: 'text',
};
