import Component from 'ember-component';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import layout from '../templates/components/star-rating';

const RatingComponent = Component.extend({
  layout,

  fillColor: 'yellow',
  baseColor: 'lightgrey',
  numStars: 5,
  rating: 0,
  readOnly: false,
  width: 30,
  height: 30,

  isTouching: false,

  init() {
    this._super(...arguments);
    const num = get(this, 'numStars');
    const stars = Array.apply(null, { length: num }).map(() => 1);
    set(this, 'stars', stars);
  },

  didInsertElement() {
    this._super(...arguments);
    this.$().css('display', 'inline-block');
    if (!get(this, 'readOnly')) {
      this.$().css('cursor', 'pointer')
    }
    const rating = get(this, 'rating');
    this._updateStars(rating);
  },

  mouseMove(event) {
    this._render(event);
  },

  mouseLeave() {
    this._reset();
  },

  touchMove(event) {
    set(this, 'isTouching', true);
    this._render(event);
  },

  touchEnd(event) {
    if (!get(this, 'isTouching')) {
      return;
    }
    set(this, 'isTouching', false);
    this._update(event);
  },

  click(event) {
    this._update(event);
  },

  _render(event) {
    if (get(this, 'readOnly')) {
      return;
    }

    let pageX = event.pageX;
    if (event.touches !== undefined) {
      const touch = event.touches[0];
      pageX = touch.pageX;
    }

    const target = this._getTarget(pageX);
    const rating = Math.floor(target * 2) / 2;
    this._updateStars(rating);
  },

  _reset() {
    if (get(this, 'readOnly')) {
      return;
    }
    const rating = get(this, 'rating');
    this._updateStars(Math.floor(rating * 2) / 2);
  },

  _update(event) {
    if (get(this, 'readOnly')) {
      return;
    }

    let pageX = event.pageX;
    if (event.changedTouches !== undefined) {
      const touch = event.changedTouches[0];
      pageX = touch.pageX;
    }

    const target = this._getTarget(pageX);
    const rating = Math.floor(target * 2) / 2;
    get(this, 'onClick')(rating);
  },

  _getTarget(x) {
    const numStars = get(this, 'numStars');
    return (numStars * (x - this.$().offset().left) / this.$().width() + 0.5);
  },

  _getStarOffset(rating, index) {
    const result = rating - index;
    if (result > -0.01) {
      return '100%';
    } else if (result > -0.51) {
      return '50%';
    } else {
      return '0%';
    }
  },

  _updateStars(rating) {
    this.$().find('> svg').each((index, elem) => {
      const offset = this._getStarOffset(rating, index + 1);
      this.$(elem).find('stop').eq(0).attr('offset', offset);
    });
  }
});

RatingComponent.reopenClass({
  positionalParams: ['rating']
});

export default RatingComponent;
