import Ember from 'ember';

// Extend TextField to keep ember styles
export default Ember.TextField.extend({
  tagName: 'input',

  insertMap: function() {
    const container = this.element;
    let autocomplete = new google.maps.places.Autocomplete(container);
  }.on('didInsertElement')
});
