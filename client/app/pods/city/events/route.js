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
    })
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    }
  }
});
