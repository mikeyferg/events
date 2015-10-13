import Ember from 'ember';

const { computed } = Ember;

export function isToday(eventDate) {
  const today = moment(new Date());
  const event_date = moment(eventDate);

  return isSameDay(today, event_date);
};

export function isTomorrow(eventDate) {
    const tomorrow = moment(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
    const event_date = moment(eventDate);

    return isSameDay(tomorrow, event_date);
};

// Private functions
function isSameDay(day1, day2) {
  return day1.startOf('day').isSame(day2.startOf('day'))
};
