import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  keyForRelationship: function(key, relationship) {
    switch(key) {
      case 'events':
        return `city_${key}`;
      default:
        return this._super(...arguments);
    }
  }
});
