import DS from 'ember-data';
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
  source_url: attr('string'),
  schedule: attr('string'),
  slug: attr('string'),
  start_time: attr('date'),
  start_date: attr('string'),
  start_date_time: attr('string'),
  summary: attr('string'),
  time_only: attr('date'),
  venue: attr('string'),
  featured: attr('boolean'),

  city: DS.belongsTo('city'),
  tags: DS.hasMany('tag'),
  venue: DS.belongsTo('venue'),
  // users: DS.hasMany('user', { async: true }),

  sourceUrlDomain: Ember.computed('source_url', function() {
    if (!this.get('source_url')) return '';
    const domain = this.get('source_url').split('/')[2];
    return domain;
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

    })
    return list;
  }),

  scheduleList: Ember.computed("schedule", function() {
    let cleanSchedule = this.get('schedule')
      .replace(/(", ")/g, ";")
      .replace(/[\[\]()"']/g, "")
      .replace(/(\\xE5\\xD0)/g,", ")
      .split(';');
    return cleanSchedule;
  }),

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
