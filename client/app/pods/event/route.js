import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    // Load a city and events for the city
    return Ember.RSVP.hash({
      city: this.store.find('city', params.city_slug),
      event: this.store.find('event', params.event_slug),
    });
  },

  serialize(event) {
    return {
      event_slug: event.get('slug')
    };
  }
});
