import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.queryRecord('city', {
      slug: params.city_slug
    });
  },

  serialize(city) {
    return {
      city_slug: city.get('slug')
    };
  },

  afterModel(model) {
    var cityName = model.get('name');
    $(document).attr('title', `Events in ${cityName}`);
  },

  headTags() {
    let model = this.modelFor(this.routeName);
    return [{
      type: 'meta',
      tagId: 'description',
      attrs: {
        name: 'description',
        content: `Events in ${model.get('name')}`
      }
    }];
  }
});
