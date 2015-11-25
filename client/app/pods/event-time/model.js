import DS from 'ember-data';
import Ember from 'ember';

const attr = DS.attr;

export default DS.Model.extend({
  start_time: attr('date'),

  event: DS.belongsTo('event')
});
