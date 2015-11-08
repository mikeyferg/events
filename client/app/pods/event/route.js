import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    return this.store.find('event', params.event_slug);
  },

  afterModel(model) {
    var eventName = model.get('name');
    Ember.$(document).attr('title', eventName);
  },

  setupController(controller, model) {
    this._super(controller, model);
    this.controllerFor('application').set('headerTitle', model.get('name'));
  },

  serialize(event) {
    return {
      event_slug: event.get('slug')
    };
  },

  headTags() {
    let model = this.modelFor(this.routeName);
    return [{
      type: 'meta',
      tagId: 'description',
      attrs: {
        name: 'description',
        content: `${model.get('shortSummary')}`
      }
    }];
  }
});
