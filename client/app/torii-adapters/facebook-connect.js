import Ember from 'ember';
import FB from 'ember-cli-facebook-js-sdk/fb';

const Promise = Ember.RSVP.Promise;

export default Ember.Object.extend({

  close: function() {
    return new Ember.RSVP.Promise((resolve) => {
      localStorage.removeItem("token");
      resolve();
    });
  },

  fetch: function() {
    console.log("Facebook adapter: Fetch");
    return new Ember.RSVP.Promise((resolve, reject) => {
      const accessToken = localStorage.token;

      if (accessToken) {
        resolve({ accessToken: accessToken });
      } else {
        reject();
      }
    });
  },


  open(authorization) {
    console.log("Facebook adapter: Open", authorization);
    return new Promise((resolve, reject) => {
      const accessToken = authorization.authorizationCode;
      if ( Ember.isPresent(accessToken) ) {
        localStorage.token = accessToken;
      }
      FB.api('/me', { fields: [ 'email', 'name', 'picture', 'gender' ] }).then((response) => {
        console.log("FB me:", response);
        FB.api('/' + authorization.userId + '/events').then((response) => {
          console.log("responseresponse", response);
        });



        if (Ember.isPresent(response)) {
          const uid = response.id,
                email = response.email,
                name = response.name,
                picture = response.picture.data.url;

          resolve({ accessToken, uid, email, name, picture });
        } else {
          reject({ error: 'Facebook reject our authorization request.' });
        }
      });
    });
  }

});
