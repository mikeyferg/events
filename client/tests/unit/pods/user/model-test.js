import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('user', 'Unit | Model | user', {
  // Specify the other units that are required for this test.
  needs: ['model:event']
});

test('user model exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

test('user relationship', function(assert) {
  var User = this.store().modelFor('user');
  var relationship = Ember.get(User, 'relationshipsByName').get('events');
  assert.equal(relationship.key, 'events', 'Relationship key is "events"');
  assert.equal(relationship.kind, 'hasMany', "Relationship kind is hasMany");
});
