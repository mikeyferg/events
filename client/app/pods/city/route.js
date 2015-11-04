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

  afterModel: function(model) {
    var cityName = model.get('name');
    $(document).attr('title', `Events in ${cityName}`);
  }
});
