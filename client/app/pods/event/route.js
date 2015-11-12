import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    return Ember.RSVP.hash({
      event: this.store.queryRecord('event', {slug: params.event_slug}),
      city: this.store.queryRecord('city', {slug: params.city_slug}),
      extraEvents: this.store.query('event', {limit: true})
    });
  },

  afterModel(model) {
    var eventName = model.event.get('name');
    Ember.$(document).attr('title', eventName);
  },

  setupController(controller, model) {
    this._super(controller, model);
    this.controllerFor('application').set('headerTitle', model.event.get('name'));
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
        content: `${model.event.get('shortSummary')}`
      }
    }];
  }
});
