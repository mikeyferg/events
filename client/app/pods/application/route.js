import Ember from 'ember';
import ConnectWithFacebook from './connect-with-facebook';

export default Ember.Route.extend(ConnectWithFacebook, {
  beforeModel() {
    return this.get('session').fetch().then(function() {
      console.log('session fetched');
    }, function() {
      console.log('no session to fetch');
    });
  },

  actions: {
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
