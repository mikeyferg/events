import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('events', {path: '/'}, function() {
    this.route('new');
  });

  this.route('event', {path: '/events/:event_id/:event_slug'});

  this.route('user');
});

export default Router;
