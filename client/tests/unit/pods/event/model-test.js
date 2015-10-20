import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('event', 'Unit | Model | event', {
  // Specify the other units that are required for this test.
  needs: ['model:city']
});

test('Event model exist', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('event relationship', function(assert) {
  let Event = this.store().modelFor('event');
  let relationship = Ember.get(Event, 'relationshipsByName').get('city');
  // assert.equal(relationship.key, 'users', 'Relationship key is "users"');
  assert.equal(relationship.kind, 'belongsTo', "Relationship kind is belongsTo");
});

test('computed properties', function(assert) {
  let event = this.subject({
    cost: '$20',
    date_only: new Date(),
    name: 'Test event',
    summary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
  });

  assert.equal(event.get('shortSummary'), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took", 'short summary')
  assert.equal(event.get('isFree'), false, 'isFree is false');
  assert.equal(event.get('isToday'), true, 'isToday is true');
  assert.equal(event.get('isTomorrow'), false, 'isToday is false');

  Ember.run(() => event.set('date_only', new Date(new Date().getTime() + 24 * 60 * 60 * 1000)));
  assert.equal(event.get('isToday'), false, 'Changed date: isToday is false');
  assert.equal(event.get('isTomorrow'), true, 'Changed date: isTomorrow is true');

  Ember.run(() => event.set('cost', "Free"));
  assert.equal(event.get('isFree'), true, 'Free sets isFree = true');

  Ember.run(() => event.set('cost', "free"));
  assert.equal(event.get('isFree'), true, 'free sets isFree = true');

  Ember.run(() => event.set('cost', "0"));
  assert.equal(event.get('isFree'), true, '0 sets isFree = true');
})
