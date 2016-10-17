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

  init() {
    this._super(...arguments);
    const stars = [];
    for (let i = 0; i < get(this, 'numStars'); ++i) {
      stars.push(0);
    }
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
    if (get(this, 'readOnly')) {
      return;
    }
    const target = this._getTarget(event.pageX);
    const rating = Math.floor(target * 2) / 2;
    this._updateStars(rating);
  },

  mouseLeave() {
    if (get(this, 'readOnly')) {
      return;
    }
    const rating = get(this, 'rating');
    this._updateStars(Math.floor(rating * 2) / 2);
  },

  click(event) {
    if (get(this, 'readOnly')) {
      return;
    }
    const target = this._getTarget(event.pageX);
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
    this.$().find('svg').each((index, elem) => {
      const offset = this._getStarOffset(rating, index + 1);
      this.$(elem).find('stop').eq(0).attr('offset', offset);
    });
  }
});

RatingComponent.reopenClass({
  positionalParams: ['rating']
});

export default RatingComponent;
