/* globals google */
import Ember from 'ember';

// Extend TextField to keep ember styles
export default Ember.TextField.extend({
  tagName: 'input',

  insertMap: function() {
    const container = this.element;
    new google.maps.places.Autocomplete(container);
  }.on('didInsertElement')
});
