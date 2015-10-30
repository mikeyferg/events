import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    dateRangeChanged(value) {
      this.sendAction('dateRangeChanged', value);
    }
  }
});
