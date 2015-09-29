import DS from 'ember-data';

const attr = DS.attr;

export default DS.Model.extend({
  address: attr('string'),
  cost: attr('number'),
  created_at: attr('date'),
  end_date: attr('string'),
  end_time: attr('date'),
  generic_time: attr('string'),
  name: attr('string'),
  image_url: attr('string'),
  start_time: attr('date'),
  start_date: attr('string'),
  summary: attr('string'),
  venue: attr('string'),

  users: DS.hasMany('user', { async: true }),

  shortSummary: function() {
    const summary = this.get('summary');
    if ( summary && summary.length > 0 ) {
      return this.get('summary').split(' ').slice(0,40).join(' ');
    } else {
      return '';
    }
  }.property('summary')
});
