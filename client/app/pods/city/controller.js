import Ember from 'ember';

export default Ember.Controller.extend({
  eventsController: Ember.inject.controller('city.events'),

  // get filter values for UI on reload
  free: Ember.computed.reads('eventsController.free'),
  night_only: Ember.computed.reads('eventsController.night_only'),
  event_date: Ember.computed.reads('eventsController.event_date'),
  featuredEvents: Ember.computed.reads('eventsController.model.featuredEvents'),
  names: ["Yehuda", "Tom"],

  reset() {
    this.set('free', this.get('eventsController').get('free'));
    this.set('night_only', this.get('eventsController').get('night_only'));
    this.set('event_date', this.get('eventsController').get('event_date'));
    this.set('featuredEvents', this.get('eventsController').get('model.featuredEvents'));
  },

  freeSwitchChanged: function() {
    this.get('eventsController').set('page', 1);
    this.get('eventsController').set('free', this.get('free'));
  }.observes('free'),

  nightSwitchChanged: function() {
    this.get('eventsController').set('page', 1);
    this.get('eventsController').set('night_only', this.get('night_only'));
  }.observes('night_only'),

  dateChanged: function() {
    let formattedDate = this.get('event_date');
    if (formattedDate !== null) {
      formattedDate = moment(this.get('event_date')).format('MM-DD-YY');
    }
    this.transitionToRoute('city.events', 'sf', 'events', 'dates', { queryParams: {event_date: formattedDate} });
  }.observes('event_date'),

  

});
