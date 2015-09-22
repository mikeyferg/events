import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    return this.get('session').fetch().then(function() {
      console.log('session fetched');
    }, function() {
      console.log('no session to fetch');
    });
  },

  actions: {
    signInViaFacebook() {
      var route = this;
      this.get('session').open('facebook-connect').then(function(auth) {
        Ember.Logger.debug("auth", auth);
        route.transitionTo('/');
      }, function() {
        Ember.Logger.debug('auth failed');
      });
    },
    logout() {
      this.get('session').close();
    },
    toggleMenu() {
      $('#js-navigation-menu').slideToggle(function(){
        if($('#js-navigation-menu').is(':hidden')) {
          $('#js-navigation-menu').removeAttr('style');
        }
      });
    }
  }
});
