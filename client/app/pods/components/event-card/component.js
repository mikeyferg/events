import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'event-card',

  imageUrl: Ember.computed('event.image', function() {
    const image_url = this.get('event.image_url');
    return image_url || 'https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/mountains.png';
  }),

  eventTime: Ember.computed('timeToShow', function() {
    console.log('timeToShow', this.get('timeToShow'), this.get('event.event_times'));
    return 'date-time format string'
  })
});
