import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.find('venue', params.venue_slug);
  },

  setupController(controller, model) {
    this._super(controller, model);
    this.controllerFor('application').set('headerTitle', model.get('name'));
  },

  serialize(venue) {
    return {
      venue_slug: venue.get('slug')
    };
  }
});
