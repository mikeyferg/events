import Ember from 'ember';
import dateFilter from '../../utils/date-filter';

export default Ember.Controller.extend({
  filteredEvents: Ember.computed.filter('model.events', function(event, index, array) {
    return event;
  }).property('model.events', 'model.events.@each.isToday'),

  actions: {
    filterToday() {
      filteredEvents: Ember.computed.filter('model.events', function(event, index, array) {
        return event.get('isToday');
      }).property('model.events', 'model.events.@each.isToday')
    }
  }
});
