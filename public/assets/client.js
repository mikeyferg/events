"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('client/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'client/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('client/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'client/config/environment'], function (exports, AppVersionComponent, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = AppVersionComponent['default'].extend({
    version: version,
    name: name
  });

});
define('client/components/refills-accordion-item', ['exports', 'ember', 'ember-cli-refills-components/components/refills-accordion-item'], function (exports, Ember, RefillsAccordionItem) {

	'use strict';

	exports['default'] = RefillsAccordionItem['default'];

});
define('client/components/refills-accordion-tabs-item', ['exports', 'ember', 'ember-cli-refills-components/components/refills-accordion-tabs-item'], function (exports, Ember, RefillsAccordionTabsItem) {

	'use strict';

	exports['default'] = RefillsAccordionTabsItem['default'];

});
define('client/components/refills-accordion-tabs', ['exports', 'ember', 'ember-cli-refills-components/components/refills-accordion-tabs'], function (exports, Ember, RefillsAccordionTabs) {

	'use strict';

	exports['default'] = RefillsAccordionTabs['default'];

});
define('client/components/refills-accordion', ['exports', 'ember', 'ember-cli-refills-components/components/refills-accordion'], function (exports, Ember, RefillsAccordion) {

	'use strict';

	exports['default'] = RefillsAccordion['default'];

});
define('client/components/refills-centered-navigation', ['exports', 'ember', 'ember-cli-refills-components/components/refills-centered-navigation'], function (exports, Ember, RefillsCenteredNavigation) {

	'use strict';

	exports['default'] = RefillsCenteredNavigation['default'];

});
define('client/components/refills-dropdown-item', ['exports', 'ember', 'ember-cli-refills-components/components/refills-dropdown-item'], function (exports, Ember, RefillsDropdownItem) {

	'use strict';

	exports['default'] = RefillsDropdownItem['default'];

});
define('client/components/refills-dropdown', ['exports', 'ember', 'ember-cli-refills-components/components/refills-dropdown'], function (exports, Ember, RefillsDropdown) {

	'use strict';

	exports['default'] = RefillsDropdown['default'];

});
define('client/components/refills-expandable', ['exports', 'ember', 'ember-cli-refills-components/components/refills-expandable'], function (exports, Ember, RefillsExpandable) {

	'use strict';

	exports['default'] = RefillsExpandable['default'];

});
define('client/components/refills-sliding-menu', ['exports', 'ember', 'ember-cli-refills-components/components/refills-sliding-menu'], function (exports, Ember, RefillsSlidingMenu) {

	'use strict';

	exports['default'] = RefillsSlidingMenu['default'];

});
define('client/components/refills-vertical-tabs-item', ['exports', 'ember', 'ember-cli-refills-components/components/refills-vertical-tabs-item'], function (exports, Ember, RefillsVerticalTabsItem) {

	'use strict';

	exports['default'] = RefillsVerticalTabsItem['default'];

});
define('client/components/refills-vertical-tabs', ['exports', 'ember', 'ember-cli-refills-components/components/refills-vertical-tabs'], function (exports, Ember, RefillsVerticalTabs) {

	'use strict';

	exports['default'] = RefillsVerticalTabs['default'];

});
define('client/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('client/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('client/helpers/format-currency', ['exports'], function (exports) {

    'use strict';

    exports['default'] = Ember.Helper.helper(function (params) {
        var value = params[0],
            dollars = Math.floor(value / 100),
            cents = value % 100,
            sign = '$';

        if (cents.toString().length === 1) {
            cents = '0' + cents;
        }

        if (parseInt(value) == 0) {
            return "Free";
        } else {
            return '' + sign + dollars + '.' + cents;
        }
    });

});
define('client/helpers/moment-duration', ['exports', 'ember-moment/helpers/moment-duration'], function (exports, moment_duration) {

	'use strict';



	exports['default'] = moment_duration['default'];

});
define('client/helpers/moment-format', ['exports', 'ember', 'client/config/environment', 'ember-moment/helpers/moment-format'], function (exports, Ember, config, Helper) {

  'use strict';

  exports['default'] = Helper['default'].extend({
    globalOutputFormat: Ember['default'].get(config['default'], 'moment.outputFormat'),
    globalAllowEmpty: !!Ember['default'].get(config['default'], 'moment.allowEmpty')
  });

});
define('client/helpers/moment-from-now', ['exports', 'ember', 'client/config/environment', 'ember-moment/helpers/moment-from-now'], function (exports, Ember, config, Helper) {

  'use strict';

  exports['default'] = Helper['default'].extend({
    globalAllowEmpty: !!Ember['default'].get(config['default'], 'moment.allowEmpty')
  });

});
define('client/helpers/moment-to-now', ['exports', 'ember', 'client/config/environment', 'ember-moment/helpers/moment-to-now'], function (exports, Ember, config, Helper) {

  'use strict';

  exports['default'] = Helper['default'].extend({
    globalAllowEmpty: !!Ember['default'].get(config['default'], 'moment.allowEmpty')
  });

});
define('client/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'client/config/environment'], function (exports, initializerFactory, config) {

  'use strict';

  var _config$APP = config['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;

  exports['default'] = {
    name: 'App Version',
    initialize: initializerFactory['default'](name, version)
  };

});
define('client/initializers/export-application-global', ['exports', 'ember', 'client/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (config['default'].exportApplicationGlobal !== false) {
      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  ;

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('client/initializers/initialize-torii-callback', ['exports', 'torii/redirect-handler'], function (exports, RedirectHandler) {

  'use strict';

  exports['default'] = {
    name: 'torii-callback',
    before: 'torii',
    initialize: function initialize(container, app) {
      app.deferReadiness();
      RedirectHandler['default'].handle(window.location.toString())['catch'](function () {
        app.advanceReadiness();
      });
    }
  };

});
define('client/initializers/initialize-torii-session', ['exports', 'torii/configuration', 'torii/bootstrap/session'], function (exports, configuration, bootstrapSession) {

  'use strict';

  exports['default'] = {
    name: 'torii-session',
    after: 'torii',

    initialize: function initialize(container) {
      if (configuration['default'].sessionServiceName) {
        bootstrapSession['default'](container, configuration['default'].sessionServiceName);
        container.injection('adapter', configuration['default'].sessionServiceName, 'torii:session');
      }
    }
  };

});
define('client/initializers/initialize-torii', ['exports', 'torii/bootstrap/torii', 'torii/configuration'], function (exports, bootstrapTorii, configuration) {

  'use strict';

  var initializer = {
    name: 'torii',
    initialize: function initialize(container, app) {
      bootstrapTorii['default'](container);
      app.inject('route', 'torii', 'torii:main');
    }
  };

  if (window.DS) {
    initializer.after = 'store';
  }

  exports['default'] = initializer;

});
define('client/pods/application/adapter', ['exports', 'client/config/environment', 'ember-data', 'ember'], function (exports, config, DS, Ember) {

  'use strict';

  exports['default'] = DS['default'].RESTAdapter.extend({
    host: config['default'].apiHostname,

    shouldBackgroundReloadRecord: function shouldBackgroundReloadRecord() {
      return false;
    },

    headers: Ember['default'].computed('session.accessToken', function () {
      var accessToken = this.get('session.accessToken'),
          headers = {};

      if (accessToken) {
        headers.Authorization = 'Token token="' + accessToken + '"';
      }
      return headers;
    })
  });

});
define('client/pods/application/connect-with-facebook', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Mixin.create({
    actions: {
      // Global connect to facebook action
      signInViaFacebook: function signInViaFacebook() {
        var _this = this;

        var session = this.get('session');

        // TODO: We need an actual display for this.
        this.controller.set('loginMessage', 'Please wait while we connect to Facebook');

        session.open('facebook-connect').then(function (auth) {
          // TODO: We need an actual display for this.
          _this.controller.set('loginMessage', 'Connecting to QuickDraft');

          // We've authorized with facebook, but we're not really authorized for the
          // purposes of this app, so we have to reset the state machine with close,
          // then log in again using the credentials we fetched out of the facebook provider.
          console.log("auth", auth);
          session.close().then(function () {
            session.open('events-facebook-connect', {
              email: auth.email,
              name: auth.name,
              picture: auth.picture,
              accessToken: auth.accessToken,
              uid: auth.uid
            }).then(function (result) {
              console.log("Logged in", result);
            })['catch'](function (xhr) {
              console.log("xhr", xhr);
              var error = undefined;

              if (xhr && xhr.responseJSON && xhr.responseJSON.error) {
                error = xhr.responseJSON.error;
              } else {
                error = 'There was an error connecting to QuickDraft. Please try again.';
              }

              // TODO: Display a modal to handle error states
              Ember['default'].Logger.error(error);
              throw new Error(error);
            });
          });
        })['catch'](function () {
          // TODO: Display a modal to handle error states
          Ember['default'].Logger.error('Connecting to facebook failed.');
          throw new Error('Connecting to facebook failed.');
        });
      }
    }
  });

});
define('client/pods/application/route', ['exports', 'ember', 'client/config/environment', 'client/pods/application/connect-with-facebook'], function (exports, Ember, config, ConnectWithFacebook) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend(ConnectWithFacebook['default'], {
    beforeModel: function beforeModel() {
      var that = this;
      var path = config['default'].apiHostname + '/users/me';
      return this.get('session').fetch().then(function () {
        console.log('session fetched');
        Ember['default'].$.ajax({
          url: path,
          'headers': { 'Authorization': that.get('session.accessToken') },
          'type': 'GET',
          'contentType': 'application/json'
        }).then(function (result) {
          that.get('session').currentUser = result.user;
        });
      }, function () {
        console.log('No session to fetch');
      });
    },

    actions: {
      logout: function logout() {
        this.get('session').close();
        this.transitionTo('/');
      },
      toggleMenu: function toggleMenu() {
        Ember['default'].$('#js-navigation-menu').slideToggle(function () {
          if (Ember['default'].$('#js-navigation-menu').is(':hidden')) {
            Ember['default'].$('#js-navigation-menu').removeAttr('style');
          }
        });
      }
    }
  });

});
define('client/pods/application/serializer', ['exports', 'ember-data'], function (exports, DS) {

	'use strict';

	exports['default'] = DS['default'].RESTSerializer.extend({});

});
define('client/pods/application/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "client/pods/application/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(fragment,2,2,contextualElement);
        morphs[2] = dom.createMorphAt(fragment,4,4,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["inline","main-menu",[],["toggleMenu","toggleMenu","signInViaFacebook","signInViaFacebook","logout","logout","session",["subexpr","@mut",[["get","session",["loc",[null,[1,98],[1,105]]]]],[],[]]],["loc",[null,[1,0],[1,107]]]],
        ["content","outlet",["loc",[null,[2,0],[2,10]]]],
        ["content","main-footer",["loc",[null,[3,0],[3,15]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/pods/components/event-card/component', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    backgroundImage: Ember['default'].computed('event.image_url', function () {
      var image_url = this.get('event.image_url');
      return image_url || 'https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/mountains.png';
    }),

    backgroundStyle: (function () {
      return new Ember['default'].Handlebars.SafeString('background-image: url(' + this.get('backgroundImage') + ');');
    }).property('event.image_url')
  });

});
define('client/pods/components/event-card/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@2.0.1",
            "loc": {
              "source": null,
              "start": {
                "line": 4,
                "column": 2
              },
              "end": {
                "line": 6,
                "column": 2
              }
            },
            "moduleName": "client/pods/components/event-card/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("p");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
            return morphs;
          },
          statements: [
            ["inline","format-currency",[["get","event.cost",["loc",[null,[5,25],[5,35]]]]],[],["loc",[null,[5,7],[5,37]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      var child1 = (function() {
        return {
          meta: {
            "revision": "Ember@2.0.1",
            "loc": {
              "source": null,
              "start": {
                "line": 8,
                "column": 2
              },
              "end": {
                "line": 10,
                "column": 2
              }
            },
            "moduleName": "client/pods/components/event-card/template.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("p");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
            return morphs;
          },
          statements: [
            ["inline","moment-format",[["get","event.start_time",["loc",[null,[9,23],[9,39]]]],"ddd MMM DD, h:mma"],[],["loc",[null,[9,7],[9,61]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@2.0.1",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 15,
              "column": 0
            }
          },
          "moduleName": "client/pods/components/event-card/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","grid-item grid-item-image");
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("h3");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("  ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("p");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("  ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","slideover");
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("p");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n  ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [0]);
          var morphs = new Array(6);
          morphs[0] = dom.createAttrMorph(element0, 'style');
          morphs[1] = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
          morphs[2] = dom.createMorphAt(element0,3,3);
          morphs[3] = dom.createMorphAt(dom.childAt(element0, [5]),0,0);
          morphs[4] = dom.createMorphAt(element0,7,7);
          morphs[5] = dom.createMorphAt(dom.childAt(element0, [9, 1]),0,0);
          return morphs;
        },
        statements: [
          ["attribute","style",["get","backgroundStyle",["loc",[null,[2,47],[2,62]]]]],
          ["content","event.name",["loc",[null,[3,6],[3,20]]]],
          ["block","if",[["get","event.cost",["loc",[null,[4,8],[4,18]]]]],[],0,null,["loc",[null,[4,2],[6,9]]]],
          ["content","event.venue",["loc",[null,[7,5],[7,20]]]],
          ["block","if",[["get","event.start_time",["loc",[null,[8,8],[8,24]]]]],[],1,null,["loc",[null,[8,2],[10,9]]]],
          ["content","event.shortSummary",["loc",[null,[12,7],[12,29]]]]
        ],
        locals: [],
        templates: [child0, child1]
      };
    }());
    return {
      meta: {
        "revision": "Ember@2.0.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 16,
            "column": 0
          }
        },
        "moduleName": "client/pods/components/event-card/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","link-to",["event",["get","event",["loc",[null,[1,19],[1,24]]]]],[],0,null,["loc",[null,[1,0],[15,12]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('client/pods/components/main-footer/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 30,
            "column": 0
          }
        },
        "moduleName": "client/pods/components/main-footer/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("footer");
        dom.setAttribute(el1,"class","footer-2");
        dom.setAttribute(el1,"role","contentinfo");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","footer-logo");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("img");
        dom.setAttribute(el3,"src","https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/placeholder_logo_1.png");
        dom.setAttribute(el3,"alt","Logo image");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","javascript:void(0)");
        var el5 = dom.createTextNode("About");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","javascript:void(0)");
        var el5 = dom.createTextNode("Contact");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","javascript:void(0)");
        var el5 = dom.createTextNode("Products");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","footer-secondary-links");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createElement("a");
        dom.setAttribute(el5,"href","javascript:void(0)");
        var el6 = dom.createTextNode("Terms and Conditions");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createElement("a");
        dom.setAttribute(el5,"href","javascript:void(0)");
        var el6 = dom.createTextNode("Privacy Policy");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3,"class","footer-social");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createElement("a");
        dom.setAttribute(el5,"href","javascript:void(0)");
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("img");
        dom.setAttribute(el6,"src","https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/facebook-logo-circle.png");
        dom.setAttribute(el6,"alt","Facebook");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n      ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createElement("a");
        dom.setAttribute(el5,"href","javascript:void(0)");
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("img");
        dom.setAttribute(el6,"src","https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/twitter-logo-circle.png");
        dom.setAttribute(el6,"alt","Twitter");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n      ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createElement("a");
        dom.setAttribute(el5,"href","javascript:void(0)");
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("img");
        dom.setAttribute(el6,"src","https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/youtube-logo-circle.png");
        dom.setAttribute(el6,"alt","YouTube");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n      ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/pods/components/main-menu/component', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    tagName: 'nav',

    actions: {
      logout: function logout() {
        this.sendAction('logout');
      },

      signInViaFacebook: function signInViaFacebook() {
        this.sendAction('signInViaFacebook');
      },

      toggleMenu: function toggleMenu() {
        this.sendAction('toggleMenu');
      }
    }
  });

});
define('client/pods/components/main-menu/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.1",
          "loc": {
            "source": null,
            "start": {
              "line": 14,
              "column": 8
            },
            "end": {
              "line": 18,
              "column": 8
            }
          },
          "moduleName": "client/pods/components/main-menu/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          dom.setAttribute(el1,"class","nav-link");
          var el2 = dom.createElement("img");
          dom.setAttribute(el2,"alt","Avatar");
          dom.setAttribute(el2,"class","user-avatar");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          dom.setAttribute(el1,"class","nav-link");
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","#");
          var el3 = dom.createTextNode("Logout");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [3]);
          var element2 = dom.childAt(element1, [0]);
          var element3 = dom.childAt(fragment, [5, 0]);
          var morphs = new Array(4);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          morphs[1] = dom.createAttrMorph(element2, 'src');
          morphs[2] = dom.createMorphAt(element1,2,2);
          morphs[3] = dom.createElementMorph(element3);
          return morphs;
        },
        statements: [
          ["content","session.currentUser.image_url",["loc",[null,[15,12],[15,45]]]],
          ["attribute","src",["get","session.currentUser.image",["loc",[null,[16,44],[16,69]]]]],
          ["inline","link-to",[["get","session.currentUser.name",["loc",[null,[16,118],[16,142]]]],"user"],[],["loc",[null,[16,108],[16,151]]]],
          ["element","action",["logout"],[],["loc",[null,[17,45],[17,64]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.1",
          "loc": {
            "source": null,
            "start": {
              "line": 18,
              "column": 8
            },
            "end": {
              "line": 20,
              "column": 8
            }
          },
          "moduleName": "client/pods/components/main-menu/template.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          dom.setAttribute(el1,"class","nav-link");
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","#");
          var el3 = dom.createTextNode("Login via Facebook");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1, 0]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [
          ["element","action",["signInViaFacebook"],[],["loc",[null,[19,43],[19,73]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@2.0.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 33,
            "column": 0
          }
        },
        "moduleName": "client/pods/components/main-menu/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("header");
        dom.setAttribute(el1,"class","navigation");
        dom.setAttribute(el1,"role","banner");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","navigation-wrapper");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3,"href","javascript:void(0)");
        dom.setAttribute(el3,"class","logo");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3,"href","javascript:void(0)");
        dom.setAttribute(el3,"class","navigation-menu-button");
        dom.setAttribute(el3,"id","js-mobile-menu");
        var el4 = dom.createTextNode("MENU");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("nav");
        dom.setAttribute(el3,"role","navigation");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4,"id","js-navigation-menu");
        dom.setAttribute(el4,"class","navigation-menu");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        dom.setAttribute(el5,"class","nav-link");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","navigation-tools");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4,"id","js-navigation-menu");
        dom.setAttribute(el4,"class","navigation-menu");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element4 = dom.childAt(fragment, [0, 1]);
        var element5 = dom.childAt(element4, [3]);
        var morphs = new Array(3);
        morphs[0] = dom.createElementMorph(element5);
        morphs[1] = dom.createMorphAt(dom.childAt(element4, [5, 1, 1]),0,0);
        morphs[2] = dom.createMorphAt(dom.childAt(element4, [7, 1]),1,1);
        return morphs;
      },
      statements: [
        ["element","action",["toggleMenu"],[],["loc",[null,[6,84],[6,107]]]],
        ["inline","link-to",["Events","events"],[],["loc",[null,[9,29],[9,58]]]],
        ["block","if",[["get","session.isAuthenticated",["loc",[null,[14,14],[14,37]]]]],[],0,1,["loc",[null,[14,8],[20,15]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('client/pods/components/main-poster/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 11,
            "column": 0
          }
        },
        "moduleName": "client/pods/components/main-poster/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","hero");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","hero-inner");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3,"href","");
        dom.setAttribute(el3,"class","hero-logo");
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"src","https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/placeholder_logo_1.png\n");
        dom.setAttribute(el4,"alt","Logo Image");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","hero-copy");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h1");
        var el5 = dom.createTextNode("Event Coyote");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("Find events in San Francisco");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/pods/event/model', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  var attr = DS['default'].attr;

  exports['default'] = DS['default'].Model.extend({
    address: attr('string'),
    cost: attr('number'),
    created_at: attr('date'),
    end_date: attr('string'),
    end_time: attr('date'),
    generic_time: attr('string'),
    name: attr('string'),
    image_url: attr('string'),
    start_time: attr('date'),
    start_date: attr('string'),
    summary: attr('string'),
    venue: attr('string'),

    users: DS['default'].hasMany('user', { async: true }),

    shortSummary: (function () {
      var summary = this.get('summary');
      if (summary && summary.length > 0) {
        return this.get('summary').split(' ').slice(0, 40).join(' ');
      } else {
        return '';
      }
    }).property('summary')
  });

});
define('client/pods/event/route', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model(params) {
      return this.store.find('event', params.event_id);
    }
  });

});
define('client/pods/event/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "client/pods/event/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("img");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),0,0);
        morphs[1] = dom.createAttrMorph(element0, 'src');
        morphs[2] = dom.createAttrMorph(element0, 'alt');
        morphs[3] = dom.createMorphAt(dom.childAt(fragment, [4]),0,0);
        return morphs;
      },
      statements: [
        ["content","model.name",["loc",[null,[1,4],[1,18]]]],
        ["attribute","src",["get","model.image_url",["loc",[null,[2,11],[2,26]]]]],
        ["attribute","alt",["get","model.name",["loc",[null,[2,35],[2,45]]]]],
        ["content","model.summary",["loc",[null,[3,3],[3,20]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/pods/events/index/route', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      return this.store.findAll('event');
    }
  });

});
define('client/pods/events/index/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.1",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 2
            },
            "end": {
              "line": 6,
              "column": 2
            }
          },
          "moduleName": "client/pods/events/index/template.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","event-card",[],["event",["subexpr","@mut",[["get","event",["loc",[null,[5,23],[5,28]]]]],[],[]]],["loc",[null,[5,4],[5,30]]]]
        ],
        locals: ["event"],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@2.0.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 0
          }
        },
        "moduleName": "client/pods/events/index/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","grid-items");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2]),1,1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","main-poster",["loc",[null,[1,0],[1,15]]]],
        ["block","each",[["get","model",["loc",[null,[4,10],[4,15]]]]],[],0,null,["loc",[null,[4,2],[6,11]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('client/pods/user/model', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    name: DS['default'].attr('string'),
    email: DS['default'].attr('string'),
    image: DS['default'].attr('string'),

    events: DS['default'].hasMany('event', { async: true })
  });

});
define('client/pods/user/route', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      if (!this.get('session.accessToken')) {
        this.transitionTo('/');
      }
    },

    model: function model() {
      var oauth_token = this.get('session.accessToken');
      return this.store.queryRecord('user', { filter: { oauth_token: oauth_token } });
    }
  });

});
define('client/pods/user/template', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "client/pods/user/template.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("img");
        dom.setAttribute(el1,"class","user-avatar");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode(" - ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(5);
        morphs[0] = dom.createAttrMorph(element0, 'src');
        morphs[1] = dom.createAttrMorph(element0, 'alt');
        morphs[2] = dom.createMorphAt(fragment,2,2,contextualElement);
        morphs[3] = dom.createMorphAt(fragment,4,4,contextualElement);
        morphs[4] = dom.createMorphAt(fragment,6,6,contextualElement);
        return morphs;
      },
      statements: [
        ["attribute","src",["concat",[["get","model.image",["loc",[null,[1,12],[1,23]]]]]]],
        ["attribute","alt",["concat",[["get","model.name",["loc",[null,[1,34],[1,44]]]]]]],
        ["content","model.name",["loc",[null,[1,72],[1,86]]]],
        ["content","model.email",["loc",[null,[1,89],[1,104]]]],
        ["content","outlet",["loc",[null,[2,0],[2,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/router', ['exports', 'ember', 'client/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('events', { path: '/' }, function () {
      this.route('new');
    });

    this.route('event', { path: '/events/:event_id' });

    this.route('user');
  });

  exports['default'] = Router;

});
define('client/templates/components/refills-accordion-item', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "client/templates/components/refills-accordion-item.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("a");
        dom.setAttribute(el1,"class","js-accordion-trigger");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),0,0);
        morphs[1] = dom.createMorphAt(fragment,2,2,contextualElement);
        return morphs;
      },
      statements: [
        ["content","title",["loc",[null,[1,32],[1,41]]]],
        ["content","yield",["loc",[null,[2,0],[2,9]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/templates/components/refills-accordion-tabs-item', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 0
          }
        },
        "moduleName": "client/templates/components/refills-accordion-tabs-item.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("a");
        dom.setAttribute(el1,"class","tab-link");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","tab-content");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2]),1,1);
        return morphs;
      },
      statements: [
        ["content","header",["loc",[null,[1,20],[1,30]]]],
        ["content","yield",["loc",[null,[3,2],[3,11]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/templates/components/refills-accordion-tabs', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "client/templates/components/refills-accordion-tabs.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("ul");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(2);
        morphs[0] = dom.createElementMorph(element0);
        morphs[1] = dom.createMorphAt(element0,1,1);
        return morphs;
      },
      statements: [
        ["element","bind-attr",[],["class","minimal:accordion-tabs-minimal:accordion-tabs"],["loc",[null,[1,4],[1,71]]]],
        ["content","yield",["loc",[null,[2,2],[2,11]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/templates/components/refills-accordion', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "client/templates/components/refills-accordion.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("ul");
        dom.setAttribute(el1,"class","accordion");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),1,1);
        return morphs;
      },
      statements: [
        ["content","yield",["loc",[null,[2,2],[2,11]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/templates/components/refills-centered-navigation', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 12,
            "column": 0
          }
        },
        "moduleName": "client/templates/components/refills-centered-navigation.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("header");
        dom.setAttribute(el1,"class","centered-navigation");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","centered-navigation-wrapper");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3,"class","mobile-logo");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"src","images/placeholder_logo_3_dark.png");
        dom.setAttribute(el4,"alt","Logo image");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3,"class","centered-navigation-menu-button");
        var el4 = dom.createTextNode("MENU");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3,"class","centered-navigation-menu");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 1, 5]),1,1);
        return morphs;
      },
      statements: [
        ["content","yield",["loc",[null,[8,6],[8,15]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/templates/components/refills-dropdown-item', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "client/templates/components/refills-dropdown-item.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","display_name",["loc",[null,[1,0],[1,16]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/templates/components/refills-dropdown', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 0
          }
        },
        "moduleName": "client/templates/components/refills-dropdown.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","dropdown");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","dropdown-container");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3,"class","dropdown-description");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3,"class","dropdown-button");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3,"class","dropdown-menu dropdown-select");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]),0,0);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [5]),1,1);
        return morphs;
      },
      statements: [
        ["content","description",["loc",[null,[3,36],[3,51]]]],
        ["content","prompt",["loc",[null,[4,31],[4,41]]]],
        ["content","yield",["loc",[null,[6,6],[6,15]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/templates/components/refills-expandable', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 0
          }
        },
        "moduleName": "client/templates/components/refills-expandable.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","expander");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"class","expander-trigger expander-hidden");
        var el3 = dom.createTextNode("Expandable section");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","expander-content");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 3]),1,1);
        return morphs;
      },
      statements: [
        ["content","yield",["loc",[null,[4,4],[4,13]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/templates/components/refills-navigation', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 45,
            "column": 0
          }
        },
        "moduleName": "client/templates/components/refills-navigation.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("header");
        dom.setAttribute(el1,"class","navigation");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","navigation-wrapper");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3,"href","javascript:void(0)");
        dom.setAttribute(el3,"class","logo");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"src","https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/placeholder_logo_1.png");
        dom.setAttribute(el4,"alt","Logo Image");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3,"href","");
        dom.setAttribute(el3,"class","navigation-menu-button");
        dom.setAttribute(el3,"id","js-mobile-menu");
        var el4 = dom.createTextNode("MENU");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","nav");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4,"id","navigation-menu");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        dom.setAttribute(el5,"class","nav-link");
        var el6 = dom.createElement("a");
        dom.setAttribute(el6,"href","javascript:void(0)");
        var el7 = dom.createTextNode("Products");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        dom.setAttribute(el5,"class","nav-link");
        var el6 = dom.createElement("a");
        dom.setAttribute(el6,"href","javascript:void(0)");
        var el7 = dom.createTextNode("About Us");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        dom.setAttribute(el5,"class","nav-link");
        var el6 = dom.createElement("a");
        dom.setAttribute(el6,"href","javascript:void(0)");
        var el7 = dom.createTextNode("Contact");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        dom.setAttribute(el5,"class","nav-link more");
        var el6 = dom.createElement("a");
        dom.setAttribute(el6,"href","javascript:void(0)");
        var el7 = dom.createTextNode("More");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("ul");
        dom.setAttribute(el6,"class","submenu");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","javascript:void(0)");
        var el9 = dom.createTextNode("Submenu Item");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","javascript:void(0)");
        var el9 = dom.createTextNode("Another Item");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        dom.setAttribute(el7,"class","more");
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","javascript:void(0)");
        var el9 = dom.createTextNode("Item with submenu");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("ul");
        dom.setAttribute(el8,"class","submenu");
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("li");
        var el10 = dom.createElement("a");
        dom.setAttribute(el10,"href","javascript:void(0)");
        var el11 = dom.createTextNode("Sub-submenu Item");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("li");
        var el10 = dom.createElement("a");
        dom.setAttribute(el10,"href","javascript:void(0)");
        var el11 = dom.createTextNode("Another Item");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n              ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n            ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("li");
        dom.setAttribute(el7,"class","more");
        var el8 = dom.createElement("a");
        dom.setAttribute(el8,"href","javascript:void(0)");
        var el9 = dom.createTextNode("Another submenu");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("ul");
        dom.setAttribute(el8,"class","submenu");
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("li");
        var el10 = dom.createElement("a");
        dom.setAttribute(el10,"href","javascript:void(0)");
        var el11 = dom.createTextNode("Sub-submenu");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n                ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("li");
        var el10 = dom.createElement("a");
        dom.setAttribute(el10,"href","javascript:void(0)");
        var el11 = dom.createTextNode("An Item");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n              ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n            ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","navigation-tools");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","search-bar");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5,"class","search-and-submit");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("input");
        dom.setAttribute(el6,"type","search");
        dom.setAttribute(el6,"placeholder","Enter Search");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("button");
        dom.setAttribute(el6,"type","submit");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("img");
        dom.setAttribute(el7,"src","https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/search-icon.png");
        dom.setAttribute(el7,"alt","Search Icon");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","javascript:void(0)");
        dom.setAttribute(el4,"class","sign-up");
        var el5 = dom.createTextNode("Sign Up");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/templates/components/refills-sliding-menu', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 0
          }
        },
        "moduleName": "client/templates/components/refills-sliding-menu.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("button");
        dom.setAttribute(el1,"type","button");
        dom.setAttribute(el1,"class","js-menu-trigger sliding-menu-button");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("img");
        dom.setAttribute(el2,"src","images/menu-white.png");
        dom.setAttribute(el2,"alt","Menu Icon");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("nav");
        dom.setAttribute(el1,"class","js-menu sliding-menu-content");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","js-menu-screen menu-screen");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [2]),1,1);
        return morphs;
      },
      statements: [
        ["content","yield",["loc",[null,[6,2],[6,11]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/templates/components/refills-vertical-tabs-item', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 0
          }
        },
        "moduleName": "client/templates/components/refills-vertical-tabs-item.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("a");
        dom.setAttribute(el1,"class","js-vertical-tab-accordion-heading vertical-tab-accordion-heading");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(fragment, [2]);
        var morphs = new Array(4);
        morphs[0] = dom.createElementMorph(element0);
        morphs[1] = dom.createMorphAt(element0,0,0);
        morphs[2] = dom.createElementMorph(element1);
        morphs[3] = dom.createMorphAt(element1,1,1);
        return morphs;
      },
      statements: [
        ["element","bind-attr",[],["rel",["get","elementId",["loc",[null,[1,92],[1,101]]]]],["loc",[null,[1,76],[1,103]]]],
        ["content","header",["loc",[null,[1,104],[1,114]]]],
        ["element","bind-attr",[],["class",":js-vertical-tab-content :vertical-tab-content elementId"],["loc",[null,[2,5],[2,83]]]],
        ["content","yield",["loc",[null,[3,2],[3,11]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/templates/components/refills-vertical-tabs', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@2.0.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 0
          }
        },
        "moduleName": "client/templates/components/refills-vertical-tabs.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","vertical-tabs-container");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","vertical-tabs");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","vertical-tab-content-container");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 3]),1,1);
        return morphs;
      },
      statements: [
        ["content","yield",["loc",[null,[5,4],[5,13]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('client/tests/app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('app.js should pass jshint', function(assert) { 
    assert.ok(true, 'app.js should pass jshint.'); 
  });

});
define('client/tests/helpers/format-currency.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/format-currency.js should pass jshint', function(assert) { 
    assert.ok(false, 'helpers/format-currency.js should pass jshint.\nhelpers/format-currency.js: line 9, col 25, Expected \'===\' and instead saw \'==\'.\nhelpers/format-currency.js: line 1, col 16, \'Ember\' is not defined.\n\n2 errors'); 
  });

});
define('client/tests/helpers/resolver', ['exports', 'ember/resolver', 'client/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('client/tests/helpers/resolver.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/resolver.js should pass jshint', function(assert) { 
    assert.ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('client/tests/helpers/start-app', ['exports', 'ember', 'client/app', 'client/config/environment'], function (exports, Ember, Application, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('client/tests/helpers/start-app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/start-app.js should pass jshint', function(assert) { 
    assert.ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('client/tests/pods/application/adapter.jshint', function () {

  'use strict';

  QUnit.module('JSHint - pods/application');
  QUnit.test('pods/application/adapter.js should pass jshint', function(assert) { 
    assert.ok(true, 'pods/application/adapter.js should pass jshint.'); 
  });

});
define('client/tests/pods/application/connect-with-facebook.jshint', function () {

  'use strict';

  QUnit.module('JSHint - pods/application');
  QUnit.test('pods/application/connect-with-facebook.js should pass jshint', function(assert) { 
    assert.ok(true, 'pods/application/connect-with-facebook.js should pass jshint.'); 
  });

});
define('client/tests/pods/application/route.jshint', function () {

  'use strict';

  QUnit.module('JSHint - pods/application');
  QUnit.test('pods/application/route.js should pass jshint', function(assert) { 
    assert.ok(true, 'pods/application/route.js should pass jshint.'); 
  });

});
define('client/tests/pods/application/serializer.jshint', function () {

  'use strict';

  QUnit.module('JSHint - pods/application');
  QUnit.test('pods/application/serializer.js should pass jshint', function(assert) { 
    assert.ok(true, 'pods/application/serializer.js should pass jshint.'); 
  });

});
define('client/tests/pods/components/event-card/component.jshint', function () {

  'use strict';

  QUnit.module('JSHint - pods/components/event-card');
  QUnit.test('pods/components/event-card/component.js should pass jshint', function(assert) { 
    assert.ok(true, 'pods/components/event-card/component.js should pass jshint.'); 
  });

});
define('client/tests/pods/components/main-menu/component.jshint', function () {

  'use strict';

  QUnit.module('JSHint - pods/components/main-menu');
  QUnit.test('pods/components/main-menu/component.js should pass jshint', function(assert) { 
    assert.ok(true, 'pods/components/main-menu/component.js should pass jshint.'); 
  });

});
define('client/tests/pods/event/model.jshint', function () {

  'use strict';

  QUnit.module('JSHint - pods/event');
  QUnit.test('pods/event/model.js should pass jshint', function(assert) { 
    assert.ok(true, 'pods/event/model.js should pass jshint.'); 
  });

});
define('client/tests/pods/event/route.jshint', function () {

  'use strict';

  QUnit.module('JSHint - pods/event');
  QUnit.test('pods/event/route.js should pass jshint', function(assert) { 
    assert.ok(true, 'pods/event/route.js should pass jshint.'); 
  });

});
define('client/tests/pods/events/index/route.jshint', function () {

  'use strict';

  QUnit.module('JSHint - pods/events/index');
  QUnit.test('pods/events/index/route.js should pass jshint', function(assert) { 
    assert.ok(true, 'pods/events/index/route.js should pass jshint.'); 
  });

});
define('client/tests/pods/user/model.jshint', function () {

  'use strict';

  QUnit.module('JSHint - pods/user');
  QUnit.test('pods/user/model.js should pass jshint', function(assert) { 
    assert.ok(true, 'pods/user/model.js should pass jshint.'); 
  });

});
define('client/tests/pods/user/route.jshint', function () {

  'use strict';

  QUnit.module('JSHint - pods/user');
  QUnit.test('pods/user/route.js should pass jshint', function(assert) { 
    assert.ok(true, 'pods/user/route.js should pass jshint.'); 
  });

});
define('client/tests/router.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('router.js should pass jshint', function(assert) { 
    assert.ok(true, 'router.js should pass jshint.'); 
  });

});
define('client/tests/test-helper', ['client/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('client/tests/test-helper.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('test-helper.js should pass jshint', function(assert) { 
    assert.ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('client/tests/torii-adapters/application.jshint', function () {

  'use strict';

  QUnit.module('JSHint - torii-adapters');
  QUnit.test('torii-adapters/application.js should pass jshint', function(assert) { 
    assert.ok(false, 'torii-adapters/application.js should pass jshint.\ntorii-adapters/application.js: line 38, col 49, Missing semicolon.\ntorii-adapters/application.js: line 39, col 7, Missing semicolon.\ntorii-adapters/application.js: line 37, col 22, \'user\' is defined but never used.\n\n3 errors'); 
  });

});
define('client/tests/torii-adapters/facebook-connect.jshint', function () {

  'use strict';

  QUnit.module('JSHint - torii-adapters');
  QUnit.test('torii-adapters/facebook-connect.js should pass jshint', function(assert) { 
    assert.ok(true, 'torii-adapters/facebook-connect.js should pass jshint.'); 
  });

});
define('client/tests/torii-providers/events-facebook-connect.jshint', function () {

  'use strict';

  QUnit.module('JSHint - torii-providers');
  QUnit.test('torii-providers/events-facebook-connect.js should pass jshint', function(assert) { 
    assert.ok(true, 'torii-providers/events-facebook-connect.js should pass jshint.'); 
  });

});
define('client/tests/unit/pods/event/model-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('event', 'Unit | Model | event', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('client/tests/unit/pods/event/model-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/pods/event');
  QUnit.test('unit/pods/event/model-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/pods/event/model-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/pods/event/route-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:event', 'Unit | Route | event', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('client/tests/unit/pods/event/route-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/pods/event');
  QUnit.test('unit/pods/event/route-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/pods/event/route-test.js should pass jshint.'); 
  });

});
define('client/tests/unit/pods/user/model-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('user', 'Unit | Model | user', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('client/tests/unit/pods/user/model-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/pods/user');
  QUnit.test('unit/pods/user/model-test.js should pass jshint', function(assert) { 
    assert.ok(true, 'unit/pods/user/model-test.js should pass jshint.'); 
  });

});
define('client/torii-adapters/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Object.extend({

    close: function close() {
      return new Ember['default'].RSVP.Promise(function (resolve) {
        localStorage.removeItem("token");
        resolve();
      });
    },

    fetch: function fetch() {
      console.log("Fetch");
      return new Ember['default'].RSVP.Promise(function (resolve, reject) {
        var accessToken = localStorage.token;

        if (accessToken) {
          resolve({ accessToken: accessToken });
        } else {
          reject();
        }
      });
    },

    open: function open(authorization) {
      console.log("open", authorization);
      return new Ember['default'].RSVP.Promise(function (resolve, reject) {
        console.log("open", authorization);
        var accessToken = authorization.user.oauth_token;

        if (accessToken) {
          localStorage.token = accessToken;
          resolve(authorization);
        } else {
          reject({ error: 'No access token recieved' });
        }
      }).then(function (user) {
        return { currentUser: authorization.user };
      });
    }
  });

});
define('client/torii-adapters/facebook-connect', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var Promise = Ember['default'].RSVP.Promise;

  exports['default'] = Ember['default'].Object.extend({

    close: function close() {
      return new Ember['default'].RSVP.Promise(function (resolve) {
        localStorage.removeItem("token");
        resolve();
      });
    },

    fetch: function fetch() {
      console.log("Fetch");
      return new Ember['default'].RSVP.Promise(function (resolve, reject) {
        var accessToken = localStorage.token;

        if (accessToken) {
          resolve({ accessToken: accessToken });
        } else {
          reject();
        }
      });
    },

    open: function open(authorization) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var accessToken = authorization.accessToken;
        if (Ember['default'].isPresent(accessToken)) {
          localStorage.token = accessToken;
        }
        console.log("This seession", _this.get('session'));
        window.FB.api('/me', 'GET', { fields: ['email', 'name', 'picture'] }, function (response) {
          if (Ember['default'].isPresent(response)) {
            console.log("id", response);
            var uid = response.id,
                email = response.email,
                _name = response.name,
                picture = response.picture.data.url;

            resolve({ accessToken: accessToken, uid: uid, email: email, name: _name, picture: picture });
          } else {
            reject({ error: 'Facebook reject our authorization request.' });
          }
        });
      });
    }

  });

});
define('client/torii-providers/events-facebook-connect', ['exports', 'ember', 'torii/providers/base', 'client/config/environment'], function (exports, Ember, Provider, config) {

  'use strict';

  exports['default'] = Provider['default'].extend({
    path: config['default'].apiHostname + '/users',

    open: function open(credentials) {
      console.log("credentials", credentials);
      var path = this.get('path'),
          userData = {
        user: {
          name: credentials.name,
          email: credentials.email,
          image: credentials.picture,
          oauth_token: credentials.accessToken,
          uid: credentials.uid
        }
      };

      return Ember['default'].$.ajax(path, {
        'data': JSON.stringify(userData),
        'type': 'POST',
        'contentType': 'application/json'
      }).then(function (result) {
        return { user: result.user };
      });
    }
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('client/config/environment', ['ember'], function(Ember) {
  var prefix = 'client';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("client/tests/test-helper");
} else {
  require("client/app")["default"].create({"LOG_TRANSITIONS":true,"name":"client","version":"v8"});
}

/* jshint ignore:end */
//# sourceMappingURL=client.map