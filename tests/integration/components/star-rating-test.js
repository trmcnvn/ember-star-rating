import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('star-rating', 'Integration | Component | star rating', {
  integration: true
});

test('it renders with default options', function(assert) {
  assert.expect(1);
  this.render(hbs`{{star-rating}}`);
  assert.equal(this.$('svg').length, 5, 'Stars are rendered');
});

test('can set N stars', function(assert) {
  assert.expect(1);
  this.render(hbs`
    {{star-rating
      numStars=10
    }}
  `);
  assert.equal(this.$('svg').length, 10, 'Stars are rendered');
});
