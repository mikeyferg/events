import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('city');
  },
  beforeModel() {
    this._super(...arguments);
    this.replaceWith('city.events', 'sf', 'top', 'this-week');
  }
});
