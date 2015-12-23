import moment from 'moment';

export function isToday(eventDate) {
  const today = moment();
  const event_date = moment(eventDate);

  return isSameDay(today, event_date);
}

export function isTomorrow(eventDate) {
  const tomorrow = moment().add(1, 'days');
  const event_date = moment(eventDate);

  return isSameDay(tomorrow, event_date);
}

export function isWeekend(eventDate) {
  const event_date = moment(eventDate);
  const friday = moment().day(5);
  const saturday = moment().day(6);
  const sunday = moment().day(7);

  return isSameDay(event_date, friday, saturday, sunday);
}

export function isSameDay(dayToCheck, ...daysArray) {
  return daysArray.some(function(date) {
    return dayToCheck.startOf('day').isSame(date.startOf('day'));
  });
}
