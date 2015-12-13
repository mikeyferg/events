import Ember from 'ember';

export default Ember.Controller.extend({
  eventsController: Ember.inject.controller('city.events'),

  // get filter values for UI on reload
  free: Ember.computed.reads('eventsController.free'),
  night_only: Ember.computed.reads('eventsController.night_only'),
  date_range: Ember.computed.reads('eventsController.model.date_range'),
  event_date: Ember.computed.reads('eventsController.model.date_range'),
  category: Ember.computed.reads('eventsController.model.category'),
  featuredEvents: Ember.computed.reads('eventsController.model.featuredEvents'),

  reset() {
    this.set('free', this.get('eventsController').get('free'));
    this.set('night_only', this.get('eventsController').get('night_only'));
    this.set('date_range', 'this-week');
    this.set('event_date', null);
    this.set('featuredEvents', this.get('eventsController').get('model.featuredEvents'));
  },

  resetPageNumber() {
    this.get('eventsController').set('page', 1);
  },

  freeSwitchChanged: function() {
    this.resetPageNumber();
    this.get('eventsController').set('free', this.get('free'));
  }.observes('free'),

  nightSwitchChanged: function() {
    this.resetPageNumber();
    this.get('eventsController').set('night_only', this.get('night_only'));
  }.observes('night_only'),

  dateChanged: function() {
    this.resetPageNumber();
    let formattedDate = this.get('event_date');
    //Format raw date into MM-DD-YY
    if (Ember.isPresent(formattedDate) && formattedDate.toString().indexOf('GMT') !== -1) {
      formattedDate = moment(this.get('event_date')).format('MM-DD-YYYY');
    }
    let city = this.get('model.slug');
    let category = this.get('category');
    let params = {
      free: this.get('free'),
      night_only: this.get('night_only')
    }
    this.transitionToRoute('city.events', city, category, formattedDate, { queryParams: params});
  }.observes('event_date'),

  actions: {
    selectCategory(category) {
      let city = this.get('model.slug');
      let date_range = this.get('date_range');
      let params = {
        free: this.get('free'),
        night_only: this.get('night_only')
      }
      this.transitionToRoute('city.events', city, category, date_range, { queryParams: params})
    },

    filterByDate(date_range) {
      this.set('event_date', date_range);
    }
  }

});
