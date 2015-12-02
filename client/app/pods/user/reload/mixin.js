import Ember from 'ember';

export default Ember.Mixin.create({
  reloadMyAccount() {
    const oauth_token = this.get('session.accessToken');
    console.log("session.accessToken", oauth_token);
    return this.store.queryRecord('user', { oauth_token: oauth_token }).then((myAccount) => {
      console.log("myAccount", myAccount);
      this.controllerFor('application').set('myAccount', myAccount);
    });
  }
});
