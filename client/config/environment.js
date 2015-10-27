/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    modulePrefix: 'client',
    podModulePrefix: 'client/pods',
    googleFonts: [
      'Open+Sans:300',
      'Roboto:300'
    ],
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    ENV.APP.LOG_TRANSITIONS = true;
    ENV.apiHostname = '//localhost:3900',
    // ENV.apiHostname = '//coyote-api-staging.herokuapp.com',
    ENV.contentSecurityPolicy = {
      'default-src': "none",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' https://*.googleapis.com https://*.gstatic.com www.facebook.com connect.facebook.net graph.facebook.com",
      'font-src': "'self' *.gstatic.com",
      'connect-src': "'self' ws://0.0.0.0:49152 localhost:3900 coyote-api-staging.herokuapp.com ws://localhost:49152 http://localhost:3000 https://facebook.com www.facebook.com connect.facebook.net",
      'img-src': "'self' data: https://*.googleapis.com https://*.gstatic.com http://static.spin.com squaredancemagazine.com www.facebook.com raw.githubusercontent.com https://fbcdn-profile-a.akamaihd.net www.sfstation.com s3.amazonaws.com",
      'style-src': "'self' 'unsafe-inline' *.googleapis.com",
      'media-src': "'self'",
      'frame-src': "static.ak.facebook.com s-static.ak.facebook.com www.facebook.com https://facebook.com"
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'staging') {
    ENV.apiHostname = '//coyote-api-staging.herokuapp.com',
    ENV.contentSecurityPolicy = {
      'default-src': "none",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' https://*.googleapis.com https://*.gstatic.com www.facebook.com connect.facebook.net graph.facebook.com",
      'font-src': "'self' https://*.gstatic.com",
      'connect-src': "'self' ws://0.0.0.0:49152 ws://localhost:49152 coyote-api-staging.herokuapp.com https://facebook.com www.facebook.com connect.facebook.net",
      'img-src': "'self' data: https://*.googleapis.com https://*.gstatic.com http://static.spin.com squaredancemagazine.com www.facebook.com raw.githubusercontent.com https://fbcdn-profile-a.akamaihd.net",
      'style-src': "'self' 'unsafe-inline' https://*.googleapis.com",
      'media-src': "'self'",
      'frame-src': "static.ak.facebook.com s-static.ak.facebook.com www.facebook.com https://facebook.com"
    };
  }

  if (environment === 'production') {
    ENV.apiHostname = '//event-coyote-api.herokuapp.com',
    ENV.contentSecurityPolicy = {
      'default-src': "none",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' https://*.googleapis.com https://*.gstatic.com www.facebook.com connect.facebook.net graph.facebook.com",
      'font-src': "'self' https://*.gstatic.com",
      'connect-src': "'self' ws://0.0.0.0:49152 ws://localhost:49152 event-coyote-api.herokuapp.com https://facebook.com www.facebook.com connect.facebook.net",
      'img-src': "'self' data: https://*.googleapis.com https://*.gstatic.com http://static.spin.com squaredancemagazine.com www.facebook.com raw.githubusercontent.com https://fbcdn-profile-a.akamaihd.net",
      'style-src': "'self' 'unsafe-inline' https://*.googleapis.com",
      'media-src': "'self'",
      'frame-src': "static.ak.facebook.com s-static.ak.facebook.com www.facebook.com https://facebook.com"
    };
  }

  ENV.torii = {
    sessionServiceName: 'session',
    providers: {
      'facebook-connect': {
        appId: '1035793029772432',
        version: 'v2.4',
        locale: 'en_US',
        scope: 'email',
        returnScopes: true
      }
    }
  }

  return ENV;
};
