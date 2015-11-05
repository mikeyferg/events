import Ember from 'ember';

export default Ember.Route.extend({
  afterModel() {
    $(document).attr('title', 'Contact Event Coyote');
  },

  headTags() {
    return [{
      type: 'meta',
      tagId: 'description',
      attrs: {
        name: 'description',
        content: 'Contact us'
      }
    }];
  }
})
