import DS from 'ember-data';
import moment from 'moment';
import Ember from 'ember';
import { isToday, isTomorrow } from '../../utils/date-filter';

const attr = DS.attr;

export default DS.Model.extend({
  address: attr('string'),
  cost: attr('string'),
  created_at: attr('date'),
  end_date: attr('string'),
  end_time: attr('date'),
  generic_time: attr('string'),
  name: attr('string'),
  image_url: attr('string'),
  slug: attr ('string'),
  start_time: attr('date'),
  start_date: attr('string'),
  summary: attr('string'),
  venue: attr('string'),

  users: DS.hasMany('user', { async: true }),

  shortSummary: Ember.computed('summary', function() {
    if ( this.get('summary') && this.get('summary').length > 0 ) {
      return this.get('summary').split(' ').slice(0,30).join(' ');
    } else {
      return '';
    }
  }),

  isToday: Ember.computed('start_time', function() {
    console.log("Model", isToday(this.get('start_time')));
    return isToday(this.get('start_time'));
  }),
  isTomorrow: Ember.computed('start_time', function() {
    return isTomorrow(this.get('start_time'));
  }),
});
