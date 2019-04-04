# ember-star-rating

[![npm version](https://badge.fury.io/js/ember-star-rating.svg)](http://badge.fury.io/js/ember-star-rating)
[![Build Status](https://travis-ci.org/trmcnvn/ember-star-rating.svg?branch=master)](https://travis-ci.org/trmcnvn/ember-star-rating)

[Ember.js](http://www.emberjs.com) component for ratings.

Check out the dummy app [here](http://vevix.net/ember-star-rating)

### Installing the Add-on

In your application's directory:

```bash
$ ember install ember-star-rating
```

### Using the Add-on

Use the component in your template:

```hbs
<StarRating @rating={{rating}} />
```

or with positional params.

```hbs
{{star-rating rating}}
```

### Configuration

| Option       | Type     | Default     | Info                                                                                              |
| ------------ | -------- | ----------- | ------------------------------------------------------------------------------------------------- |
| rating       | Number   | 0           | The current rating value                                                                          |
| numStars     | Number   | 5           | The number of "stars" to render                                                                   |
| readOnly     | Boolean  | false       | Whether the component can be edited or not                                                        |
| anyPercent   | Boolean  | false       | Allow setting a rating to any percentage. Example: `3.2`                                          |
| wholeOnly    | Boolean  | false       | Only allow integer rating values. Example: `1 - 5`                                                |
| useHalfStars | Boolean  | true        | Allow half rating values. Example: `2.5`                                                          |
| onHover      | Function | NOOP        | Called on the `mouseMove` and `mouseLeave` events with the rating value at the time.              |
| onClick      | Function | NOOP        | Called when the user selects a rating value. This is still invoked when `readOnly` is set to true |
| width        | Number   | 26          | Width of the SVG element                                                                          |
| height       | Number   | 26          | Height of the SVG element                                                                         |
| viewBox      | String   | '0 0 26 26' | ViewBox of the SVG element                                                                        |
| svgPath      | String   | '...'       | Path value of the SVG element                                                                     |
| fillColor    | String   | 'yellow'    | Color of the SVG element that is considered full (has a rating)                                   |
| baseColor    | String   | 'lightgrey' | Color of the SVG element that is considered empty                                                 |

### License

[See LICENSE.md](https://github.com/trmcnvn/ember-star-rating/blob/master/LICENSE.md)
