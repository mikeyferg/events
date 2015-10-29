import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['page', 'cost', 'filter'],
  page: 1,
  cost: null,
  filter: null,

  // filteredEvents: Ember.computed.filter('model.events', function(event) {
  //   if (this.get('filter') === 'all') {
  //     return event;
  //   } else {
  //     return event.get(this.get('filter')) === true;
  //   }
  // }).property('model.events', 'filter'),

  filteredEvents: Ember.computed('filter', 'model', function() {
    var filter = this.get('filter');
    var events = this.get('model.events');

    if (filter) {
      return events.filterBy('filter', filter);
    } else {
      return events;
    }
  }),

  actions: {
    filterEvents(filterBy) {
      console.log("rot", this.get('city'));
      this.set('filter', filterBy);
    },
    filterByCost(filterBy) {
      if (this.get('cost') === 'free') {
        this.set('cost', null);
      } else {
        this.set('cost', 'free');
      }
    }
  }
});
