import Ember from 'ember';

export default Ember.Route.extend({
  afterModel() {
    Ember.$(document).attr('title', 'Sample2 v.1');
  },

  setupController(controller, model) {
    this._super(controller, model);
    this.controllerFor('application').set('headerTitle', 'SP v.1');
  },

  headTags() {
    return [{
      type: 'meta',
      tagId: 'description',
      attrs: {
        name: 'description',
        content: 'Sample page version 1, there is nothing else, just a test!'
      }
    }];
  }
});
