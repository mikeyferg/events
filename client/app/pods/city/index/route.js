import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this._super(...arguments);
    this.replaceWith('city.events', 'sf', 'top', 'this-week');
  }
});
