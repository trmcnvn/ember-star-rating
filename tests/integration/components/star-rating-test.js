import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { tap } from '@ember/test-helpers';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('star-rating', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders with default options', async function(assert) {
    await render(hbs`{{star-rating}}`);
    assert.dom('svg').exists({ count: 5 });
  });

  test('variable amount of stars', async function(assert) {
    await render(hbs`{{star-rating numStars=10}}`);
    assert.dom('svg').exists({ count: 10 });
  });

  test('updates if property is changed', async function(assert) {
    this.set('rating', 3);
    await render(hbs`{{star-rating rating}}`);
    assert.dom('.star-full').exists({ count: 3 });

    this.set('rating', 5);
    assert.dom('.star-full').exists({ count: 5 });
  });

  test('support variable rating amount', async function(assert) {
    await render(hbs`{{star-rating 3.28 anyPercent=true}}`);
    assert.dom('stop[offset="28%"]').exists();
    assert.dom('.star-variable').exists();
  });

  test('touch events', async function(assert) {
    this.set('rating', 0);
    this.set('onClick', () => this.set('rating', 3));
    await render(hbs`{{star-rating rating=rating onClick=onClick}}`);
    assert.dom('.star-empty').exists({ count: 5 });

    await tap(this.element.querySelector('svg'));
    assert.dom('.star-full').exists({ count: 3 });
  });
});
