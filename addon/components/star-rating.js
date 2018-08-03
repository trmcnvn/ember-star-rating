import Component from '@ember/component';
import layout from '../templates/components/star-rating';
import { A } from '@ember/array';

const rAF = (typeof window === 'object') && typeof window.requestAnimationFrame === 'function' ? window.requestAnimationFrame : (callback) => setTimeout(callback);

export default Component.extend({
  layout,
  classNames: ['star-rating'],
  classNameBindings: ['readOnly:star-rating--read-only'],

  count: 5,
  fullStars: false,
  readOnly: false,
  onRating: () => {},

  click(event) {
    if (this.readOnly) { return; }
    const { pageX } = event;

    rAF(() => {
      let position = (this.count * (pageX - this.element.offsetLeft) / this.element.clientWidth + 0.5);
      if (this.fullStars) { position = Math.ceil(position - 0.5); }

      let rating = Math.floor(position * 2) / 2;
      if (this.fullStars) { rating = Math.ceil(rating); }

      this.onRating(rating || 0);
    });
  },

  init() {
    this._super(...arguments);
    this.set('stars', A([]));
  },

  didReceiveAttrs() {
    if (!this.stars || this.stars.length !== this.count) {
      const stars = Array.apply(null, { length: this.count }).map(() => 1);
      this.stars.clear();
      this.stars.push(...stars);
    }
  }
});
