import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'p',
  classNames: 'event-description',
  classNameBindings: ['isExpanded:event-description--expanded:event-description--closed'],
  isExpandable: false,
  isExpanded: false,

  insertElement: function() {
    let paragraphHeight = Ember.$('.event-description__summary').css('height');
    paragraphHeight = parseInt(paragraphHeight);
    if (paragraphHeight !== 'NaN' && paragraphHeight >= 200) {
      this.set('isExpandable', true)
    }
  }.on('didInsertElement'),

  actions: {
    toggleList(){
      this.toggleProperty('isExpanded');
    }
  }
});
