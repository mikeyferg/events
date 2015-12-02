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
      const accessToken = authorization.accessToken;
      if ( Ember.isPresent(accessToken) ) {
        localStorage.token = accessToken;
      }
      console.log("Facebook: This seession", this.get('session'));
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
