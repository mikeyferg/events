import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['button-group'],

  actions: {
    selectTag(tagSelected) {
      this.sendAction('selectTag', tagSelected);
    }
  }
})
