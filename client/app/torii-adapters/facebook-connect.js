import Ember from 'ember';

const Promise = Ember.RSVP.Promise;

export default Ember.Object.extend({

  close: function() {
    return new Ember.RSVP.Promise((resolve) => {
      localStorage.removeItem("token");
      resolve();
    });
  },

  fetch: function() {
    console.log("Fetch");
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
    return new Promise((resolve, reject) => {
      const accessToken = authorization.accessToken;
      if ( Ember.isPresent(accessToken) ) {
        localStorage.token = accessToken;
      }

      window.FB.api('/me', 'GET', { fields: [ 'email', 'name', 'picture' ] }, (response) => {
        if (Ember.isPresent(response)) {
          console.log("id", response);
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
