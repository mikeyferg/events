import Ember from 'ember';

export default Ember.Route.extend({
  afterModel() {
    Ember.$(document).attr('title', 'About Event Coyote');
  },

  setupController(controller, model) {
    this._super(controller, model);
    this.controllerFor('application').set('headerTitle', 'About Event Coyote');
  },

  headTags() {
    return [{
      type: 'meta',
      tagId: 'description',
      attrs: {
        name: 'description',
        content: 'Event Coyote is an event discovery platform'
      }
    }];
  }
});
