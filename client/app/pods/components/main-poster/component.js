import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'hero',

  style: function(){
        return "width: 300px";
    }.property(),

  didInsertElement(el) {
    // set height of element to windows height
    this.$(this.element).css('height', window.innerHeight);
  }
});
