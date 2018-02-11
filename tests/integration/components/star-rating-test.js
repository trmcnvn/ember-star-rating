import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('star-rating', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders with default options', async function(assert) {
    assert.expect(1);
    await render(hbs`{{star-rating}}`);
    assert.equal(this.element.querySelectorAll('svg').length, 5);
  });

  test('can set `N` stars', async function(assert) {
    assert.expect(1);
    await render(hbs`{{star-rating numStars=10}}`);
    assert.equal(this.element.querySelectorAll('svg').length, 10);
  });

  test('stars are updated if rating has changed', async function(assert) {
    assert.expect(2);
    this.set('rating', 3);
    await render(hbs`{{star-rating rating}}`);
    assert.equal(this.element.querySelectorAll('.star-full').length, 3);
    this.set('rating', 5);
    assert.equal(this.element.querySelectorAll('.star-full').length, 5);
  });

  test('can support any percentage', async function(assert) {
    assert.expect(2);
    await render(hbs`{{star-rating 3.28 anyPercent=true}}`);
    assert.equal(this.element.querySelectorAll('stop[offset="28%"]').length, 1);
    assert.equal(this.element.querySelectorAll('.star-variable').length, 1);
  });
});
