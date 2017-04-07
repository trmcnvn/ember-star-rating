import Component from 'ember-component';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import { scheduleOnce } from 'ember-runloop';
import { invokeAction } from 'ember-invoke-action';
import layout from '../templates/components/star-rating';

const RatingComponent = Component.extend({
  layout,

  fillColor: 'yellow',
  baseColor: 'lightgrey',
  numStars: 5,
  anyPercent: false,
  rating: 0,
  readOnly: false,
  width: 26,
  height: 26,
  useHalfStars: true,
  svgPath: 'M25.326,10.137c-0.117-0.361-0.431-0.625-0.807-0.68l-7.34-1.066l-3.283-6.651 c-0.337-0.683-1.456-0.683-1.793,0L8.82,8.391L1.48,9.457c-0.376,0.055-0.689,0.318-0.807,0.68c-0.117,0.363-0.02,0.76,0.253,1.025 l5.312,5.178l-1.254,7.31c-0.064,0.375,0.09,0.755,0.397,0.978c0.309,0.225,0.717,0.254,1.054,0.076L13,21.252l6.564,3.451 c0.146,0.077,0.307,0.115,0.466,0.115c0.207,0,0.413-0.064,0.588-0.191c0.308-0.223,0.462-0.603,0.397-0.978l-1.254-7.31 l5.312-5.178C25.346,10.896,25.443,10.5,25.326,10.137z',
  viewBox: '0 0 26 26',

  init() {
    this._super(...arguments);
    const num = get(this, 'numStars');
    const stars = Array.apply(null, { length: num }).map(() => 1);
    set(this, 'stars', stars);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    scheduleOnce('afterRender', () => this.$().removeClass('has-rating'));
    if (get(this, 'rating') > 0) {
      scheduleOnce('afterRender', () => this.$().addClass('has-rating'));
    }
    scheduleOnce('afterRender', () => {
      const rating = get(this, 'rating');
      this._updateStars(rating);
    });
  },

  didInsertElement() {
    this._super(...arguments);
    this.$().css('display', 'inline-block');
    if (get(this, 'readOnly') === false) {
      this.$().css('cursor', 'pointer');
    }
  },

  mouseMove(event) {
    this._render(event);
  },

  mouseLeave() {
    this._reset();
  },

  click(event) {
    this._update(event);
  },

  _render(event) {
    if (get(this, 'readOnly')) {
      return;
    }
    const pageX = event.pageX;
    const target = this._getTarget(pageX);
    const rating = Math.floor(target * 2) / 2;
    this._updateStars(rating);
    this.$().removeClass('has-rating').addClass('is-rating');
  },

  _reset() {
    if (get(this, 'readOnly')) {
      return;
    }
    const rating = get(this, 'rating');
    this._updateStars(Math.floor(rating * 2) / 2);
    this.$().removeClass('is-rating');
    if (rating > 0) {
      this.$().addClass('has-rating');
    }
  },

  _update(event) {
    if (get(this, 'readOnly')) {
      return;
    }
    const pageX = event.pageX;
    const target = this._getTarget(pageX);
    const rating = Math.floor(target * 2) / 2;
    invokeAction(this, 'onClick', rating);
  },

  _getTarget(x) {
    const numStars = get(this, 'numStars');
    const numStarsFilled = (numStars * (x - this.$().offset().left) / this.$().width() + 0.5);
    if (get(this, 'useHalfStars')) {
      return numStarsFilled;
    }
    return Math.ceil(numStarsFilled - 0.5);
  },

  _getStarOffset(rating, index) {
    const result = rating - index;
    if (get(this, 'useHalfStars')) {
      if (result > -0.01) {
        return '100%';
      } else if (result > -0.51) {
        return '50%';
      } else {
        return '0%';
      }
    } else {
      if (result > -0.51) {
        return '100%';
      } else {
        return '0%';
      }
    }
  },

  _updateStars(rating) {
    this.$().find('> svg').each((index, elem) => {
      let offset = 0;
      if (get(this, 'anyPercent') === true) {
        offset = (rating - index) > 0 ? ((rating - index) > 1 ? '100%' : `${((rating - index) * 100).toFixed(0)}%`) : '0%';
      } else {
        offset = this._getStarOffset(rating, index + 1);
      }
      this.$(elem).find('stop').eq(0).attr('offset', offset);
      let klass = offset === '100%' ? 'star-full' : (offset === '50%' ? 'star-half' : 'star-empty');
      if (get(this, 'anyPercent') === true && klass === 'star-empty' && offset !== '0%') {
        klass = 'star-variable';
      }
      this.$(elem).attr('class', '').attr('class', klass);
    });
  }
});

RatingComponent.reopenClass({
  positionalParams: ['rating']
});

export default RatingComponent;
