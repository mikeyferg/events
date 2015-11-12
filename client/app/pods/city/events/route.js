import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return Ember.RSVP.hash({
      city: this.modelFor('city'),
      events: this.store.query('event', {
        page: params.page,
        date_range: params.date_range,
        cost: params.cost,
        free: params.free
      })
    });
  },

  setupController(controller, model) {
    this._super(controller, model);
    this.controllerFor('application').set('headerTitle', `The ${model.city.get('name')} event spot`);
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    }
  }
});
