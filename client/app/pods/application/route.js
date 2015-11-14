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

  actions: {
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
    }
  }
});
