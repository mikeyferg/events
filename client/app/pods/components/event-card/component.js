import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  isToday: Ember.computed('', function() {
    const today = moment(new Date());
    const event_date = moment(this.get('event.start_time'));

    return today.startOf('day').isSame(event_date.startOf('day'))
  }),

  imageUrl: Ember.computed('event.image_url', function() {
    const image_url = this.get('event.image_url');
    return image_url || 'https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/mountains.png';
  })
});
