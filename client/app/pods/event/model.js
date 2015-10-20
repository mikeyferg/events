import DS from 'ember-data';
import moment from 'moment';
import Ember from 'ember';
import { isToday, isTomorrow, isWeekend } from '../../utils/date-filter';

const attr = DS.attr;

export default DS.Model.extend({
  address: attr('string'),
  cost: attr('string'),
  created_at: attr('date'),
  date_only: attr('date'),
  end_date: attr('string'),
  end_time: attr('date'),
  generic_time: attr('string'),
  name: attr('string'),
  image_url: attr('string'),
  slug: attr ('string'),
  start_time: attr('date'),
  start_date: attr('string'),
  summary: attr('string'),
  time_only: attr('date'),
  venue: attr('string'),
  featured: attr('boolean'),

  city: DS.belongsTo('city'),
  // users: DS.hasMany('user', { async: true }),

  shortSummary: Ember.computed('summary', function() {
    if ( this.get('summary') && this.get('summary').length > 0 ) {
      return this.get('summary').split(' ').slice(0,30).join(' ');
    } else {
      return '';
    }
  }),

  //Used for filtering on city view
  isFree: Ember.computed('cost', function() {
    if (this.get('cost')) {
      return this.get('cost').toLowerCase() === 'free' || this.get('cost').toLowerCase() === '0';
    }
  }),
  isToday: Ember.computed('date_only', function() {
    return isToday(this.get('date_only'));
  }),
  isTomorrow: Ember.computed('date_only', function() {
    return isTomorrow(this.get('date_only'));
  }),
  isWeekend: Ember.computed('date_only', function() {
    return isWeekend(this.get('date_only'));
  }),
});
