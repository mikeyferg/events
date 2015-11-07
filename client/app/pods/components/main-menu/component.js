import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'header',
  classNames: 'navigation',
  role: 'asdf',

  actions: {
    logout: function() {
      this.sendAction('logout');
    },

    signInViaFacebook: function() {
      this.sendAction('signInViaFacebook');
    },

    toggleMenu: function() {
      this.sendAction('toggleMenu');
    },

    disableMenu: function() {
      this.sendAction('disableMenu');
    }
  }
});
