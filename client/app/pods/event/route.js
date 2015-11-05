import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    return this.store.find('event', params.event_slug);
  },

  serialize(event) {
    return {
      event_slug: event.get('slug')
    };
  },

  afterModel(model) {
    var eventName = model.get('name');
    $(document).attr('title', eventName);
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
