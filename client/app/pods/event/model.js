import DS from 'ember-data';

const attr = DS.attr,
      hasMany = DS.hasMany;

export default DS.Model.extend({
  name: attr('string'),
  venue: attr('string'),
  summary: attr('string')
});
