import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'nav',

  actions: {
    logout: function() {
      this.sendAction('logout');
    },

    toggleMenu: function() {
      this.sendAction('toggleMenu');
    },

    disableMenu: function() {
      this.sendAction('disableMenu');
    }
  }
});
