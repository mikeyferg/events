import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.queryRecord('city', {
      slug: params.city_slug,
      page: params.page,
      cost: params.cost,
      filter: params.filter
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
