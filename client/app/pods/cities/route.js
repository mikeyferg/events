import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    cityModel: this.modelFor('city');
    return this.store.findAll('city');
  },
  beforeModel() {
    this._super(...arguments);
    this.replaceWith('city.events', 'sf', 'events');
  }
});
