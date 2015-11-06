import Ember from 'ember';
import config from '../../config/environment';
import ConnectWithFacebook from './connect-with-facebook';
import moment from 'moment';

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

export default Ember.Route.extend(ConnectWithFacebook, {
  moment: Ember.inject.service(),
  beforeModel() {
    this._super(...arguments);
    this.get('moment').changeTimeZone('America/Los_Angeles');
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
        that.get('session').currentUser = result.user;
      });
    }, function() {
      console.log('No session to fetch');
    });
  },

  afterModel() {
    console.log("Done");
    window.prerenderReady = true;
  },

  actions: {
    logout() {
      this.get('session').close();
      this.transitionTo('/');
    },

    toggleMenu() {
      Ember.$('#js-navigation-menu').slideToggle(function(){
        if(Ember.$('#js-navigation-menu').is(':hidden')) {
          Ember.$('#js-navigation-menu').removeAttr('style');
        }
      });
    }
  }
});
