import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'p',
  classNames: 'event-description',
  classNameBindings: ['isExpanded:event-description--expanded:event-description--closed'],
  isExpandable: false,
  isExpanded: false,

  insertElement: function() {
    let elementHeight = Ember.$(this.element).css('height');
    elementHeight = parseInt(elementHeight);
    if (elementHeight !== 'NaN' && elementHeight >= 520) {
      this.set('isExpandable', true)
    }
  }.on('didInsertElement'),

  actions: {
    toggleList(){
      this.toggleProperty('isExpanded');
    }
  }
});
