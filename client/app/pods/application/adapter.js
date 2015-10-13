import config from './../../config/environment';
import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTAdapter.extend({
  host: config.apiHostname,

  // findRecord: function(store, type, id, snapshot) {
  //   console.log("1", store, "1", type, "1", id, "1", snapshot);
  //   return "http://coyote-api-staging.herokuapp.com/cities/1";
  // },

  headers: Ember.computed('session.accessToken', function() {
    const accessToken = this.get('session.accessToken'),
          headers = {};

    if (accessToken) {
      headers.Authorization = `Token token="${accessToken}"`;
    }
    return headers;
  })
});
