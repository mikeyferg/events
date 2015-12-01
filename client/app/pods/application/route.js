import Ember from 'ember';
import config from '../../config/environment';
import ConnectWithFacebook from './connect-with-facebook';
import reloadMyAccount from '../user/reload/mixin';

// Add css class to body
Ember.Route.reopen({
  activate: function() {
    var cssClass = this.toCssClass();
    if (cssClass !== 'application') {
      Ember.$('body').addClass(cssClass);
    }
  },
  deactivate: function() {
    Ember.$('body').removeClass(this.toCssClass());
  },
  toCssClass: function() {
    return this.routeName.replace(/\./g, '-').dasherize();
  }
});

Ember.RSVP.configure('onerror', function(e) {
  console.log(e.message);
  console.log(e.stack);
});

export default Ember.Route.extend(ConnectWithFacebook, reloadMyAccount, {
  beforeModel() {
    this._super(...arguments);
    let that = this;
    const path = `${config.apiHostname}/users/me`;
    return this.get('session').fetch().then(function() {
      console.log('session fetched');
      Ember.$.ajax({
        url: path,
        'headers': {'Authorization': that.get('session.accessToken')},
        'type': 'GET',
        'contentType': 'application/json'
      }).then((result) => {
        let myAccount = that.reloadMyAccount();
      });
    }, function() {
      console.log('No session to fetch');
    });
  },

  handleGenericError(error, transition) {
    Ember.Logger.error(error);
    transition.abort();
    this.controllerFor('application').set('savedTransition', transition);
    // Without this, it's impossible to figure out errors during development
    if (config.environment !== 'development') {
      this.transitionTo('application-error');
    }
  },

  actions: {
    willTransition: function(transition) {
      // alert(transition.intent.name);
      if (transition.intent.name === 'cities') {
        this.controllerFor('city.events').reset();
        this.controllerFor('city').reset();
      }
    },

    logout() {
      this.get('session').close();
      this.transitionTo('/');
    },

    toggleMenu() {
      this.set('controller.isMenuEnabled', !this.get('menuEnabled'));
    },
    disableMenu() {
      this.set('controller.isMenuEnabled', false);
    },
    disableModal() {
      this.set('controller.isModalVisible', false);
      this.set('controller.isMenuEnabled', false);
    },
    enableModal() {
      this.set('controller.isModalVisible', true);
    },
    goBack() {
      console.log("going back");
      window.history.go(-1);
    },

    searchEvents(searchInput) {
      console.log("Search input", searchInput);
      this.controllerFor('city.events').set('search', searchInput);
      this.transitionTo('city.events', 'sf', 'events');
    },

    resumeSavedTransition() {
      const transition = this.controller.get('savedTransition');

      if (transition) {
        this.controller.set('savedTransition', null);
        transition.retry();
      } else {
        this.transitionTo('/');
      }
    },

    error(error, transition) {
      this._super(...arguments);
      console.log("Error captured", error, transition);

      if (error.isHandled) {
        return;
      }

      if (Ember.isPresent(error.errors)) {
        const firstError = error.errors[0];

        this.controllerFor('application').set('headerTitle', 'Error');

        if (parseInt(firstError.status, 10) === 404 || firstError.code === 'RECORD_NOT_FOUND') {
          transition.abort();
          error.isHandled = true;
          this.replaceWith('not-found');
        }
      }

      if (!transition.isAborted) {
        this.handleGenericError(error, transition);
      }
    }
  }
});
