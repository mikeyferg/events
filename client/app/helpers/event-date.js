import Ember from 'ember';
import { isToday, isTomorrow } from '../utils/date-filter';
import moment from 'moment';

export function eventDate(params) {
  if (!params) { return ''; }
  const [time, date] = params;
  if (isToday(date)) {
    return `Today @ ${moment(time).format('h:mma')}`;
  } else if (isTomorrow(date)) {
    return `Tomorrow @ ${moment(time).format('h:mma')}`;
  } else {
    return `${moment(date).format('MMM DD')} ${moment(time).format('h:mma')}`;
  }
}

export default Ember.Helper.helper(eventDate);
