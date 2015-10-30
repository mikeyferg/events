import Ember from 'ember';

export default Ember.Controller.extend({
  eventsController: Ember.inject.controller('city.events'),

  myValueDidChange : function() {
    this.get('eventsController').set('free', this.get('free'));
  }.observes('free'),

  actions: {
    resetAllFilters() {
      this.get('eventsController').set('page', 1);
      this.get('eventsController').set('date_range', null);
      this.get('eventsController').set('cost', null);
      this.get('eventsController').set('free', false);
    },
    filterByDate(filterBy) {
      this.get('eventsController').set('page', 1);
      this.get('eventsController').set('date_range', filterBy);
    },
    filterByCost(filterBy) {
      this.get('eventsController').set('page', 1);
      if (this.get('eventsController').get('cost') === 'Free') {
        this.get('eventsController').set('cost', null);
      } else {
        this.get('eventsController').set('cost', 'Free');
      }
    }
  }
});
