import { eventDate } from '../../../helpers/event-date';
import { module, test } from 'qunit';

module('Unit | Helper | event date');

test('inputs', function(assert) {
  assert.equal(eventDate(), '', 'Empty');

  let today = moment();
  assert.equal(eventDate([today, today]).indexOf('Today'), 0, 'Today word present');

  let tomorrow = today.add('days', 1);
  assert.equal(eventDate([today, today]).indexOf('Tomorrow'), 0, 'Tomorrow word present');

  let time = '2015-10-17T13:00:00+00:00'
  let date = '2015-10-13';
  assert.equal(eventDate([time, date]), 'Tue Oct 13 6:00am', 'Tue Oct 13 6:00am if in California');
});
