import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('not-found');
  this.route('application-error');

  this.route('cities', {path: '/'});
  this.route('city', {path: '/:city_slug'}, function() {
    this.route('events', {path: '/:category/:date_range'});
  });

  this.route('event', {path: '/:city_slug/event/:event_slug'});

  this.route('venue', {path: 'venue/:venue_slug'});
  this.route('user', {path: '/user'});

  // Static pages
  this.route('about');
  this.route('contact');
});

export default Router;
