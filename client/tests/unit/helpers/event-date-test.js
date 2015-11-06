import { eventDate } from '../../../helpers/event-date';
import moment from 'moment';
import { module, test } from 'qunit';

module('Unit | Helper | event date');

test('inputs', function(assert) {
  assert.equal(eventDate(), '', 'Empty');

  let today = moment();
  assert.equal(eventDate([today, today]).indexOf('Today'), 0, 'Today word present');

  let tomorrow = today.add(1, 'days');
  assert.equal(eventDate([tomorrow, tomorrow]).indexOf('Tomorrow'), 0, 'Tomorrow word present');

  let datetime = '2015-10-17T10:00:00.000Z';
  assert.equal(eventDate([datetime]), 'Oct 17 3:00am', 'Tue Oct 17 3:00am if in California');
});
