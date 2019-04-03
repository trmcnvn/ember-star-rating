import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import { getOwner } from '@ember/application';
import { scheduleOnce } from '@ember/runloop';
import { htmlSafe } from '@ember/string';
import layout from '../templates/components/star-rating';

const StarRating = Component.extend({
  // Template
  layout,
  classNameBindings: ['className'],
  attributeBindings: ['wrapperStyle:style'],

  // General Options
  rating: 0,
  numStars: 5,
  readOnly: false,
  anyPercent: false,
  wholeOnly: false,
  useHalfStars: true,

  // Event Callbacks
  onHover: () => {},
  onClick: () => {},

  // SVG Options
  width: 26,
  height: 26,
  viewBox: '0 0 26 26',
  svgPath:
    'M25.326,10.137c-0.117-0.361-0.431-0.625-0.807-0.68l-7.34-1.066l-3.283-6.651 c-0.337-0.683-1.456-0.683-1.793,0L8.82,8.391L1.48,9.457c-0.376,0.055-0.689,0.318-0.807,0.68c-0.117,0.363-0.02,0.76,0.253,1.025 l5.312,5.178l-1.254,7.31c-0.064,0.375,0.09,0.755,0.397,0.978c0.309,0.225,0.717,0.254,1.054,0.076L13,21.252l6.564,3.451 c0.146,0.077,0.307,0.115,0.466,0.115c0.207,0,0.413-0.064,0.588-0.191c0.308-0.223,0.462-0.603,0.397-0.978l-1.254-7.31 l5.312-5.178C25.346,10.896,25.443,10.5,25.326,10.137z',
  fillColor: 'yellow',
  baseColor: 'lightgrey',

  // Determine if we are invoked under a FastBoot process
  isFastBoot: computed(function() {
    return getOwner(this).lookup('service:fastboot');
  }),

  className: computed('rating', function() {
    return get(this, 'rating') > 0 ? 'has-rating' : '';
  }),

  wrapperStyle: computed('readOnly', function() {
    let style = 'display: inline-block; user-select: none;';
    if (!get(this, 'readOnly')) {
      style = `${style} cursor: pointer;`;
    }
    return htmlSafe(style);
  }),

  init() {
    this._super(...arguments);
    const count = get(this, 'numStars');
    const stars = Array.apply(null, { length: count }).map(() => 1);
    set(this, 'stars', stars);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    if (get(this, 'isFastBoot')) {
      return;
    }
    scheduleOnce('afterRender', () => {
      const rating = get(this, 'rating');
      this._updateStars(rating);
    });
  },

  // Component Events
  mouseMove(event) {
    const rating = this._render(event);
    get(this, 'onHover')(rating || 0);
  },

  mouseLeave(event) {
    const rating = this._reset(event);
    get(this, 'onHover')(rating || 0);
  },

  click(event) {
    const rating = this._update(event);
    get(this, 'onClick')(rating || 0);
  },

  touchStart(event) {
    this._render(event);
  },

  touchMove(event) {
    this._render(event);
  },

  touchEnd(event) {
    event.preventDefault();
    const rating = this._update(event);
    this._render(event);
    get(this, 'onClick')(rating || 0);
  },

  // Rating Functions
  _render({ pageX }) {
    if (get(this, 'readOnly')) {
      return;
    }
    const target = this._getTarget(pageX);
    const rating = Math.floor(target * 2) / 2;
    this._updateStars(rating);
    this.element.classList.remove('has-rating');
    this.element.classList.add('is-rating');
    return rating;
  },

  _reset() {
    if (get(this, 'readOnly')) {
      return;
    }
    const rating = get(this, 'rating');
    this._updateStars(Math.floor(rating * 2) / 2);
    this.element.classList.remove('is-rating');
    if (rating > 0) {
      this.element.classList.add('has-rating');
    }
    return rating;
  },

  _update({ pageX }) {
    if (get(this, 'readOnly')) {
      return;
    }
    const target = this._getTarget(pageX);
    const rating = Math.floor(target * 2) / 2;
    if (get(this, 'wholeOnly')) {
      return Math.ceil(rating);
    }
    return rating;
  },

  _getTarget(x) {
    const numStars = get(this, 'numStars');
    const offsetLeft = this.element.getBoundingClientRect().left;
    const elementWidth = parseInt(getComputedStyle(this.element).width, 10);
    console.log(offsetLeft, elementWidth);
    let numStarsFilled = (numStars * (x - offsetLeft)) / elementWidth + 0.5;
    if (numStarsFilled > numStars) {
      numStarsFilled = numStars;
    }
    if (get(this, 'useHalfStars')) {
      return numStarsFilled;
    }
    return Math.ceil(numStarsFilled - 0.5);
  },

  _getOffset(rating, index) {
    const value = rating - index;
    if (get(this, 'useHalfStars')) {
      if (value > -0.01) {
        return '100%';
      } else if (value > -0.51) {
        return '50%';
      }
      return '0%';
    }
    return value > -0.51 ? '100%' : '0%';
  },

  _updateStars(rating) {
    const elements = this.element.getElementsByTagName('svg');
    for (let index = 0; index < elements.length; index++) {
      const element = elements[index];
      let offset = 0;
      if (get(this, 'anyPercent')) {
        offset =
          rating - index > 0
            ? rating - index > 1
              ? '100%'
              : `${((rating - index) * 100).toFixed(0)}%`
            : '0%';
      } else {
        offset = this._getOffset(rating, index + 1);
      }

      if (get(this, 'wholeOnly')) {
        rating = Math.ceil(rating);
      }

      const stopElement = element.getElementsByTagName('stop')[0];
      stopElement.setAttribute('offset', offset);
      let className =
        offset === '100%'
          ? 'star-full'
          : offset === '50%'
          ? 'star-half'
          : 'star-empty';
      if (
        get(this, 'anyPercent') &&
        className === 'star-empty' &&
        offset !== '0%'
      ) {
        className = 'star-variable';
      }
      element.setAttribute('class', className);
    }
  }
});

StarRating.reopenClass({
  positionalParams: ['rating']
});

export default StarRating;
