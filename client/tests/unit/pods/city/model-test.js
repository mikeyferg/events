import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('city', 'Unit | Model | city', {
  // Specify the other units that are required for this test.
  needs: ['model:event', 'model:venue']
});

test('city model exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model, 'City model exist');
});

test('event relationship', function(assert) {
  var City = this.store().modelFor('city');
  var relationship = Ember.get(City, 'relationshipsByName').get('events');
  assert.equal(relationship.kind, 'hasMany', "Relationship kind is hasMany");
});
