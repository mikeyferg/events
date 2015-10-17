import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings:["id"],
  id : Ember.computed.oneWay('event.id'),

  imageUrl: Ember.computed('event.image_url', function() {
    const image_url = this.get('event.image_url');
    return image_url || 'https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/mountains.png';
  })
});
