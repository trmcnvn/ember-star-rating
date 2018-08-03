import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | star-rating', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{star-rating count=25}}`);
    assert.dom('.star-rating__item').exists({ count: 25 });
  });

  test('it fires the action on click', async function(assert) {
    assert.expect(1);

    this.set('onRating', () => assert.ok(true));
    await render(hbs`{{star-rating onRating=onRating}}`);
    await click('.star-rating__item');
  });

  test('it can be read-only', async function(assert) {
    assert.expect(1);

    this.set('onRating', () => assert.ok(true));
    await render(hbs`{{star-rating readOnly=true onRating=onRating}}`);

    assert.dom('.star-rating').hasClass('star-rating--read-only');
    await click('.star-rating__item');
  });
});
