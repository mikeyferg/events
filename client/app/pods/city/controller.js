import Ember from 'ember';
import dateFilter from '../../utils/date-filter';

export default Ember.Controller.extend({
  filter: 'isToday',

  filteredEvents: Ember.computed.filter('model.events', function(event) {
    return event.get(this.get('filter')) === true;
  }).property('model.events', 'model.events.@each.isToday', 'model.events.@each.isTomorrow', 'filter'),

  actions: {
    filterToday() {
      this.set('filter', 'isToday');
    },

    filterTomorrow() {
      this.set('filter', 'isTomorrow');
    }
  }
});
