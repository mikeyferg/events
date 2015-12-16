import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.queryRecord('city', {
      slug: params.city_slug
    });
  },

  serialize(city) {
    return {
      city_slug: city.get('slug')
    };
  },

  headTags() {
    let city = this.modelFor(this.routeName).get('name');
    let tag = this.controller.get('category').split('-').join(' ');
    let capitalizedTag = tag[0].toUpperCase() + tag.substr(1);
    let date = this.controller.get('date_range').split('-').join(' ');
    
    Ember.$(document).attr('title', `${capitalizedTag} events in ${city} ${date}.`);
    return [{
      type: 'meta',
      tagId: 'description',
      attrs: {
        name: 'description',
        content: `Check out all of the ${tag} events in ${city} ${date}.`
      }
    }];
  }
});
