import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    page: {
      refreshModel: true
    },
    cost: {
      refreshModel: true
    },
    filter: {
      refreshModel: true
    }
  },

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
  }
});
