import Ember from 'ember';

export default Ember.Route.extend({
  afterModel() {
    Ember.$(document).attr('title', 'Contact Event Coyote');
  },

  setupController(controller, model) {
    this._super(controller, model);
    this.controllerFor('application').set('headerTitle', 'Contact Event Coyote');
  },

  headTags() {
    return [{
      type: 'meta',
      tagId: 'description',
      attrs: {
        name: 'description',
        content: "If you're in the know, you know how to reach us."
      }
    }];
  }
});
