import Ember from 'ember';
import { isToday, isTomorrow } from '../utils/date-filter';
import moment from 'moment';

export function eventDate(start_time) {
  const [time] = start_time;
  
  if (isToday(time)) {
    return `Today @ ${moment(time).format('h:mma')}`;
  } else if (isTomorrow(time)) {
    return `Tomorrow @ ${moment(time).format('h:mma')}`;
  } else {
    return moment(time).format('MMM d, h:mma');
  }
}

export default Ember.Helper.helper(eventDate);
