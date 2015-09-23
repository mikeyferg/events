import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'nav',

  actions: {
    logout: function() {
      this.sendAction('logout');
    },

    signInViaFacebook: function() {
      this.sendAction('signInViaFacebook');
    },

    toggleMenu: function() {
      this.sendAction('toggleMenu');
    }
  }
});
