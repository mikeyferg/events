import Ember from 'ember';
import reloadMyAccount from '../user/reload/mixin';

export default Ember.Mixin.create(reloadMyAccount, {
  actions: {
    // Global connect to facebook action
    signInViaFacebook() {
      const session = this.get('session');

      // TODO: We need an actual display for this.
      this.controller.set('loginMessage', 'Please wait while we connect to Facebook');

      session.open('facebook-oauth2').then((auth) => {
        this.reloadMyAccount();
        console.log("Logged in via oauth2", auth);
      }).catch((err) => {
        // TODO: Display a modal to handle error states
        Ember.Logger.error('Connecting to facebook failed.', err);
        // throw new Error('Connecting to facebook failed.');
      });
    }
  }
});
