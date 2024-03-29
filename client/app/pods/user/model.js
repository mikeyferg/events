import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  email: DS.attr('string'),
  image_url: DS.attr('string'),

  events: DS.hasMany('event', { async: true })
});
