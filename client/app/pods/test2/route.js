import Ember from 'ember';

export default Ember.Route.extend({
  afterModel() {
    Ember.$(document).attr('title', 'Test 2');
  },

  setupController(controller, model) {
    this._super(controller, model);
    this.controllerFor('application').set('headerTitle', 'Test 2');
  },

  headTags() {
    return [{
      type: 'meta',
      tagId: 'description',
      attrs: {
        name: 'description',
        content: 'Test 2 - sample test page to figureout if simple links work'
      }
    }];
  }
});
