import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['page', 'cost', 'night_only', 'free', 'search'],
  page: 1,
  cost: null,
  night_only: false,
  free: false,
  search: '',

  reset() {
    this.setProperties({
      page: 1,
      cost: null,
      night_only: false,
      free: false,
      search: ''
    })
  },

  actions: {
    getNextPage() {
      let nextPage = +this.get('page') + 1;
      this.set('page', nextPage);
    },
    getPrevPage() {
      let prevPage = +this.get('page') - 1;
      if (prevPage > 0) {
        this.set('page', prevPage);
      }
    }
  }
});
