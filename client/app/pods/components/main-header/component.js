import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['main-header'],
  actions: {
    toggleMenu() {
      this.sendAction('toggleMenu');
    }
  }
});
