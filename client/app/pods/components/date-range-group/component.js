import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['button-group'],

  actions: {
    dateRangeChanged(value) {
      this.sendAction('dateRangeChanged', value);
    }
  }
})
