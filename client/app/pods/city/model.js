import DS from 'ember-data';

const attr = DS.attr;

export default DS.Model.extend({
  name: attr('string'),
  nickname: attr('string'),

  events: DS.hasMany('event'),
});
