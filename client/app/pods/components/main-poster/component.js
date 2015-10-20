import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'hero',

  didInsertElement() {
    // set height of element to windows height
    Ember.$(this.element).css('height', window.innerHeight);
  }
});
