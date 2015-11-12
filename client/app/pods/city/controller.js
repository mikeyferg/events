import Ember from 'ember';

export default Ember.Controller.extend({
  eventsController: Ember.inject.controller('city.events'),

  // get filter values for UI on reload
  free: Ember.computed.reads('eventsController.free'),
  date_range: Ember.computed.reads('eventsController.date_range'),
  featuredEvents: Ember.computed.reads('eventsController.model.featuredEvents'),

  freeSwitchChanged : function() {
    this.get('eventsController').set('page', 1);
    this.get('eventsController').set('free', this.get('free'));
  }.observes('free'),

  actions: {
    resetAllFilters() {
      this.get('eventsController').set('page', 1);
      this.get('eventsController').set('date_range', null);
      this.get('eventsController').set('cost', null);
      this.get('eventsController').set('free', false);
      this.set('date_range', null);
      this.set('free', false);
    },
    filterByDate(value) {
      this.get('eventsController').set('page', 1);
      this.get('eventsController').set('date_range', value);
    },
    filterByCost() {
      if (this.get('eventsController').get('cost') === 'Free') {
        this.get('eventsController').set('cost', null);
      } else {
        this.get('eventsController').set('cost', 'Free');
      }
    }
  }
});
