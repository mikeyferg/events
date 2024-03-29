import Ember from 'ember';

export default Ember.Object.extend({

  close: function() {
    return new Ember.RSVP.Promise((resolve) => {
      localStorage.removeItem("token");
      resolve();
    });
  },

  fetch: function() {
    console.log("Application adapter: Fetch");
    return new Ember.RSVP.Promise((resolve, reject) => {
      const accessToken = localStorage.token;

      if (accessToken) {
        resolve({ accessToken: accessToken });
      } else {
        reject();
      }
    });
  },

  open: function(authorization){
    console.log("Application adapter: open", authorization);
    return new Ember.RSVP.Promise((resolve, reject) => {
      const accessToken = authorization.user.oauth_token;

      if (accessToken) {
        localStorage.token = accessToken;
        resolve(authorization);
      } else {
        reject({ error: 'No access token recieved' });
      }
    });
  }
});
