import Ember from 'ember';
import { isToday, isTomorrow } from '../utils/date-filter';
import moment from 'moment';

export function eventDate(params) {
  if (!params) { return ''; }
  const [date_time, pure_date = false] = params;
  if (pure_date) {
    return `${moment(date_time).format('MMM DD')} ${moment(date_time).format('h:mma')}`;
  } else if (isToday(date_time)) {
    return `Today @ ${moment(date_time).format('h:mma')}`;
  } else if (isTomorrow(date_time)) {
    return `Tomorrow @ ${moment(date_time).format('h:mma')}`;
  } else {
    return `${moment(date_time).format('MMM DD')} ${moment(date_time).format('h:mma')}`;
  }
}

export default Ember.Helper.helper(eventDate);
