import Ember from 'ember';

const Promise = Ember.RSVP.Promise;

export default Ember.Object.extend({

  close() {
    return new Promise((resolve) => {
      resolve();
    });
  },


  fetch() {
    return new Promise((resolve, reject) => {
      reject();
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
          const email = response.email,
                name = response.name,
                picture = response.picture.data.url;

          resolve({ accessToken, email, name, picture });
        } else {
          reject({ error: 'Facebook reject our authorization request.' });
        }
      });
    });
  }

});
