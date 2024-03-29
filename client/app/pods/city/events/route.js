import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return Ember.RSVP.hash({
      city: this.modelFor('city'),
      category: params.category,
      date_range: params.date_range,
      events: this.store.query('event', {
        category: params.category,
        page: params.page,
        date_range: params.date_range,
        cost: params.cost,
        free: params.free,
        night_only: params.night_only,
        event_date: params.event_date,
        search: params.search
      }),
      featuredEvents: this.store.query('event', {
        category: params.category,
        page: params.page,
        date_range: params.date_range,
        cost: params.cost,
        free: params.free,
        night_only: params.night_only,
        event_date: params.event_date,
        featured: true
      }),
    });
  },

  // setupController(controller, model) {
  //   this._super(controller, model);
  //   this.controllerFor('application').set('headerTitle', `The ${model.city.get('name')} event spot`);
  // },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    }
  }
});
