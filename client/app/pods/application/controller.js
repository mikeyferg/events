import Ember from 'ember';

export default Ember.Controller.extend({
  headerTitle: '',
  isMenuEnabled: false,
  isModalVisible: false,

  menuModifier: Ember.computed('isMenuEnabled', function() {
    if (this.get('isMenuEnabled')) {
      return 'frame--menuEnabled';
    }
  }),

  modalModifier: Ember.computed('isModalVisible', function() {
    if (this.get('isModalVisible')) {
      return 'frame--modalEnabled';
    }
  })
});
