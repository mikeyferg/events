import { isToday, isTomorrow, isSameDay } from '../../../utils/date-filter';
import { module, test } from 'qunit';
import moment from 'moment';

module('Unit | Utility | date filter');

// Replace this with your real tests.
test('isToday function', function(assert) {
  let today = moment();
  assert.equal(isToday(today), true, 'isToday returns true for today');

  let tomorrow = today.add(1, 'days');
  assert.equal(isTomorrow(tomorrow), true, 'isTomorrow returns true for tomorrow');

  let dateToCheck = moment('2015-10-17T19:30:00+00:00');
  let sameDate = moment('2015-10-17T12:30:00+00:00');
  assert.equal(isSameDay(dateToCheck, sameDate), true, 'isSameDay returns true for the same 2 dates');

  let differentDate = moment('2015-10-18T19:30:00+00:00');
  assert.equal(isSameDay(dateToCheck, differentDate), false, 'isSameDay returns false for 2 different dates');

  let date5 = moment('2015-10-17T19:30:00+00:00');
  let date6 = moment('2015-10-17T19:30:00+00:00');
  assert.equal(isSameDay(dateToCheck, differentDate, date5, date6), true, 'isSameDay returns true if dateToCheck equals to at least 1 of the dates');
});
