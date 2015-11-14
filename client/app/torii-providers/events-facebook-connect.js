import Ember from 'ember';
import Provider from 'torii/providers/base';
import config from './../config/environment';

export default Provider.extend({
  path: `${config.apiHostname}/users`,

  open(credentials) {
    console.log("Facebook provider", credentials);
    const path = this.get('path'),
          userData = {
            user: {
              name: credentials.name,
              email: credentials.email,
              image_url: credentials.picture,
              oauth_token: credentials.accessToken,
              uid: credentials.uid
            }
          };

    return Ember.$.ajax(path,{
      'data': JSON.stringify(userData),
      'type': 'POST',
      'contentType': 'application/json'
    }).then((result) => {
      return { user: result.user };
    });
  }
});
