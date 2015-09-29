import Ember from 'ember';

export default Ember.Component.extend({
  backgroundImage: Ember.computed('event.image_url', function() {
    const image_url = this.get('event.image_url');
    return image_url || 'https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/mountains.png';
  }),

  backgroundStyle: function() {
    return new Ember.Handlebars.SafeString(`background-image: url(${this.get('backgroundImage')});`);
  }.property('event.image_url')
});
