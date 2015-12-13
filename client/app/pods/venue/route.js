import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.queryRecord('venue', {slug: params.venue_slug});
  },

  afterModel(model) {
    // model.reload();
  },

  setupController(controller, model) {
    this._super(controller, model);
    this.controllerFor('application').set('headerTitle', model.get('name'));
    Ember.$(document).attr('title', `${model.get('name')}`);
  },

  serialize(venue) {
    return {
      venue_slug: venue.get('slug')
    };
  }
});
