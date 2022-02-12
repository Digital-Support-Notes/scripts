/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

    "use strict";


    /*
      MIT License http://www.opensource.org/licenses/mit-license.php
      Author Tobias Koppers @sokra
    */
    // css base code, injected by the css-loader
    // eslint-disable-next-line func-names
    module.exports = function (useSourceMap) {
      var list = []; // return the list of modules as css string
    
      list.toString = function toString() {
        return this.map(function (item) {
          var content = cssWithMappingToString(item, useSourceMap);
    
          if (item[2]) {
            return "@media ".concat(item[2], " {").concat(content, "}");
          }
    
          return content;
        }).join('');
      }; // import a list of modules into the list
      // eslint-disable-next-line func-names
    
    
      list.i = function (modules, mediaQuery, dedupe) {
        if (typeof modules === 'string') {
          // eslint-disable-next-line no-param-reassign
          modules = [[null, modules, '']];
        }
    
        var alreadyImportedModules = {};
    
        if (dedupe) {
          for (var i = 0; i < this.length; i++) {
            // eslint-disable-next-line prefer-destructuring
            var id = this[i][0];
    
            if (id != null) {
              alreadyImportedModules[id] = true;
            }
          }
        }
    
        for (var _i = 0; _i < modules.length; _i++) {
          var item = [].concat(modules[_i]);
    
          if (dedupe && alreadyImportedModules[item[0]]) {
            // eslint-disable-next-line no-continue
            continue;
          }
    
          if (mediaQuery) {
            if (!item[2]) {
              item[2] = mediaQuery;
            } else {
              item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
            }
          }
    
          list.push(item);
        }
      };
    
      return list;
    };
    
    function cssWithMappingToString(item, useSourceMap) {
      var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring
    
      var cssMapping = item[3];
    
      if (!cssMapping) {
        return content;
      }
    
      if (useSourceMap && typeof btoa === 'function') {
        var sourceMapping = toComment(cssMapping);
        var sourceURLs = cssMapping.sources.map(function (source) {
          return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
        });
        return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
      }
    
      return [content].join('\n');
    } // Adapted from convert-source-map (MIT)
    
    
    function toComment(sourceMap) {
      // eslint-disable-next-line no-undef
      var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
      var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
      return "/*# ".concat(data, " */");
    }
    
    /***/ }),
    /* 1 */
    /***/ (function(module, exports, __webpack_require__) {
    
    /*
        MIT License http://www.opensource.org/licenses/mit-license.php
        Author Tobias Koppers @sokra
    */
    
    var stylesInDom = {};
    
    var	memoize = function (fn) {
        var memo;
    
        return function () {
            if (typeof memo === "undefined") memo = fn.apply(this, arguments);
            return memo;
        };
    };
    
    var isOldIE = memoize(function () {
        // Test for IE <= 9 as proposed by Browserhacks
        // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
        // Tests for existence of standard globals is to allow style-loader
        // to operate correctly into non-standard environments
        // @see https://github.com/webpack-contrib/style-loader/issues/177
        return window && document && document.all && !window.atob;
    });
    
    var getElement = (function (fn) {
        var memo = {};
    
        return function(selector) {
            if (typeof memo[selector] === "undefined") {
                var styleTarget = fn.call(this, selector);
                // Special case to return head of iframe instead of iframe itself
                if (styleTarget instanceof window.HTMLIFrameElement) {
                    try {
                        // This will throw an exception if access to iframe is blocked
                        // due to cross-origin restrictions
                        styleTarget = styleTarget.contentDocument.head;
                    } catch(e) {
                        styleTarget = null;
                    }
                }
                memo[selector] = styleTarget;
            }
            return memo[selector]
        };
    })(function (target) {
        return document.querySelector(target)
    });
    
    var singleton = null;
    var	singletonCounter = 0;
    var	stylesInsertedAtTop = [];
    
    var	fixUrls = __webpack_require__(7);
    
    module.exports = function(list, options) {
        if (typeof DEBUG !== "undefined" && DEBUG) {
            if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
        }
    
        options = options || {};
    
        options.attrs = typeof options.attrs === "object" ? options.attrs : {};
    
        // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
        // tags it will allow on a page
        if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();
    
        // By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";
    
        // By default, add <style> tags to the bottom of the target
        if (!options.insertAt) options.insertAt = "bottom";
    
        var styles = listToStyles(list, options);
    
        addStylesToDom(styles, options);
    
        return function update (newList) {
            var mayRemove = [];
    
            for (var i = 0; i < styles.length; i++) {
                var item = styles[i];
                var domStyle = stylesInDom[item.id];
    
                domStyle.refs--;
                mayRemove.push(domStyle);
            }
    
            if(newList) {
                var newStyles = listToStyles(newList, options);
                addStylesToDom(newStyles, options);
            }
    
            for (var i = 0; i < mayRemove.length; i++) {
                var domStyle = mayRemove[i];
    
                if(domStyle.refs === 0) {
                    for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();
    
                    delete stylesInDom[domStyle.id];
                }
            }
        };
    };
    
    function addStylesToDom (styles, options) {
        for (var i = 0; i < styles.length; i++) {
            var item = styles[i];
            var domStyle = stylesInDom[item.id];
    
            if(domStyle) {
                domStyle.refs++;
    
                for(var j = 0; j < domStyle.parts.length; j++) {
                    domStyle.parts[j](item.parts[j]);
                }
    
                for(; j < item.parts.length; j++) {
                    domStyle.parts.push(addStyle(item.parts[j], options));
                }
            } else {
                var parts = [];
    
                for(var j = 0; j < item.parts.length; j++) {
                    parts.push(addStyle(item.parts[j], options));
                }
    
                stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
            }
        }
    }
    
    function listToStyles (list, options) {
        var styles = [];
        var newStyles = {};
    
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var id = options.base ? item[0] + options.base : item[0];
            var css = item[1];
            var media = item[2];
            var sourceMap = item[3];
            var part = {css: css, media: media, sourceMap: sourceMap};
    
            if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
            else newStyles[id].parts.push(part);
        }
    
        return styles;
    }
    
    function insertStyleElement (options, style) {
        var target = getElement(options.insertInto)
    
        if (!target) {
            throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
        }
    
        var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];
    
        if (options.insertAt === "top") {
            if (!lastStyleElementInsertedAtTop) {
                target.insertBefore(style, target.firstChild);
            } else if (lastStyleElementInsertedAtTop.nextSibling) {
                target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
            } else {
                target.appendChild(style);
            }
            stylesInsertedAtTop.push(style);
        } else if (options.insertAt === "bottom") {
            target.appendChild(style);
        } else if (typeof options.insertAt === "object" && options.insertAt.before) {
            var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
            target.insertBefore(style, nextSibling);
        } else {
            throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
        }
    }
    
    function removeStyleElement (style) {
        if (style.parentNode === null) return false;
        style.parentNode.removeChild(style);
    
        var idx = stylesInsertedAtTop.indexOf(style);
        if(idx >= 0) {
            stylesInsertedAtTop.splice(idx, 1);
        }
    }
    
    function createStyleElement (options) {
        var style = document.createElement("style");
    
        options.attrs.type = "text/css";
    
        addAttrs(style, options.attrs);
        insertStyleElement(options, style);
    
        return style;
    }
    
    function createLinkElement (options) {
        var link = document.createElement("link");
    
        options.attrs.type = "text/css";
        options.attrs.rel = "stylesheet";
    
        addAttrs(link, options.attrs);
        insertStyleElement(options, link);
    
        return link;
    }
    
    function addAttrs (el, attrs) {
        Object.keys(attrs).forEach(function (key) {
            el.setAttribute(key, attrs[key]);
        });
    }
    
    function addStyle (obj, options) {
        var style, update, remove, result;
    
        // If a transform function was defined, run it on the css
        if (options.transform && obj.css) {
            result = options.transform(obj.css);
    
            if (result) {
                // If transform returns a value, use that instead of the original css.
                // This allows running runtime transformations on the css.
                obj.css = result;
            } else {
                // If the transform function returns a falsy value, don't add this css.
                // This allows conditional loading of css
                return function() {
                    // noop
                };
            }
        }
    
        if (options.singleton) {
            var styleIndex = singletonCounter++;
    
            style = singleton || (singleton = createStyleElement(options));
    
            update = applyToSingletonTag.bind(null, style, styleIndex, false);
            remove = applyToSingletonTag.bind(null, style, styleIndex, true);
    
        } else if (
            obj.sourceMap &&
            typeof URL === "function" &&
            typeof URL.createObjectURL === "function" &&
            typeof URL.revokeObjectURL === "function" &&
            typeof Blob === "function" &&
            typeof btoa === "function"
        ) {
            style = createLinkElement(options);
            update = updateLink.bind(null, style, options);
            remove = function () {
                removeStyleElement(style);
    
                if(style.href) URL.revokeObjectURL(style.href);
            };
        } else {
            style = createStyleElement(options);
            update = applyToTag.bind(null, style);
            remove = function () {
                removeStyleElement(style);
            };
        }
    
        update(obj);
    
        return function updateStyle (newObj) {
            if (newObj) {
                if (
                    newObj.css === obj.css &&
                    newObj.media === obj.media &&
                    newObj.sourceMap === obj.sourceMap
                ) {
                    return;
                }
    
                update(obj = newObj);
            } else {
                remove();
            }
        };
    }
    
    var replaceText = (function () {
        var textStore = [];
    
        return function (index, replacement) {
            textStore[index] = replacement;
    
            return textStore.filter(Boolean).join('\n');
        };
    })();
    
    function applyToSingletonTag (style, index, remove, obj) {
        var css = remove ? "" : obj.css;
    
        if (style.styleSheet) {
            style.styleSheet.cssText = replaceText(index, css);
        } else {
            var cssNode = document.createTextNode(css);
            var childNodes = style.childNodes;
    
            if (childNodes[index]) style.removeChild(childNodes[index]);
    
            if (childNodes.length) {
                style.insertBefore(cssNode, childNodes[index]);
            } else {
                style.appendChild(cssNode);
            }
        }
    }
    
    function applyToTag (style, obj) {
        var css = obj.css;
        var media = obj.media;
    
        if(media) {
            style.setAttribute("media", media)
        }
    
        if(style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            while(style.firstChild) {
                style.removeChild(style.firstChild);
            }
    
            style.appendChild(document.createTextNode(css));
        }
    }
    
    function updateLink (link, options, obj) {
        var css = obj.css;
        var sourceMap = obj.sourceMap;
    
        /*
            If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
            and there is no publicPath defined then lets turn convertToAbsoluteUrls
            on by default.  Otherwise default to the convertToAbsoluteUrls option
            directly
        */
        var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;
    
        if (options.convertToAbsoluteUrls || autoFixUrls) {
            css = fixUrls(css);
        }
    
        if (sourceMap) {
            // http://stackoverflow.com/a/26603875
            css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
        }
    
        var blob = new Blob([css], { type: "text/css" });
    
        var oldSrc = link.href;
    
        link.href = URL.createObjectURL(blob);
    
        if(oldSrc) URL.revokeObjectURL(oldSrc);
    }
    
    
    /***/ }),
    /* 2 */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {
    
    "use strict";
    Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_widget__ = __webpack_require__(3);
    
    var supportedAPI = ['init', 'message']; // enlist all methods supported by API (e.g. `hw('event', 'user-login');`)
    
    /**
      The main entry of the application
      */
    
    function app(window) {
      console.log('help-widget starting'); // set default configurations
    
      var configurations = {}; // all methods that were called till now and stored in queue
      // needs to be called now 
    
      var globalObject = window[window['help-widget']];
      var queue = globalObject.q;
    
      if (queue) {
        for (var i = 0; i < queue.length; i++) {
          if (queue[i][0].toLowerCase() == 'init') {
            configurations = extendObject(configurations, queue[i][1]);
          } else apiHandler(queue[i][0], queue[i][1]);
        }
      } // override temporary (until the app loaded) handler
      // for widget's API calls
    
    
      globalObject = apiHandler;
      globalObject.configurations = configurations;
    }
    /**
        Method that handles all API calls
        */
    
    
    function apiHandler(api, params) {
      if (!api) throw Error('API method required');
      api = api.toLowerCase();
      if (supportedAPI.indexOf(api) === -1) throw Error("Method ".concat(api, " is not supported"));
      console.log("Handling API call ".concat(api), params);
    
      switch (api) {
        // TODO: add API implementation
        case 'message':
          Object(__WEBPACK_IMPORTED_MODULE_0__views_widget__["a" /* show */])(params);
          break;
    
        default:
          console.warn("No handler defined for ".concat(api));
      }
    }
    
    function extendObject(a, b) {
      for (var key in b) {
        if (b.hasOwnProperty(key)) a[key] = b[key];
      }
    
      return a;
    }
    
    app(window);
    
    /***/ }),
    /* 3 */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {
    
    "use strict";
    /* harmony export (immutable) */ __webpack_exports__["a"] = show;
    /* unused harmony export triggerClosePopup */
    /* unused harmony export triggerShowPopup */
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__widget_html__ = __webpack_require__(4);
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__widget_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__widget_html__);
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__widget_css__ = __webpack_require__(5);
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__widget_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__widget_css__);
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__popup__ = __webpack_require__(8);
    
    
    
    var elements = [];
    var body;
    var widgets;
    var popups = [];
    function show() {
      // convert plain HTML string into DOM elements
      var temporary = document.createElement('div');
      temporary.innerHTML = __WEBPACK_IMPORTED_MODULE_0__widget_html___default.a;
      body = document.getElementsByTagName('body')[0];
    
      while (temporary.children.length > 0) {
        elements.push(temporary.children[0]);
        body.appendChild(temporary.children[0]);
      }
    
      widgets = document.getElementsByClassName('help-widget');
      widgets[0].addEventListener('click', triggerShowPopup);
      body.addEventListener('click', triggerClosePopup);
    }
    function triggerClosePopup(e) {
      popups.pop();
      Object(__WEBPACK_IMPORTED_MODULE_2__popup__["a" /* closePopup */])();
    }
    function triggerShowPopup(e) {
      e.stopPropagation();
    
      if (popups.length === 0) {
        Object(__WEBPACK_IMPORTED_MODULE_2__popup__["b" /* showPopup */])();
        popups.push(1);
      } else {
        popups.pop();
        Object(__WEBPACK_IMPORTED_MODULE_2__popup__["a" /* closePopup */])();
      }
    }
    
    /***/ }),
    /* 4 */
    /***/ (function(module, exports) {
    
        module.exports = "<div class=\"help-widget\">\n  <div class=\"svg-container\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 16 16\" aria-hidden=\"true\">\n      <a href='https://notes.nayanpatel.net/docs/issue'>\n      <defs>\n        <path id=\"icon-help-a\" d=\"M7 0a7 7 0 110 14A7 7 0 017 0zm0 4.2a2.8 2.8 0 100 5.6 2.8 2.8 0 000-5.6z\"></path>\n      </defs>\n      <g fill=\"none\" fill-rule=\"evenodd\" transform=\"translate(1 1)\">\n        <mask id=\"icon-help-b\">\n          <use xlink:href=\"#icon-help-a\"></use>\n        </mask>\n        <use fill-rule=\"nonzero\" xlink:href=\"#icon-help-a\"></use>\n        <path id=\"icon-help-c\" fill-rule=\"nonzero\" d=\"M8.4-.7v6.3h6.3v2.8H8.4v6.3H5.6V8.4H-.7V5.6h6.3V-.7h2.8z\" mask=\"url(#icon-help-b)\" transform=\"rotate(45 7 7)\"></path>\n      </g>\n    </a>\n    </svg>\n  </div>\n</div>";
    
    /***/ }),
    /* 5 */
    /***/ (function(module, exports, __webpack_require__) {
    
    // style-loader: Adds some css to the DOM by adding a <style> tag
    
    // load the styles
    var content = __webpack_require__(6);
    if(typeof content === 'string') content = [[module.i, content, '']];
    // Prepare cssTransformation
    var transform;
    
    var options = {"hmr":true}
    options.transform = transform
    // add the styles to the DOM
    var update = __webpack_require__(1)(content, options);
    if(content.locals) module.exports = content.locals;
    // Hot Module Replacement
    if(false) {
        // When the styles change, update the <style> tags
        if(!content.locals) {
            module.hot.accept("!!../../../node_modules/css-loader/dist/cjs.js??ref--1-1!../../../node_modules/postcss-loader/src/index.js!./widget.css", function() {
                var newContent = require("!!../../../node_modules/css-loader/dist/cjs.js??ref--1-1!../../../node_modules/postcss-loader/src/index.js!./widget.css");
                if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
                update(newContent);
            });
        }
        // When the module is disposed, remove the <style> tags
        module.hot.dispose(function() { update(); });
    }
    
    /***/ }),
    /* 6 */
    /***/ (function(module, exports, __webpack_require__) {
    
    // Imports
    var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(0);
    exports = ___CSS_LOADER_API_IMPORT___(false);
    // Module
    exports.push([module.i, ".help-widget {\n  position: fixed;\n  bottom: 20px;\n  right: 20px;\n  width: 60px;\n  height: 60px;\n  fill: #fff;\n  color: #fff;\n  display: flex;\n  border-radius: 30px;\n  justify-content: center;\n  align-items: center;\n  z-index: 8;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  cursor: pointer;\n}\n.help-widget .svg-container {\n  transform: translateZ(0);\n}\n.help-widget .svg {\n  width: 50px;\n  height: 50px;\n}\n.help-widget #icon-help-a, .help-widget #icon-help-b, .help-widget #icon-help-c {\n  transition: 0.02s fill ease;\n}\n.help-widget #icon-help-a {\n  fill: #999;\n}\n.help-widget #icon-help-c {\n  fill: #333;\n}\n.help-widget:hover #icon-help-a {\n  fill: #888;\n}\n.help-widget:hover #icon-help-c {\n  fill: black;\n}", ""]);
    // Exports
    module.exports = exports;
    
    
    /***/ }),
    /* 7 */
    /***/ (function(module, exports) {
    
    
    /**
     * When source maps are enabled, `style-loader` uses a link element with a data-uri to
     * embed the css on the page. This breaks all relative urls because now they are relative to a
     * bundle instead of the current page.
     *
     * One solution is to only use full urls, but that may be impossible.
     *
     * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
     *
     * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
     *
     */
    
    module.exports = function (css) {
      // get current location
      var location = typeof window !== "undefined" && window.location;
    
      if (!location) {
        throw new Error("fixUrls requires window.location");
      }
    
        // blank or null?
        if (!css || typeof css !== "string") {
          return css;
      }
    
      var baseUrl = location.protocol + "//" + location.host;
      var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");
    
        // convert each url(...)
        /*
        This regular expression is just a way to recursively match brackets within
        a string.
    
         /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
           (  = Start a capturing group
             (?:  = Start a non-capturing group
                 [^)(]  = Match anything that isn't a parentheses
                 |  = OR
                 \(  = Match a start parentheses
                     (?:  = Start another non-capturing groups
                         [^)(]+  = Match anything that isn't a parentheses
                         |  = OR
                         \(  = Match a start parentheses
                             [^)(]*  = Match anything that isn't a parentheses
                         \)  = Match a end parentheses
                     )  = End Group
                  *\) = Match anything and then a close parens
              )  = Close non-capturing group
              *  = Match anything
           )  = Close capturing group
         \)  = Match a close parens
    
         /gi  = Get all matches, not the first.  Be case insensitive.
         */
        var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
            // strip quotes (if they exist)
            var unquotedOrigUrl = origUrl
                .trim()
                .replace(/^"(.*)"$/, function(o, $1){ return $1; })
                .replace(/^'(.*)'$/, function(o, $1){ return $1; });
    
            // already a full url? no change
            if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
              return fullMatch;
            }
    
            // convert the url to a full url
            var newUrl;
    
            if (unquotedOrigUrl.indexOf("//") === 0) {
                  //TODO: should we add protocol?
                newUrl = unquotedOrigUrl;
            } else if (unquotedOrigUrl.indexOf("/") === 0) {
                // path should be relative to the base url
                newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
            } else {
                // path should be relative to current directory
                newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
            }
    
            // send back the fixed url(...)
            return "url(" + JSON.stringify(newUrl) + ")";
        });
    
        // send back the fixed css
        return fixedCss;
    };
    
    
    /***/ }),
    /* 8 */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {
    
    "use strict";
    /* harmony export (immutable) */ __webpack_exports__["b"] = showPopup;
    /* unused harmony export stopClose */
    /* harmony export (immutable) */ __webpack_exports__["a"] = closePopup;
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__popup_html__ = __webpack_require__(9);
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__popup_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__popup_html__);
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__popup_css__ = __webpack_require__(10);
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__popup_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__popup_css__);
    
    
    var elements = [];
    var body;
    function showPopup() {
      // convert plain HTML string into DOM elements
      var temporary = document.createElement('div');
      temporary.innerHTML = __WEBPACK_IMPORTED_MODULE_0__popup_html___default.a; // append elements to body
    
      body = document.getElementsByTagName('body')[0];
    
      while (temporary.children.length > 0) {
        elements.push(temporary.children[0]);
        temporary.children[0].addEventListener('click', stopClose);
        body.appendChild(temporary.children[0]);
      }
    }
    function stopClose(e) {
      e.stopPropagation();
      return;
    }
    function closePopup() {
      while (elements.length > 0) {
        elements.pop().remove();
      }
    }
    
    /***/ }),
    /* 9 */
    /***/ (function(module, exports) {
    
    module.exports = "";
    
    /***/ }),
    /* 10 */
    /***/ (function(module, exports, __webpack_require__) {
    
    // style-loader: Adds some css to the DOM by adding a <style> tag
    
    // load the styles
    var content = __webpack_require__(11);
    if(typeof content === 'string') content = [[module.i, content, '']];
    // Prepare cssTransformation
    var transform;
    
    var options = {"hmr":true}
    options.transform = transform
    // add the styles to the DOM
    var update = __webpack_require__(1)(content, options);
    if(content.locals) module.exports = content.locals;
    // Hot Module Replacement
    if(false) {
        // When the styles change, update the <style> tags
        if(!content.locals) {
            module.hot.accept("!!../../../node_modules/css-loader/dist/cjs.js??ref--1-1!../../../node_modules/postcss-loader/src/index.js!./popup.css", function() {
                var newContent = require("!!../../../node_modules/css-loader/dist/cjs.js??ref--1-1!../../../node_modules/postcss-loader/src/index.js!./popup.css");
                if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
                update(newContent);
            });
        }
        // When the module is disposed, remove the <style> tags
        module.hot.dispose(function() { update(); });
    }
    
    /***/ }),
    /* 11 */
    /***/ (function(module, exports, __webpack_require__) {
    
    // Imports
    var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(0);
    exports = ___CSS_LOADER_API_IMPORT___(false);
    // Module
    exports.push([module.i, ".help-widget-popup {\n  z-index: 2147483000;\n  position: fixed;\n  bottom: 100px;\n  right: 20px;\n  width: 376px;\n  min-height: 250px;\n  max-height: 600px;\n  box-shadow: rgba(0, 0, 0, 0.16) 0px 5px 40px;\n  opacity: 1;\n  height: calc(100% - 120px);\n  border-radius: 8px;\n  overflow: hidden;\n  font-family: -apple-system,BlinkMacSystemFont,\"Segoe UI\",\"Roboto\",\"Oxygen\",\"Ubuntu\",\"Cantarell\",\"Fira Sans\",\"Droid Sans\",\"Helvetica Neue\",sans-serif;\n}\n.help-widget-popup-header {\n  background-color: #222;\n  color: white;\n  text-rendering: antialiased;\n  display: flex;\n  padding: 30px;\n  align-items: center;\n  justify-content: center;\n}\n.help-widget-popup-header h1 {\n  font-size: 2.8rem;\n  font-weight: 700;\n  display: inline-block;\n}\n.help-widget-popup-content {\n  padding: 30px 30px;\n  text-align: center;\n}\n.help-widget-popup-content a {\n  width: 100%;\n  display: inline-block;\n  padding: 20px 0;\n  margin: 10px 0;\n  text-align: center;\n  font-weight: bold;\n  font-size: 1.2rem;\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);\n  color: black;\n  text-decoration: none;\n  border-radius: 5px;\n  border: 1px solid #ddd;\n  transition-property: transform, box-shadow;\n  transition-duration: 0.04s;\n  transition-timing-function: ease;\n}\n.help-widget-popup-content a:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);\n}\n.help-widget-popup-content a:focus {\n  transform: translateY(1px);\n  background-color: #eee;\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);\n}", ""]);
    // Exports
    module.exports = exports;
    
    
    /***/ })
    /******/ ]);
    //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjFkOWZhYTNmYzEzOGNhYmQ0NGYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3dpZGdldC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3Mvd2lkZ2V0L3dpZGdldC5odG1sIiwid2VicGFjazovLy8uL3NyYy92aWV3cy93aWRnZXQvd2lkZ2V0LmNzcz85YzFhIiwid2VicGFjazovLy8uL3NyYy92aWV3cy93aWRnZXQvd2lkZ2V0LmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIiwid2VicGFjazovLy8uL3NyYy92aWV3cy9wb3B1cC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvcG9wdXAvcG9wdXAuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvdmlld3MvcG9wdXAvcG9wdXAuY3NzPzY5YTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZXdzL3BvcHVwL3BvcHVwLmNzcyJdLCJuYW1lcyI6WyJzdXBwb3J0ZWRBUEkiLCJhcHAiLCJ3aW5kb3ciLCJjb25zb2xlIiwibG9nIiwiY29uZmlndXJhdGlvbnMiLCJnbG9iYWxPYmplY3QiLCJxdWV1ZSIsInEiLCJpIiwibGVuZ3RoIiwidG9Mb3dlckNhc2UiLCJleHRlbmRPYmplY3QiLCJhcGlIYW5kbGVyIiwiYXBpIiwicGFyYW1zIiwiRXJyb3IiLCJpbmRleE9mIiwic2hvdyIsIndhcm4iLCJhIiwiYiIsImtleSIsImhhc093blByb3BlcnR5IiwiZWxlbWVudHMiLCJib2R5Iiwid2lkZ2V0cyIsInBvcHVwcyIsInRlbXBvcmFyeSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImh0bWwiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImNoaWxkcmVuIiwicHVzaCIsImFwcGVuZENoaWxkIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0cmlnZ2VyU2hvd1BvcHVwIiwidHJpZ2dlckNsb3NlUG9wdXAiLCJlIiwicG9wIiwiY2xvc2VQb3B1cCIsInN0b3BQcm9wYWdhdGlvbiIsInNob3dQb3B1cCIsInN0b3BDbG9zZSIsInJlbW92ZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBOzs7Ozs7OztBQzdEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjs7QUFFaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNENBQTRDLHFCQUFxQjtBQUNqRTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxxQkFBcUIsaUJBQWlCO0FBQ3RDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IscUJBQXFCO0FBQ3pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBOEI7O0FBRTlCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0EscURBQXFELGNBQWM7QUFDbkU7QUFDQSxDOzs7Ozs7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBLGNBQWMsbUJBQU8sQ0FBQyxDQUFROztBQUU5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLG1CQUFtQjtBQUNwQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsc0JBQXNCO0FBQ3ZDOztBQUVBO0FBQ0EsbUJBQW1CLDJCQUEyQjs7QUFFOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQixtQkFBbUI7QUFDbkM7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQiwyQkFBMkI7QUFDNUM7QUFDQTs7QUFFQSxRQUFRLHVCQUF1QjtBQUMvQjtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLGlCQUFpQix1QkFBdUI7QUFDeEM7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjOztBQUVkLGtEQUFrRCxzQkFBc0I7QUFDeEU7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVB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QUNmO0FBQ0E7QUFDQSxhQUFhLG1CQUFPLENBQUMsQ0FBc0Q7QUFDM0U7QUFDQTtBQUNBLEdBQUcsS0FBVTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7QUN6QkE7QUFDQSxrQ0FBa0MsbUJBQU8sQ0FBQyxDQUFzRDtBQUNoRztBQUNBO0FBQ0EsY0FBYyxRQUFTLHVCQUF1Qix3QkFBd0Isb0JBQW9CLGtCQUFrQixnQkFBZ0IsaUJBQWlCLHNCQUFzQixzQkFBc0IsaURBQWlELGVBQWUsK0JBQStCLHVCQUF1QixxQkFBcUIseUtBQXlLLEdBQUcsNkJBQTZCLDJCQUEyQixpQkFBaUIsZ0NBQWdDLGtCQUFrQixrQkFBa0Isd0JBQXdCLDRCQUE0QixHQUFHLGdDQUFnQyxzQkFBc0IscUJBQXFCLDBCQUEwQixHQUFHLDhCQUE4Qix1QkFBdUIsdUJBQXVCLEdBQUcsZ0NBQWdDLGdCQUFnQiwwQkFBMEIsb0JBQW9CLG1CQUFtQix1QkFBdUIsc0JBQXNCLHNCQUFzQixnRkFBZ0YsaUJBQWlCLDBCQUEwQix1QkFBdUIsMkJBQTJCLCtDQUErQywrQkFBK0IscUNBQXFDLEdBQUcsc0NBQXNDLGdDQUFnQyxzRkFBc0YsR0FBRyxzQ0FBc0MsK0JBQStCLDJCQUEyQixzRkFBc0YsR0FBRztBQUMxcEQ7QUFDQSIsImZpbGUiOiJ3aWRnZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyMWQ5ZmFhM2ZjMTM4Y2FiZDQ0ZiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1c2VTb3VyY2VNYXApIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICByZXR1cm4gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGNvbnRlbnQsIFwifVwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbignJyk7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiAobW9kdWxlcywgbWVkaWFRdWVyeSwgZGVkdXBlKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSAnc3RyaW5nJykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCAnJ11dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbW9kdWxlcy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2ldKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250aW51ZVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhUXVlcnkpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhUXVlcnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsyXSA9IFwiXCIuY29uY2F0KG1lZGlhUXVlcnksIFwiIGFuZCBcIikuY29uY2F0KGl0ZW1bMl0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuXG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8ICcnKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59IC8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcblxuXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcbiAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICByZXR1cm4gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24oc2VsZWN0b3IpIHtcblx0XHRpZiAodHlwZW9mIG1lbW9bc2VsZWN0b3JdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBmbi5jYWxsKHRoaXMsIHNlbGVjdG9yKTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAoc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3NlbGVjdG9yXSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1tzZWxlY3Rvcl1cblx0fTtcbn0pKGZ1bmN0aW9uICh0YXJnZXQpIHtcblx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxufSk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gXCJib29sZWFuXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG5cdGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvICsgXCIgXCIgKyBvcHRpb25zLmluc2VydEF0LmJlZm9yZSk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBzaG93IH0gZnJvbSAnLi92aWV3cy93aWRnZXQnXG5cbmNvbnN0IHN1cHBvcnRlZEFQSSA9IFsnaW5pdCcsICdtZXNzYWdlJ107IC8vIGVubGlzdCBhbGwgbWV0aG9kcyBzdXBwb3J0ZWQgYnkgQVBJIChlLmcuIGBodygnZXZlbnQnLCAndXNlci1sb2dpbicpO2ApXG5cbi8qKlxuICBUaGUgbWFpbiBlbnRyeSBvZiB0aGUgYXBwbGljYXRpb25cbiAgKi9cbmZ1bmN0aW9uIGFwcCh3aW5kb3cpIHtcbiAgY29uc29sZS5sb2coJ2hlbHAtd2lkZ2V0IHN0YXJ0aW5nJyk7XG5cbiAgLy8gc2V0IGRlZmF1bHQgY29uZmlndXJhdGlvbnNcbiAgbGV0IGNvbmZpZ3VyYXRpb25zID0ge1xuICB9O1xuXG4gIC8vIGFsbCBtZXRob2RzIHRoYXQgd2VyZSBjYWxsZWQgdGlsbCBub3cgYW5kIHN0b3JlZCBpbiBxdWV1ZVxuICAvLyBuZWVkcyB0byBiZSBjYWxsZWQgbm93IFxuICBsZXQgZ2xvYmFsT2JqZWN0ID0gd2luZG93W3dpbmRvd1snaGVscC13aWRnZXQnXV07XG4gIGxldCBxdWV1ZSA9IGdsb2JhbE9iamVjdC5xO1xuICBpZiAocXVldWUpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocXVldWVbaV1bMF0udG9Mb3dlckNhc2UoKSA9PSAnaW5pdCcpIHtcbiAgICAgICAgY29uZmlndXJhdGlvbnMgPSBleHRlbmRPYmplY3QoY29uZmlndXJhdGlvbnMsIHF1ZXVlW2ldWzFdKTtcbiAgICAgIH1cbiAgICAgIGVsc2VcbiAgICAgICAgYXBpSGFuZGxlcihxdWV1ZVtpXVswXSwgcXVldWVbaV1bMV0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIG92ZXJyaWRlIHRlbXBvcmFyeSAodW50aWwgdGhlIGFwcCBsb2FkZWQpIGhhbmRsZXJcbiAgLy8gZm9yIHdpZGdldCdzIEFQSSBjYWxsc1xuICBnbG9iYWxPYmplY3QgPSBhcGlIYW5kbGVyO1xuICBnbG9iYWxPYmplY3QuY29uZmlndXJhdGlvbnMgPSBjb25maWd1cmF0aW9ucztcbn1cblxuLyoqXG4gICAgTWV0aG9kIHRoYXQgaGFuZGxlcyBhbGwgQVBJIGNhbGxzXG4gICAgKi9cbmZ1bmN0aW9uIGFwaUhhbmRsZXIoYXBpLCBwYXJhbXMpIHtcbiAgaWYgKCFhcGkpIHRocm93IEVycm9yKCdBUEkgbWV0aG9kIHJlcXVpcmVkJyk7XG4gIGFwaSA9IGFwaS50b0xvd2VyQ2FzZSgpO1xuXG4gIGlmIChzdXBwb3J0ZWRBUEkuaW5kZXhPZihhcGkpID09PSAtMSkgdGhyb3cgRXJyb3IoYE1ldGhvZCAke2FwaX0gaXMgbm90IHN1cHBvcnRlZGApO1xuXG4gIGNvbnNvbGUubG9nKGBIYW5kbGluZyBBUEkgY2FsbCAke2FwaX1gLCBwYXJhbXMpO1xuXG4gIHN3aXRjaCAoYXBpKSB7XG4gICAgLy8gVE9ETzogYWRkIEFQSSBpbXBsZW1lbnRhdGlvblxuICAgIGNhc2UgJ21lc3NhZ2UnOlxuICAgICAgc2hvdyhwYXJhbXMpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGNvbnNvbGUud2FybihgTm8gaGFuZGxlciBkZWZpbmVkIGZvciAke2FwaX1gKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBleHRlbmRPYmplY3QoYSwgYikge1xuICBmb3IgKHZhciBrZXkgaW4gYilcbiAgICBpZiAoYi5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgYVtrZXldID0gYltrZXldO1xuICByZXR1cm4gYTtcbn1cblxuYXBwKHdpbmRvdyk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21haW4uanMiLCJpbXBvcnQgaHRtbCBmcm9tICcuL3dpZGdldC5odG1sJztcbmltcG9ydCAnLi93aWRnZXQuY3NzJztcbmltcG9ydCB7IHNob3dQb3B1cCwgY2xvc2VQb3B1cCB9IGZyb20gJy4uL3BvcHVwJ1xuXG5sZXQgZWxlbWVudHMgPSBbXTtcbmxldCBib2R5O1xubGV0IHdpZGdldHM7XG5sZXQgcG9wdXBzID0gW107XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93KCkge1xuICAvLyBjb252ZXJ0IHBsYWluIEhUTUwgc3RyaW5nIGludG8gRE9NIGVsZW1lbnRzXG4gIGxldCB0ZW1wb3JhcnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdGVtcG9yYXJ5LmlubmVySFRNTCA9IGh0bWw7XG5cbiAgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XG4gIHdoaWxlICh0ZW1wb3JhcnkuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgIGVsZW1lbnRzLnB1c2godGVtcG9yYXJ5LmNoaWxkcmVuWzBdKTtcbiAgICBib2R5LmFwcGVuZENoaWxkKHRlbXBvcmFyeS5jaGlsZHJlblswXSk7XG4gIH1cblxuICB3aWRnZXRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaGVscC13aWRnZXQnKTtcbiAgd2lkZ2V0c1swXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRyaWdnZXJTaG93UG9wdXApO1xuICBib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdHJpZ2dlckNsb3NlUG9wdXApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmlnZ2VyQ2xvc2VQb3B1cChlKSB7XG4gIHBvcHVwcy5wb3AoKTtcbiAgY2xvc2VQb3B1cCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdHJpZ2dlclNob3dQb3B1cChlKSB7XG4gIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIGlmIChwb3B1cHMubGVuZ3RoID09PSAwKSB7XG4gICAgc2hvd1BvcHVwKCk7XG4gICAgcG9wdXBzLnB1c2goMSk7XG4gIH0gZWxzZSB7XG4gICAgcG9wdXBzLnBvcCgpO1xuICAgIGNsb3NlUG9wdXAoKVxuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3ZpZXdzL3dpZGdldC9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJoZWxwLXdpZGdldFxcXCI+XFxuICA8ZGl2IGNsYXNzPVxcXCJzdmctY29udGFpbmVyXFxcIj5cXG4gICAgPHN2ZyB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiIGNsYXNzPVxcXCJzdmdcXFwiIHhtbG5zOnhsaW5rPVxcXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXFxcIiB2aWV3Qm94PVxcXCIwIDAgMTYgMTZcXFwiIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIj5cXG4gICAgICA8ZGVmcz5cXG4gICAgICAgIDxwYXRoIGlkPVxcXCJpY29uLWhlbHAtYVxcXCIgZD1cXFwiTTcgMGE3IDcgMCAxMTAgMTRBNyA3IDAgMDE3IDB6bTAgNC4yYTIuOCAyLjggMCAxMDAgNS42IDIuOCAyLjggMCAwMDAtNS42elxcXCI+PC9wYXRoPlxcbiAgICAgIDwvZGVmcz5cXG4gICAgICA8ZyBmaWxsPVxcXCJub25lXFxcIiBmaWxsLXJ1bGU9XFxcImV2ZW5vZGRcXFwiIHRyYW5zZm9ybT1cXFwidHJhbnNsYXRlKDEgMSlcXFwiPlxcbiAgICAgICAgPG1hc2sgaWQ9XFxcImljb24taGVscC1iXFxcIj5cXG4gICAgICAgICAgPHVzZSB4bGluazpocmVmPVxcXCIjaWNvbi1oZWxwLWFcXFwiPjwvdXNlPlxcbiAgICAgICAgPC9tYXNrPlxcbiAgICAgICAgPHVzZSBmaWxsLXJ1bGU9XFxcIm5vbnplcm9cXFwiIHhsaW5rOmhyZWY9XFxcIiNpY29uLWhlbHAtYVxcXCI+PC91c2U+XFxuICAgICAgICA8cGF0aCBpZD1cXFwiaWNvbi1oZWxwLWNcXFwiIGZpbGwtcnVsZT1cXFwibm9uemVyb1xcXCIgZD1cXFwiTTguNC0uN3Y2LjNoNi4zdjIuOEg4LjR2Ni4zSDUuNlY4LjRILS43VjUuNmg2LjNWLS43aDIuOHpcXFwiIG1hc2s9XFxcInVybCgjaWNvbi1oZWxwLWIpXFxcIiB0cmFuc2Zvcm09XFxcInJvdGF0ZSg0NSA3IDcpXFxcIj48L3BhdGg+XFxuICAgICAgPC9nPlxcbiAgICA8L3N2Zz5cXG4gIDwvZGl2PlxcbjwvZGl2PlwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3ZpZXdzL3dpZGdldC93aWRnZXQuaHRtbFxuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tMS0xIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanMhLi93aWRnZXQuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS0xLTEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcyEuL3dpZGdldC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTEtMSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvc3JjL2luZGV4LmpzIS4vd2lkZ2V0LmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdmlld3Mvd2lkZ2V0L3dpZGdldC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gSW1wb3J0c1xudmFyIF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpO1xuZXhwb3J0cyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5oZWxwLXdpZGdldCB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBib3R0b206IDIwcHg7XFxuICByaWdodDogMjBweDtcXG4gIHdpZHRoOiA2MHB4O1xcbiAgaGVpZ2h0OiA2MHB4O1xcbiAgZmlsbDogI2ZmZjtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGJvcmRlci1yYWRpdXM6IDMwcHg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB6LWluZGV4OiA4O1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLmhlbHAtd2lkZ2V0IC5zdmctY29udGFpbmVyIHtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcXG59XFxuLmhlbHAtd2lkZ2V0IC5zdmcge1xcbiAgd2lkdGg6IDUwcHg7XFxuICBoZWlnaHQ6IDUwcHg7XFxufVxcbi5oZWxwLXdpZGdldCAjaWNvbi1oZWxwLWEsIC5oZWxwLXdpZGdldCAjaWNvbi1oZWxwLWIsIC5oZWxwLXdpZGdldCAjaWNvbi1oZWxwLWMge1xcbiAgdHJhbnNpdGlvbjogMC4wMnMgZmlsbCBlYXNlO1xcbn1cXG4uaGVscC13aWRnZXQgI2ljb24taGVscC1hIHtcXG4gIGZpbGw6ICM5OTk7XFxufVxcbi5oZWxwLXdpZGdldCAjaWNvbi1oZWxwLWMge1xcbiAgZmlsbDogIzMzMztcXG59XFxuLmhlbHAtd2lkZ2V0OmhvdmVyICNpY29uLWhlbHAtYSB7XFxuICBmaWxsOiAjODg4O1xcbn1cXG4uaGVscC13aWRnZXQ6aG92ZXIgI2ljb24taGVscC1jIHtcXG4gIGZpbGw6IGJsYWNrO1xcbn1cIiwgXCJcIl0pO1xuLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS0xLTEhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvc3JjIS4vc3JjL3ZpZXdzL3dpZGdldC93aWRnZXQuY3NzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBodG1sIGZyb20gJy4vcG9wdXAuaHRtbCc7XG5pbXBvcnQgJy4vcG9wdXAuY3NzJztcblxubGV0IGVsZW1lbnRzID0gW107XG5sZXQgYm9keTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dQb3B1cCgpIHtcbiAgLy8gY29udmVydCBwbGFpbiBIVE1MIHN0cmluZyBpbnRvIERPTSBlbGVtZW50c1xuICBsZXQgdGVtcG9yYXJ5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRlbXBvcmFyeS5pbm5lckhUTUwgPSBodG1sO1xuXG4gIC8vIGFwcGVuZCBlbGVtZW50cyB0byBib2R5XG4gIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdO1xuICB3aGlsZSAodGVtcG9yYXJ5LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICBlbGVtZW50cy5wdXNoKHRlbXBvcmFyeS5jaGlsZHJlblswXSk7XG4gICAgdGVtcG9yYXJ5LmNoaWxkcmVuWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3RvcENsb3NlKVxuICAgIGJvZHkuYXBwZW5kQ2hpbGQodGVtcG9yYXJ5LmNoaWxkcmVuWzBdKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RvcENsb3NlKGUpIHtcbiAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgcmV0dXJuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VQb3B1cCgpIHtcbiAgd2hpbGUgKGVsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBlbGVtZW50cy5wb3AoKS5yZW1vdmUoKTtcbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy92aWV3cy9wb3B1cC9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJoZWxwLXdpZGdldC1wb3B1cFxcXCI+XFxuICA8ZGl2IGNsYXNzPVxcXCJcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJoZWxwLXdpZGdldC1wb3B1cC1oZWFkZXJcXFwiPlxcbiAgICAgIDxoMT5IaSDwn5GLPC9oMT5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XFxcImhlbHAtd2lkZ2V0LXBvcHVwLWNvbnRlbnRcXFwiPlxcbiAgICAgIDxoMj5Hb3QgcXVlc3Rpb25zPzwvaDI+XFxuICAgICAgPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHBzOi8vaW5zdGF0dXMuY29tL2NoYXRcXFwiIGNsYXNzPVxcXCJoZWxwLXdpZGdldC1wb3B1cC1vcHRpb25cXFwiPkNoYXQgb24gc2xhY2s8L2gzPlxcbiAgICAgIDxhIHRhcmdldD1cXFwiX2JsYW5rXFxcIiBocmVmPVxcXCJtYWlsdG86YWxpQGluc3RhdHVzLmNvbVxcXCIgY2xhc3M9XFxcImhlbHAtd2lkZ2V0LXBvcHVwLW9wdGlvblxcXCI+RW1haWwgbWU8L2E+XFxuICAgICAgPGEgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiIGhyZWY9XFxcImh0dHBzOi8vdHdpdHRlci5jb20vbWVzc2FnZXMvY29tcG9zZT9yZWNpcGllbnRfaWQ9MzA4NjE2NTY0XFxcIiBjbGFzcz1cXFwiaGVscC13aWRnZXQtcG9wdXAtb3B0aW9uXFxcIj5TZW5kIGEgRE08L2E+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuPC9kaXY+XCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdmlld3MvcG9wdXAvcG9wdXAuaHRtbFxuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tMS0xIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanMhLi9wb3B1cC5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTEtMSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvc3JjL2luZGV4LmpzIS4vcG9wdXAuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS0xLTEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcyEuL3BvcHVwLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdmlld3MvcG9wdXAvcG9wdXAuY3NzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBJbXBvcnRzXG52YXIgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIik7XG5leHBvcnRzID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmhlbHAtd2lkZ2V0LXBvcHVwIHtcXG4gIHotaW5kZXg6IDIxNDc0ODMwMDA7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBib3R0b206IDEwMHB4O1xcbiAgcmlnaHQ6IDIwcHg7XFxuICB3aWR0aDogMzc2cHg7XFxuICBtaW4taGVpZ2h0OiAyNTBweDtcXG4gIG1heC1oZWlnaHQ6IDYwMHB4O1xcbiAgYm94LXNoYWRvdzogcmdiYSgwLCAwLCAwLCAwLjE2KSAwcHggNXB4IDQwcHg7XFxuICBvcGFjaXR5OiAxO1xcbiAgaGVpZ2h0OiBjYWxjKDEwMCUgLSAxMjBweCk7XFxuICBib3JkZXItcmFkaXVzOiA4cHg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sQmxpbmtNYWNTeXN0ZW1Gb250LFxcXCJTZWdvZSBVSVxcXCIsXFxcIlJvYm90b1xcXCIsXFxcIk94eWdlblxcXCIsXFxcIlVidW50dVxcXCIsXFxcIkNhbnRhcmVsbFxcXCIsXFxcIkZpcmEgU2Fuc1xcXCIsXFxcIkRyb2lkIFNhbnNcXFwiLFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsc2Fucy1zZXJpZjtcXG59XFxuLmhlbHAtd2lkZ2V0LXBvcHVwLWhlYWRlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjIyO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgdGV4dC1yZW5kZXJpbmc6IGFudGlhbGlhc2VkO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHBhZGRpbmc6IDMwcHg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcbi5oZWxwLXdpZGdldC1wb3B1cC1oZWFkZXIgaDEge1xcbiAgZm9udC1zaXplOiAyLjhyZW07XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbn1cXG4uaGVscC13aWRnZXQtcG9wdXAtY29udGVudCB7XFxuICBwYWRkaW5nOiAzMHB4IDMwcHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcbi5oZWxwLXdpZGdldC1wb3B1cC1jb250ZW50IGEge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBwYWRkaW5nOiAyMHB4IDA7XFxuICBtYXJnaW46IDEwcHggMDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgZm9udC1zaXplOiAxLjJyZW07XFxuICBib3gtc2hhZG93OiAwIDFweCAzcHggMCByZ2JhKDAsIDAsIDAsIDAuMSksIDAgMXB4IDJweCAwIHJnYmEoMCwgMCwgMCwgMC4wNik7XFxuICBjb2xvcjogYmxhY2s7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xcbiAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogdHJhbnNmb3JtLCBib3gtc2hhZG93O1xcbiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4wNHM7XFxuICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZTtcXG59XFxuLmhlbHAtd2lkZ2V0LXBvcHVwLWNvbnRlbnQgYTpob3ZlciB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTJweCk7XFxuICBib3gtc2hhZG93OiAwIDRweCA2cHggLTFweCByZ2JhKDAsIDAsIDAsIDAuMSksIDAgMnB4IDRweCAtMXB4IHJnYmEoMCwgMCwgMCwgMC4wNik7XFxufVxcbi5oZWxwLXdpZGdldC1wb3B1cC1jb250ZW50IGE6Zm9jdXMge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDFweCk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xcbiAgYm94LXNoYWRvdzogMCA0cHggNnB4IC0xcHggcmdiYSgwLCAwLCAwLCAwLjEpLCAwIDJweCA0cHggLTFweCByZ2JhKDAsIDAsIDAsIDAuMDYpO1xcbn1cIiwgXCJcIl0pO1xuLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS0xLTEhLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvc3JjIS4vc3JjL3ZpZXdzL3BvcHVwL3BvcHVwLmNzc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==
