import Ember from 'ember';
import dateFilter from '../../utils/date-filter';

export default Ember.Controller.extend({
  filter: 'all',

  filteredEvents: Ember.computed.filter('model.events', function(event) {
    if (this.get('filter') === 'all') {
      return event;
    } else {
      return event.get(this.get('filter')) === true;
    }
  }).property('model.events', 'filter'),

  actions: {
    filterEvents(filterBy) {
      console.log(filterBy);
      this.set('filter', filterBy);
    }
  }
});
