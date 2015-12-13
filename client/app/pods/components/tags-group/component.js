import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['button-group'],

  actions: {
    selectCategory(categorySelected) {
      this.sendAction('selectCategory', categorySelected);
    }
  }
})
