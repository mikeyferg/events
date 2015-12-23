import Ember from 'ember';
import { isWeekend, isTomorrow, isSameDay } from '../../../utils/date-filter';

export default Ember.Component.extend({
  classNames: 'event-card',

  imageUrl: Ember.computed('event.image', function() {
    const image_url = this.get('event.image_url');
    return image_url || 'https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/mountains.png';
  }),

  eventTime: Ember.computed('timeToShow', function() {
    let date = this.get('timeToShow')
    //If date_range is selected
    switch (date) {
      case 'this-week':
        date = this.get('event.nextDate')
        break;
      case 'today':
        date = this.get('event.nextDate')
        break;
      case 'tomorrow':
        //Return true to short-circuit loop on the first found instance
        this.get('event.event_times').split(',').some((time) => {
          if (isTomorrow(time)) {
            date = time;
            return true;
          }
        })
        break;
      case 'weekend':
        this.get('event.event_times').split(',').some((time) => {
          if (isWeekend(time)) {
            date = time;
            return true;
          }
        })
        break;
      case 'upcoming':
        date = this.get('event.nextDate')
        break;
      //When date is selected
      default:
      date = moment(date, 'MM/DD/YYYY');
      this.get('event.event_times').split(',').some((time) => {
        if (isSameDay(date, moment(time))) {
          date = time;
          return true;
        }
      })
    }
    return date;
  })
});
