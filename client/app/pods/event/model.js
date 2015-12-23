import DS from 'ember-data';
import Ember from 'ember';
import moment from 'moment';
import { isToday, isTomorrow, isWeekend } from '../../utils/date-filter';

const attr = DS.attr;

export default DS.Model.extend({
  address: attr('string'),
  cost: attr('string'),
  cost_integer: attr('number'),
  event_times: attr('string'),
  name: attr('string'),
  image_url: attr('string'),
  source_url: attr('string'),
  slug: attr('string'),
  summary: attr('string'),
  featured: attr('boolean'),
  venue_name: attr('string'),
  venue_slug: attr('string'),

  city: DS.belongsTo('city'),
  tags: DS.hasMany('tag'),
  venue: DS.belongsTo('venue'),
  // users: DS.hasMany('user', { async: true }),

  sourceUrlDomain: Ember.computed('source_url', function() {
    if (!this.get('source_url')) {
      return '';
    }
    const domain = this.get('source_url').split('/')[2];
    return domain;
  }),

  costDisplay: Ember.computed('cost', function() {
    let cost = this.get('cost');
    if (cost.indexOf(';') !== -1) {
      let costs = cost.split(';');
      let firstPrice = +costs.get('firstObject').replace('$', '');
      let lastPrice = +costs.get('lastObject').replace('$', '');
      let lowest = Math.min(firstPrice, lastPrice);
      let highest = Math.max(firstPrice, lastPrice);
      cost = `$${lowest} - $${highest}`;
    }
    return cost;
  }),

  tagsList: Ember.computed('tags.[]', function() {
    let list = '';
    let arraySize = this.get('tags.length');
    this.get('tags').forEach(function(tag, key) {
      if (key < arraySize - 1) {
        list += `${tag.get('name')}, `;
      } else {
        list += tag.get('name');
      }

    });
    return list;
  }),

  shortSummary: Ember.computed('summary', function() {
    if ( this.get('summary') && this.get('summary').length > 0 ) {
      return this.get('summary').split(' ').slice(0,30).join(' ');
    } else {
      return '';
    }
  }),

  scheduleList: Ember.computed("event_times.[]", function() {
    return this.get('event_times').split(',');
  }),

  nextDate: Ember.computed('event_times.[]', function() {
    let times = this.get('event_times').split(',');
    return times.find(function(time) {
      return moment(time) > moment();
    })
  }),

  hasMultipleDates: Ember.computed('event_times.[]', function() {
    return this.get('event_times').split(',').length > 1;
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
