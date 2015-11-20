import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['main-header'],
  menuLevel: true,

  actions: {
    toggleMenu() {
      this.sendAction('toggleMenu');
    },
    goBack() {
      this.sendAction('goBack');
    }
  }
});
