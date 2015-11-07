import Ember from 'ember';

/*
  global document, window
*/

const cookies = window.Cookies;

export default Ember.Service.extend({
  getItem() {
    return cookies.get.apply(cookies, arguments);
  },
  setItem() {
    return cookies.set.apply(cookies, arguments);
  },
  removeItem() {
    return cookies.remove.apply(cookies, arguments);
  }
});
