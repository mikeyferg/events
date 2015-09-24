import Ember from 'ember';
import Provider from 'torii/providers/base';
import config from './../config/environment';

export default Provider.extend({
  path: 'http://localhost:3000/users',

  open(credentials) {
    console.log("credentials", credentials);
    const path = this.get('path'),
          userData = {
            user: {
              name: credentials.name,
              email: credentials.email,
              image: credentials.picture,
              oauth_token: credentials.accessToken,
              uid: credentials.uid
            }
          };

    return $.ajax(path,{
      'data': JSON.stringify(userData),
      'type': 'POST',
      'contentType': 'application/json'
    }).then((result) => {
      return { accessToken: result.user.oauth_token }
    });
  }
});
