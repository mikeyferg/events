import DS from 'ember-data';

const attr = DS.attr;

export default DS.Model.extend({
  name: attr('string'),
  slug: attr('string'),

  events: DS.hasMany('events')
});
