import config from './../../config/environment';
import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTAdapter.extend({
  host: config.apiHostname,

  shouldBackgroundReloadRecord: function() {
    return false;
  },

  headers: Ember.computed('session.accessToken', function() {
    const accessToken = this.get('session.accessToken'),
          headers = {};

    if (accessToken) {
      headers.Authorization = `Token token="${accessToken}"`;
    }
    return headers;
  })
});
