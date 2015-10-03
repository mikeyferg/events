import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('event', 'Unit | Model | event', {
  // Specify the other units that are required for this test.
  needs: ['model:user']
});

test('Event model exist', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

test('event relationship', function(assert) {
  var Event = this.store().modelFor('event');
  var relationship = Ember.get(Event, 'relationshipsByName').get('users');
  assert.equal(relationship.key, 'users', 'Relationship key is "users"');
  assert.equal(relationship.kind, 'hasMany', "Relationship kind is hasMany");
});
