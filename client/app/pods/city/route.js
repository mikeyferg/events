import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.queryRecord('city', {
      slug: params.city_slug
    });
  },

  // afterModel() {
  //   console.log(this.controllerFor('city.events').get('free'));
  // },
  //
  // setupController: function(controller, model){
  //   this._super(...arguments);
  //   setTimeout(() => {
  //       console.log(this.controllerFor('city.events').get('free'));
  //   }, 2000)
  //
  //   // this.controllerFor('city').set('free', true);
  //  },

  serialize(city) {
    return {
      city_slug: city.get('slug')
    };
  }
});
