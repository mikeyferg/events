import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['page', 'cost', 'date_range', 'free'],
  page: 1,
  date_range: null,
  cost: null,
  free: false,

  myValueDidChange : function() {
    this.set('free', this.get('free'));
  }.observes('free'),

  actions: {
    resetAllFilters() {
      this.set('page', 1);
      this.set('date_range', null);
      this.set('cost', null);
      this.set('free', false);
    },
    filterByDate(filterBy) {
      this.set('page', 1);
      this.set('date_range', filterBy);
    },
    filterByCost(filterBy) {
      this.set('page', 1);
      if (this.get('cost') === 'Free') {
        this.set('cost', null);
      } else {
        this.set('cost', 'Free');
      }
    }
  }
});
