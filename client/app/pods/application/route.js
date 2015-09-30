import Ember from 'ember';
import config from '../../config/environment';
import ConnectWithFacebook from './connect-with-facebook';

export default Ember.Route.extend(ConnectWithFacebook, {
  beforeModel() {
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
