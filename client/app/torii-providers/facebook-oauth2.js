import Ember from 'ember';
import FacebookOauthProvider from 'torii/providers/facebook-oauth2';
import config from './../config/environment';

export default FacebookOauthProvider.extend({
  path: `${config.apiHostname}/users`,

  fetchFacebookUser(accessToken) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      window.FB.api('/me', 'GET', { fields: [ 'email', 'name', 'picture' ] }, (response) => {
        console.log("response", response, FB.getAuthResponse().accessToken);
        if (Ember.isPresent(response)) {
          const uid = response.id,
                email = response.email,
                name = response.name,
                picture = response.picture.data.url,
                accessToken = FB.getAuthResponse().accessToken;

          resolve({ email, name, picture, accessToken });
        } else {
          reject();
        }
      });
    }).catch(() => {
      throw {
        errors: [{
          status: 500,
          title: 'Facebook Authentication Error',
          detail: 'An error occured while authenticating with Facebook'
        }]
      };
    });
  },

  authorizeWithFacebook(facebookLoginPromise) {
    return facebookLoginPromise.then((fbAuthorization) => {
      return fbAuthorization.authorizationCode;
    }).catch(() => {
      throw {
        errors: [{
          status: 401,
          title: 'Facebook Authentication Error',
          detail: 'You declined authentication through Facebook'
        }]
      };
    });
  },

  open() {
    console.log("Facebook-oauth2");
    return this.authorizeWithFacebook(this._super()).then((fbAccessToken) => {
      return this.fetchFacebookUser(fbAccessToken);
    }).then((fbAuthorization) => {
      console.log("fbAuthorization", fbAuthorization);
      const path = this.get('path'),
            userData = {
              user: {
                name: fbAuthorization.name,
                email: fbAuthorization.email,
                image_url: fbAuthorization.picture,
                oauth_token: fbAuthorization.accessToken,
                uid: fbAuthorization.uid
              }
            };

      return Ember.$.ajax(path,{
        'data': JSON.stringify(userData),
        'type': 'POST',
        'contentType': 'application/json'
      }).then((result) => {
        console.log("result", result);
        return { user: result.user };
      });
    });
  }
});
