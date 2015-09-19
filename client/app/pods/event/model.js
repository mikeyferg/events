import DS from 'ember-data';

const attr = DS.attr,
      hasMany = DS.hasMany;

export default DS.Model.extend({
  address: attr('string'),
  cost: attr('number'),
  created_at: attr('date'),
  end_time: attr('date'),
  name: attr('string'),
  image_url: attr('string'),
  start_time: attr('date'),
  summary: attr('string'),
  venue: attr('string')
});
