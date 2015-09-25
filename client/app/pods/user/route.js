import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return this.store.queryRecord('user', { filter: { oauth_token: this.get('session.accessToken') } })
  }
});
