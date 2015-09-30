import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    // Global connect to facebook action
    signInViaFacebook() {
      const session = this.get('session');

      // TODO: We need an actual display for this.
      this.controller.set('loginMessage', 'Please wait while we connect to Facebook');

      session.open('facebook-connect').then((auth) => {
        // TODO: We need an actual display for this.
        this.controller.set('loginMessage', 'Connecting to QuickDraft');

        // We've authorized with facebook, but we're not really authorized for the
        // purposes of this app, so we have to reset the state machine with close,
        // then log in again using the credentials we fetched out of the facebook provider.
        console.log("auth", auth);
        session.close().then(() => {
          session.open('events-facebook-connect', {
            email: auth.email,
            name: auth.name,
            picture: auth.picture,
            accessToken: auth.accessToken,
            uid: auth.uid
          }).then((result) => {
            console.log("Logged in", result);
          }).catch((xhr) => {
            console.log("xhr", xhr);
            let error;

            if (xhr && xhr.responseJSON && xhr.responseJSON.error) {
              error = xhr.responseJSON.error;
            } else {
              error = 'There was an error connecting to QuickDraft. Please try again.';
            }

            // TODO: Display a modal to handle error states
            Ember.Logger.error(error);
            throw new Error(error);
          });
        });
      }).catch(() => {
        // TODO: Display a modal to handle error states
        Ember.Logger.error('Connecting to facebook failed.');
        throw new Error('Connecting to facebook failed.');
      });
    }
  }
});
