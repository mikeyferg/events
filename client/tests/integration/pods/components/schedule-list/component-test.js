import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('schedule-list', 'Integration | Component | schedule list', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.ons('myAction', function(val) { ... });

  this.render(hbs`{{schedule-list}}`);

  assert.equal(this.$().text().trim(), 'Full schedule:');
});
