# ember-star-rating

[![npm version](https://badge.fury.io/js/ember-star-rating.svg)](http://badge.fury.io/js/ember-star-rating)
[![Build Status](https://travis-ci.org/vevix/ember-star-rating.svg?branch=master)](https://travis-ci.org/vevix/ember-star-rating)

An [ember.js](http://www.emberjs.com) component for star ratings using svgs!

Check out the demo [here](http://vevix.net/ember-star-rating)

### Installing the Add-on

In your application's directory:
```bash
$ ember install ember-star-rating
```

### Using the Add-on

Use the component in your Handlebars templates:

```hbs
{{star-rating 2.5}}
```

#### Actions

```hbs
{{star-rating
  onClick=(action ...)
}}
```

#### Configuration

```hbs
{{star-rating
  numStars=N
  readOnly=false/true
  baseColor="#fff"
  fillColor="#000"
  width=N
  height=N
}}
```

### License

[MIT](https://github.com/vevix/ember-star-rating/blob/master/LICENSE.md)
