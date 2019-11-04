"use strict"
define("dummy/app",["exports","dummy/resolver","ember-load-initializers","dummy/config/environment"],(function(e,t,n,r){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=Ember.Application.extend({modulePrefix:r.default.modulePrefix,podModulePrefix:r.default.podModulePrefix,Resolver:t.default});(0,n.default)(a,r.default.modulePrefix)
var i=a
e.default=i})),define("dummy/components/star-rating",["exports","ember-star-rating/components/star-rating"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("dummy/controllers/application",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Controller.extend({rating:3.5,updateableRating:3,init:function(){var e=this
this._super.apply(this,arguments),Ember.run.later((function(){return Ember.set(e,"updateableRating",5)}),3e3)},actions:{setRating:function(e){Ember.set(this,"rating",e),window.alert("Rating set to ".concat(e))}}})
e.default=t})),define("dummy/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}
e.default=n})),define("dummy/resolver",["exports","ember-resolver"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default
e.default=n})),define("dummy/router",["exports","dummy/config/environment"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Router.extend({location:t.default.locationType,rootURL:t.default.rootURL})
n.map((function(){}))
var r=n
e.default=r})),define("dummy/templates/application",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"y6Cn74Nd",block:'{"symbols":[],"statements":[[7,"div",true],[8],[0,"\\n  "],[7,"h1",true],[8],[0,"Editable"],[9],[0,"\\n  "],[1,[28,"star-rating",[[24,["rating"]]],[["onClick"],[[28,"action",[[23,0,[]],"setRating"],null]]]],false],[0,"\\n"],[9],[0,"\\n"],[7,"div",true],[8],[0,"\\n  "],[7,"h1",true],[8],[0,"Whole Numbers"],[9],[0,"\\n  "],[1,[28,"star-rating",[[24,["rating"]]],[["onClick","wholeOnly"],[[28,"action",[[23,0,[]],"setRating"],null],true]]],false],[0,"\\n"],[9],[0,"\\n"],[7,"div",true],[8],[0,"\\n  "],[7,"h1",true],[8],[0,"Readonly"],[9],[0,"\\n  "],[1,[28,"star-rating",[2.5],[["readOnly"],[true]]],false],[0,"\\n"],[9],[0,"\\n"],[7,"div",true],[8],[0,"\\n  "],[7,"h1",true],[8],[0,"didReceiveAttrs"],[9],[0,"\\n  "],[1,[28,"star-rating",[[24,["updateableRating"]]],[["readOnly"],[true]]],false],[0,"\\n"],[9],[0,"\\n"],[7,"div",true],[8],[0,"\\n  "],[7,"h1",true],[8],[0,"Any Percent"],[9],[0,"\\n  "],[1,[28,"star-rating",[3.7],[["readOnly","anyPercent"],[true,true]]],false],[0,"\\n  "],[7,"br",true],[8],[9],[0,"\\n  "],[1,[28,"star-rating",[2.2],[["readOnly","anyPercent"],[true,true]]],false],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"dummy/templates/application.hbs"}})
e.default=t})),define("dummy/config/environment",[],(function(){try{var e="dummy/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),n={default:JSON.parse(decodeURIComponent(t))}
return Object.defineProperty(n,"__esModule",{value:!0}),n}catch(r){throw new Error('Could not read config from meta tag with name "'+e+'".')}})),runningTests||require("dummy/app").default.create({})
