import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.queryRecord('city', {
      slug: params.city_slug,
      category: params.category,
      page: params.page,
      cost: params.cost,
      date_range: params.date_range,
      free: params.free
    });
  },

  serialize(city) {
    return {
      city_slug: city.get('slug')
    };
  },

  actions: {
    queryParamsDidChange: function() {
      this.refresh();
    }
  }
});
