"use strict";



define('dummy/app', ['exports', 'dummy/resolver', 'ember-load-initializers', 'dummy/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('dummy/components/star-rating', ['exports', 'ember-star-rating/components/star-rating'], function (exports, _starRating) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _starRating.default;
    }
  });
});
define('dummy/controllers/application', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    rating: 3.5,
    updateableRating: 3,

    init: function init() {
      var _this = this;

      this._super.apply(this, arguments);
      Ember.run.later(function () {
        return Ember.set(_this, 'updateableRating', 5);
      }, 3000);
    },


    actions: {
      setRating: function setRating(rating) {
        Ember.set(this, 'rating', rating);
        window.alert('Rating set to ' + rating);
      }
    }
  });
});
define('dummy/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('dummy/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('dummy/router', ['exports', 'dummy/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {});

  exports.default = Router;
});
define("dummy/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "zZhlXFZT", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[7],[0,\"\\n  \"],[6,\"h1\"],[7],[0,\"Editable\"],[8],[0,\"\\n  \"],[1,[25,\"star-rating\",[[20,[\"rating\"]]],[[\"onClick\"],[[25,\"action\",[[19,0,[]],\"setRating\"],null]]]],false],[0,\"\\n\"],[8],[0,\"\\n\"],[6,\"div\"],[7],[0,\"\\n  \"],[6,\"h1\"],[7],[0,\"Whole Numbers\"],[8],[0,\"\\n  \"],[1,[25,\"star-rating\",[[20,[\"rating\"]]],[[\"onClick\",\"wholeOnly\"],[[25,\"action\",[[19,0,[]],\"setRating\"],null],true]]],false],[0,\"\\n\"],[8],[0,\"\\n\"],[6,\"div\"],[7],[0,\"\\n  \"],[6,\"h1\"],[7],[0,\"Readonly\"],[8],[0,\"\\n  \"],[1,[25,\"star-rating\",[2.5],[[\"readOnly\"],[true]]],false],[0,\"\\n\"],[8],[0,\"\\n\"],[6,\"div\"],[7],[0,\"\\n  \"],[6,\"h1\"],[7],[0,\"didReceiveAttrs\"],[8],[0,\"\\n  \"],[1,[25,\"star-rating\",[[20,[\"updateableRating\"]]],[[\"readOnly\"],[true]]],false],[0,\"\\n\"],[8],[0,\"\\n\"],[6,\"div\"],[7],[0,\"\\n  \"],[6,\"h1\"],[7],[0,\"Any Percent\"],[8],[0,\"\\n  \"],[1,[25,\"star-rating\",[3.7],[[\"readOnly\",\"anyPercent\"],[true,true]]],false],[0,\"\\n  \"],[6,\"br\"],[7],[8],[0,\"\\n  \"],[1,[25,\"star-rating\",[2.2],[[\"readOnly\",\"anyPercent\"],[true,true]]],false],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "dummy/templates/application.hbs" } });
});


define('dummy/config/environment', [], function() {
  var prefix = 'dummy';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("dummy/app")["default"].create({});
}
