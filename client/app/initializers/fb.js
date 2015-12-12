import FB from 'ember-cli-facebook-js-sdk/fb';

export default {
  name: 'fb',
  initialize: function() {
    return FB.init({
      appId: '1035793029772432',
      version: 'v2.5',
      xfbml: true
    });
  }
};
