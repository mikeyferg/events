import Ember from 'ember';

export default Ember.Controller.extend({
  eventsController: Ember.inject.controller('city.events'),

  // get filter values for UI on reload
  free: Ember.computed.reads('eventsController.free'),
  night_only: Ember.computed.reads('eventsController.night_only'),
  featuredEvents: Ember.computed.reads('eventsController.model.featuredEvents'),

  reset() {
    this.set('free', this.get('eventsController').get('free'));
    this.set('night_only', this.get('eventsController').get('night_only'));
    this.set('featuredEvents', this.get('eventsController').get('model.featuredEvents'));
  },

  freeSwitchChanged : function() {
    this.get('eventsController').set('page', 1);
    this.get('eventsController').set('free', this.get('free'));
  }.observes('free'),

  nightSwitchChanged : function() {
    this.get('eventsController').set('page', 1);
    this.get('eventsController').set('night_only', this.get('night_only'));
  }.observes('night_only')

});
