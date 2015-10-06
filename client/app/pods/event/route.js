import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('event', params.event_id);
  },

  serialize: function(event) {
    return {
      event_id: event.get('id'),
      event_slug: event.get('urlFriendlyName').toLowerCase().split(' ').join('-')
    }
  }
});
