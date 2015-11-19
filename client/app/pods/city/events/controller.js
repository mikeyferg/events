import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['page', 'cost', 'date_range', 'free', 'search'],
  page: 1,
  date_range: 'week',
  cost: null,
  free: false,
  search: '',

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
