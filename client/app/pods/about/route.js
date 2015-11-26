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
        content: "At Event Coyote we are working to bring you the best events in San Francisco. It's a big task, but we'are working hard to get there."
      }
    }];
  }
});
