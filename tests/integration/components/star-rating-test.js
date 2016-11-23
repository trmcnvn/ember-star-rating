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

test('stars are rerendered if rating is changed', function(assert) {
  assert.expect(2);
  this.set('rating', 3);
  this.render(hbs`{{star-rating rating}}`);
  assert.equal(this.$('.star-full').length, 3);
  this.set('rating', 5);
  assert.equal(this.$('.star-full').length, 5);
});

test('can support any percentage fill', function(assert) {
  assert.expect(1);
  this.render(hbs`{{star-rating 3.7 anyPercent=true}}`);
  assert.equal(this.$('stop[offset="70%"]').length, 1);
});
