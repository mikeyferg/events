import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'schedule-list',
  classNameBindings: ['isExpanded:schedule-list--expanded:schedule-list--closed'],
  isExpanded: false,

  actions: {
    toggleList(){
      this.toggleProperty('isExpanded')
      console.log(this.get('isExpanded'));
    }
  }
});
