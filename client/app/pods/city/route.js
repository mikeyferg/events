import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.find('city', params.city_slug);
  },

  serialize(city) {
    return {
      city_slug: city.get('nickname')
    }
  },

  actions: {
    filterToday() {
      this.set('sortProperties', 'venue');
      this.set('sortAscending', !this.get('sortAscending'));
    }
  }
});
