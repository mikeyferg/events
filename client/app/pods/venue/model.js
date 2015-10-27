import DS from 'ember-data';

const attr = DS.attr;

export default DS.Model.extend({
  address: attr('string'),
  image: attr('string'),
  name: attr('string'),
  slug: attr('string'),

  events: DS.hasMany('event'),
  city: DS.belongsTo('city')
});
