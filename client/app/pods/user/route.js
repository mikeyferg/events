import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(){
    if (!this.get('session.accessToken')) {
      this.transitionTo('/');
    }
  },

  model(){
    const oauth_token = this.get('session.accessToken');
    return this.store.queryRecord('user', { filter: { oauth_token: oauth_token } });
  },

  setupController(controller, model) {
    this._super(controller, model);
    this.controllerFor('application').set('headerTitle', `${model.get('name')}`);
  },
});
