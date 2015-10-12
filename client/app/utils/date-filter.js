import Ember from 'ember';

const { computed } = Ember;

export function isToday(eventDate) {
  const today = moment();
  const event_date = moment(eventDate);

  return isSameDay(today, event_date);
};

export function isTomorrow(eventDate) {
    const tomorrow = moment().add('days', 1);
    const event_date = moment(eventDate);

    return isSameDay(tomorrow, event_date);
};

export function isWeekend(eventDate) {
    const event_date = moment(eventDate);
    const friday = moment().day(5);
    const saturday = moment().day(6);
    const sunday = moment().day(7);

    return isSameDay(event_date, saturday, sunday);
};

/* **** Private functions **** */
function isSameDay(dayToCheck, ...daysArray) {
    return daysArray.some(function(date) {
      return dayToCheck.startOf('day').isSame(date.startOf('day'))
    })
};
