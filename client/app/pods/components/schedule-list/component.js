import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'schedule-list',
  classNameBindings: ['isExpanded:schedule-list--expanded:schedule-list--closed'],
  isExpandable: Ember.computed('schedule', function() {
    return this.get('schedule').length > 4;
  }),
  isExpanded: false,

  actions: {
    toggleList(){
      this.toggleProperty('isExpanded');
    }
  }
});
