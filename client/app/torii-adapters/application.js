import Ember from 'ember';

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

  open: function(authorization){
    return new Ember.RSVP.Promise((resolve, reject) => {
      console.log("open", authorization);
      const accessToken = authorization.user.oauth_token;

      if (accessToken) {
        localStorage.token = accessToken;
        resolve(authorization);
      } else {
        reject({ error: 'No access token recieved' });
      }
    }).then(function() {
      return { currentUser: authorization.user };
    });
  }
});
