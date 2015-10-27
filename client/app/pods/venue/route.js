import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.find('venue', params.venue_slug);
  },

  serialize(venue) {
    return {
      venue_slug: venue.get('slug')
    };
  }
});
