import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'p',
  classNames: 'event-description',
  classNameBindings: ['isExpanded:event-description--expanded:event-description--closed'],
  isExpandable: false,
  isExpanded: false,

  setIsExpandable() {
    this.set('isExpandable', true)
  },

  insertElement: function() {
    let paragraphHeight = Ember.$('.event-description__summary').css('height');
    paragraphHeight = parseInt(paragraphHeight);
    if (paragraphHeight !== 'NaN' && paragraphHeight >= 200) {
      Ember.run.scheduleOnce('afterRender', this, 'setIsExpandable');
    }
  }.on('didInsertElement'),

  actions: {
    toggleList(){
      this.toggleProperty('isExpanded');
    }
  }
});
