import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    return this.get('session').fetch().then(function() {
      console.log('session fetched');
    }, function() {
      console.log('no session to fetch');
    });
  },

  actions: {
    signInViaFacebook: function() {
      var route = this;
      this.get('session').open('facebook-connect').then(function(auth) {
        Ember.Logger.debug("auth", auth);
        route.transitionTo('/');
      }, function() {
        Ember.Logger.debug('auth failed');
      });
    },
    logout: function() {
      this.get('session').close();
    }
  }
});
