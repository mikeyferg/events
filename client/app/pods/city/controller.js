import Ember from 'ember';

export default Ember.Controller.extend({
  eventsController: Ember.inject.controller('city.events'),

  // get filter values for UI on reload
  free: Ember.computed.reads('eventsController.free'),
  featuredEvents: Ember.computed.reads('eventsController.model.featuredEvents'),

  reset() {
    this.set('free', this.get('eventsController').get('free'));
    this.set('featuredEvents', this.get('eventsController').get('model.featuredEvents'));
  },

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
      this.set('free', false);
    }
  }
});
