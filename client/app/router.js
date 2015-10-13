import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('cities', {path: '/'});

  this.route('city', {path: '/:city_slug'});
  this.route('event', {path: '/:city_slug/events/:event_slug'});
});

export default Router;
