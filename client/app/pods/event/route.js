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

  afterModel: function(model) {
    var eventName = model.get('name');
    $(document).attr('title', eventName);
  }
});
