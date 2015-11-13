import Ember from 'ember';

export default Ember.Mixin.create({
  reloadMyAccount() {
    const oauth_token = this.get('session.accessToken');
    return this.store.queryRecord('user', { filter: { oauth_token: oauth_token } }).then((myAccount) => {
      this.controllerFor('application').set('myAccount', myAccount);
    });
  }
});
