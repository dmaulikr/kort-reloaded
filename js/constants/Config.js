import SecretConfig from './SecretConfig';

export default {
  // Auth
  TEST_USER_ID: SecretConfig.TEST_USER_ID,
  TEST_SECRET: SecretConfig.TEST_SECRET,
  // Google
  GOOGLE_WEB_CLIENT_ID: SecretConfig.GOOGLE_WEB_CLIENT_ID,

  // Kort API
  SERVER: 'https://kort-dev.herokuapp.com',
  PROD_SERVER: 'https://kort.herokuapp.com',
  DEV_SERVER: 'https://kort-dev.herokuapp.com',
  API_PATH: '/server/webservices',
  HIGHSCORE_PATH: '/highscore',
  HIGHSCORE_ABSOLUTE_PATH: '/highscore/absolute',
  HIGHSCORE_RELATIVE_PATH: '/highscore/relative',
  MISSIONS_PATH: '/mission',
  MISSIONS_GET_PATH: '/mission/position',
  VALIDATIONS_PATH: '/validation',
  VALIDATIONS_GET_PATH: '/validation/position',
  USER_PATH: '/user',
  USER_VERIFY_PATH: '/user/verify',

  // Mapbox
  MAP_REF: 'OpenStreetMap',
  STYLE_URL: 'https://raw.githubusercontent.com/osm2vectortiles/mapbox-gl-styles/master/styles/bright-v9-cdn.json',
  ZOOM_LEVEL: 13,
  MAPBOX_ACCESS_TOKEN: SecretConfig.MAPBOX_ACCESS_TOKEN,

  // Store
  CHANGE_EVENT: 'change',

  // Tasks
  MISSIONS_LIMIT: 10,
  VALIDATIONS_LIMIT: 100,
  RADIUS: 5000,
};
