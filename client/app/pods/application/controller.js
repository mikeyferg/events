import Ember from 'ember';

export default Ember.Controller.extend({
  headerTitle: '',
  isMenuEnabled: false,

  menuModifier: Ember.computed('isMenuEnabled', function() {
    if (this.get('isMenuEnabled')) {
      return 'Canvas--menuEnabled';
    }
  })
});
