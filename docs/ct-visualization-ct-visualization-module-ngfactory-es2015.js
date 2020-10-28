(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ct-visualization-ct-visualization-module-ngfactory"],{

/***/ "./node_modules/globe.gl/dist/globe.gl.module.js":
/*!*******************************************************!*\
  !*** ./node_modules/globe.gl/dist/globe.gl.module.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_globe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three-globe */ "./node_modules/three-globe/dist/three-globe.module.js");
/* harmony import */ var three_render_objects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three-render-objects */ "./node_modules/three-render-objects/dist/three-render-objects.module.js");
/* harmony import */ var accessor_fn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! accessor-fn */ "./node_modules/accessor-fn/dist/accessor-fn.module.js");
/* harmony import */ var kapsule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! kapsule */ "./node_modules/kapsule/dist/kapsule.module.js");
/* harmony import */ var _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tweenjs/tween.js */ "./node_modules/@tweenjs/tween.js/dist/tween.esm.js");







function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function linkKapsule (kapsulePropName, kapsuleType) {
  var dummyK = new kapsuleType(); // To extract defaults

  return {
    linkProp: function linkProp(prop) {
      // link property config
      return {
        "default": dummyK[prop](),
        onChange: function onChange(v, state) {
          state[kapsulePropName][prop](v);
        },
        triggerUpdate: false
      };
    },
    linkMethod: function linkMethod(method) {
      // link method pass-through
      return function (state) {
        var kapsuleInstance = state[kapsulePropName];

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var returnVal = kapsuleInstance[method].apply(kapsuleInstance, args);
        return returnVal === kapsuleInstance ? this // chain based on the parent object, not the inner kapsule
        : returnVal;
      };
    }
  };
}

var three = window.THREE ? window.THREE // Prefer consumption from global THREE, if exists
: {
  AmbientLight: three__WEBPACK_IMPORTED_MODULE_0__["AmbientLight"],
  DirectionalLight: three__WEBPACK_IMPORTED_MODULE_0__["DirectionalLight"],
  Vector2: three__WEBPACK_IMPORTED_MODULE_0__["Vector2"]
};
// Expose config from ThreeGlobe

var bindGlobe = linkKapsule('globe', three_globe__WEBPACK_IMPORTED_MODULE_1__["default"]);
var linkedGlobeProps = Object.assign.apply(Object, _toConsumableArray(['globeImageUrl', 'bumpImageUrl', 'showAtmosphere', 'showGraticules', 'pointsData', 'pointLat', 'pointLng', 'pointColor', 'pointAltitude', 'pointRadius', 'pointResolution', 'pointsMerge', 'pointsTransitionDuration', 'arcsData', 'arcStartLat', 'arcStartLng', 'arcEndLat', 'arcEndLng', 'arcColor', 'arcAltitude', 'arcAltitudeAutoScale', 'arcStroke', 'arcCurveResolution', 'arcCircularResolution', 'arcDashLength', 'arcDashGap', 'arcDashInitialGap', 'arcDashAnimateTime', 'arcsTransitionDuration', 'polygonsData', 'polygonGeoJsonGeometry', 'polygonCapColor', 'polygonSideColor', 'polygonStrokeColor', 'polygonAltitude', 'polygonCapCurvatureResolution', 'polygonsTransitionDuration', 'pathsData', 'pathPoints', 'pathPointLat', 'pathPointLng', 'pathPointAlt', 'pathResolution', 'pathColor', 'pathStroke', 'pathDashLength', 'pathDashGap', 'pathDashInitialGap', 'pathDashAnimateTime', 'pathTransitionDuration', 'hexBinPointsData', 'hexBinPointLat', 'hexBinPointLng', 'hexBinPointWeight', 'hexBinResolution', 'hexMargin', 'hexTopCurvatureResolution', 'hexTopColor', 'hexSideColor', 'hexAltitude', 'hexBinMerge', 'hexTransitionDuration', 'hexPolygonsData', 'hexPolygonGeoJsonGeometry', 'hexPolygonColor', 'hexPolygonAltitude', 'hexPolygonResolution', 'hexPolygonMargin', 'hexPolygonCurvatureResolution', 'hexPolygonsTransitionDuration', 'labelsData', 'labelLat', 'labelLng', 'labelAltitude', 'labelRotation', 'labelText', 'labelSize', 'labelTypeFace', 'labelColor', 'labelResolution', 'labelIncludeDot', 'labelDotRadius', 'labelDotOrientation', 'labelsTransitionDuration', 'customLayerData', 'customThreeObject', 'customThreeObjectUpdate'].map(function (p) {
  return _defineProperty({}, p, bindGlobe.linkProp(p));
})));
var linkedGlobeMethods = Object.assign.apply(Object, _toConsumableArray(['globeMaterial', 'getCoords', 'toGeoCoords'].map(function (p) {
  return _defineProperty({}, p, bindGlobe.linkMethod(p));
}))); // Expose config from renderObjs

var bindRenderObjs = linkKapsule('renderObjs', three_render_objects__WEBPACK_IMPORTED_MODULE_2__["default"]);
var linkedRenderObjsProps = Object.assign.apply(Object, _toConsumableArray(['width', 'height', 'backgroundColor', 'backgroundImageUrl', 'enablePointerInteraction'].map(function (p) {
  return _defineProperty({}, p, bindRenderObjs.linkProp(p));
})));
var linkedRenderObjsMethods = Object.assign.apply(Object, _toConsumableArray(['postProcessingComposer'].map(function (p) {
  return _defineProperty({}, p, bindRenderObjs.linkMethod(p));
}))); //

var GLOBE_RADIUS = 100;
var globe = Object(kapsule__WEBPACK_IMPORTED_MODULE_4__["default"])({
  props: _objectSpread2(_objectSpread2({
    onZoom: {
      triggerUpdate: false
    },
    onGlobeClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onGlobeRightClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    pointLabel: {
      "default": 'name',
      triggerUpdate: false
    },
    onPointClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onPointRightClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onPointHover: {
      "default": function _default() {},
      triggerUpdate: false
    },
    arcLabel: {
      "default": 'name',
      triggerUpdate: false
    },
    onArcClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onArcRightClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onArcHover: {
      "default": function _default() {},
      triggerUpdate: false
    },
    polygonLabel: {
      "default": 'name',
      triggerUpdate: false
    },
    onPolygonClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onPolygonRightClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onPolygonHover: {
      "default": function _default() {},
      triggerUpdate: false
    },
    pathLabel: {
      "default": 'name',
      triggerUpdate: false
    },
    onPathClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onPathRightClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onPathHover: {
      "default": function _default() {},
      triggerUpdate: false
    },
    hexLabel: {
      triggerUpdate: false
    },
    onHexClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onHexRightClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onHexHover: {
      "default": function _default() {},
      triggerUpdate: false
    },
    hexPolygonLabel: {
      triggerUpdate: false
    },
    onHexPolygonClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onHexPolygonRightClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onHexPolygonHover: {
      "default": function _default() {},
      triggerUpdate: false
    },
    labelLabel: {
      triggerUpdate: false
    },
    onLabelClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onLabelRightClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onLabelHover: {
      "default": function _default() {},
      triggerUpdate: false
    },
    customLayerLabel: {
      "default": 'name',
      triggerUpdate: false
    },
    onCustomLayerClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onCustomLayerRightClick: {
      "default": function _default() {},
      triggerUpdate: false
    },
    onCustomLayerHover: {
      "default": function _default() {},
      triggerUpdate: false
    },
    pointerEventsFilter: {
      "default": function _default() {
        return true;
      },
      triggerUpdate: false,
      onChange: function onChange(filterFn, state) {
        return state.renderObjs.hoverFilter(function (obj) {
          return filterFn(obj, obj.__data);
        });
      }
    }
  }, linkedGlobeProps), linkedRenderObjsProps),
  methods: _objectSpread2(_objectSpread2({
    pauseAnimation: function pauseAnimation(state) {
      if (state.animationFrameRequestId !== null) {
        cancelAnimationFrame(state.animationFrameRequestId);
        state.animationFrameRequestId = null;
      }

      return this;
    },
    resumeAnimation: function resumeAnimation(state) {
      if (state.animationFrameRequestId === null) {
        this._animationCycle();
      }

      return this;
    },
    _animationCycle: function _animationCycle(state) {
      // Frame cycle
      state.renderObjs.tick();
      state.animationFrameRequestId = requestAnimationFrame(this._animationCycle);
    },
    pointOfView: function pointOfView(state) {
      var geoCoords = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var transitionDuration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var curGeoCoords = getGeoCoords(); // Getter

      if (geoCoords.lat === undefined && geoCoords.lng === undefined && geoCoords.altitude === undefined) {
        return curGeoCoords;
      } else {
        // Setter
        var finalGeoCoords = Object.assign({}, curGeoCoords, geoCoords);

        if (!transitionDuration) {
          // no animation
          setCameraPos(finalGeoCoords);
        } else {
          // Avoid rotating more than 180deg longitude
          while (curGeoCoords.lng - finalGeoCoords.lng > 180) {
            curGeoCoords.lng -= 360;
          }

          while (curGeoCoords.lng - finalGeoCoords.lng < -180) {
            curGeoCoords.lng += 360;
          }

          new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_5__["default"].Tween(curGeoCoords).to(finalGeoCoords, transitionDuration).easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_5__["default"].Easing.Cubic.InOut).onUpdate(setCameraPos).start();
        }

        return this;
      } //


      function getGeoCoords() {
        return state.globe.toGeoCoords(state.renderObjs.cameraPosition());
      }

      function setCameraPos(_ref5) {
        var lat = _ref5.lat,
            lng = _ref5.lng,
            altitude = _ref5.altitude;
        state.renderObjs.cameraPosition(state.globe.getCoords(lat, lng, altitude));
      }
    },
    getScreenCoords: function getScreenCoords(state) {
      var _state$globe;

      for (var _len = arguments.length, geoCoords = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        geoCoords[_key - 1] = arguments[_key];
      }

      var cartesianCoords = (_state$globe = state.globe).getCoords.apply(_state$globe, geoCoords);

      return state.renderObjs.getScreenCoords(cartesianCoords.x, cartesianCoords.y, cartesianCoords.z);
    },
    toGlobeCoords: function toGlobeCoords(state, x, y) {
      var globeIntersects = state.renderObjs.intersectingObjects(x, y).find(function (d) {
        return d.object.__globeObjType === 'globe';
      });
      if (!globeIntersects) return null; // coords outside globe

      var _state$globe$toGeoCoo = state.globe.toGeoCoords(globeIntersects.point),
          lat = _state$globe$toGeoCoo.lat,
          lng = _state$globe$toGeoCoo.lng;

      return {
        lat: lat,
        lng: lng
      };
    },
    scene: function scene(state) {
      return state.renderObjs.scene();
    },
    // Expose scene
    camera: function camera(state) {
      return state.renderObjs.camera();
    },
    // Expose camera
    renderer: function renderer(state) {
      return state.renderObjs.renderer();
    },
    // Expose renderer
    controls: function controls(state) {
      return state.renderObjs.controls();
    },
    // Expose controls
    _destructor: function _destructor() {
      this.pauseAnimation();
      this.pointsData([]);
      this.arcsData([]);
      this.polygonsData([]);
      this.pathsData([]);
      this.hexBinPointsData([]);
      this.hexPolygonsData([]);
      this.labelsData([]);
      this.customLayerData([]);
    }
  }, linkedGlobeMethods), linkedRenderObjsMethods),
  stateInit: function stateInit(_ref6) {
    var rendererConfig = _ref6.rendererConfig,
        _ref6$waitForGlobeRea = _ref6.waitForGlobeReady,
        waitForGlobeReady = _ref6$waitForGlobeRea === void 0 ? true : _ref6$waitForGlobeRea,
        globeInitConfig = _objectWithoutProperties(_ref6, ["rendererConfig", "waitForGlobeReady"]);

    return {
      globe: new three_globe__WEBPACK_IMPORTED_MODULE_1__["default"](_objectSpread2({
        waitForGlobeReady: waitForGlobeReady
      }, globeInitConfig)),
      renderObjs: Object(three_render_objects__WEBPACK_IMPORTED_MODULE_2__["default"])({
        controlType: 'orbit',
        rendererConfig: rendererConfig,
        waitForLoadComplete: waitForGlobeReady
      }).skyRadius(GLOBE_RADIUS * 500).showNavInfo(false)
    };
  },
  init: function init(domNode, state) {
    var _this = this;

    // Wipe DOM
    domNode.innerHTML = ''; // Add relative container

    domNode.appendChild(state.container = document.createElement('div'));
    state.container.style.position = 'relative'; // Add renderObjs

    var roDomNode = document.createElement('div');
    state.container.appendChild(roDomNode);
    state.renderObjs(roDomNode); // inject renderer size on three-globe

    state.globe.rendererSize(state.renderObjs.renderer().getSize(new three.Vector2())); // set initial distance

    this.pointOfView({
      altitude: 2.5
    }); // calibrate orbit controls

    var controls = state.renderObjs.controls();
    controls.minDistance = GLOBE_RADIUS * 1.01; // just above the surface

    setTimeout(function () {
      return controls.maxDistance = GLOBE_RADIUS * 100;
    }); // apply async  after renderObjs sets maxDistance

    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.3;
    controls.zoomSpeed = 0.3;
    controls.addEventListener('change', function () {
      // adjust controls speed based on altitude
      var pov = _this.pointOfView();

      controls.rotateSpeed = pov.altitude * 0.2; // Math.pow(pov.altitude + 1, 2) * 0.025;

      controls.zoomSpeed = (pov.altitude + 1) * 0.1; // Math.sqrt(pov.altitude) * 0.2;

      state.onZoom && state.onZoom(pov);
    }); // config renderObjs

    var getGlobeObj = function getGlobeObj(object) {
      var obj = object; // recurse up object chain until finding the globe object

      while (obj && !obj.hasOwnProperty('__globeObjType')) {
        obj = obj.parent;
      }

      return obj;
    };

    var dataAccessors = {
      point: function point(d) {
        return d;
      },
      arc: function arc(d) {
        return d;
      },
      polygon: function polygon(d) {
        return d.data;
      },
      path: function path(d) {
        return d;
      },
      hexbin: function hexbin(d) {
        return d;
      },
      hexPolygon: function hexPolygon(d) {
        return d;
      },
      label: function label(d) {
        return d;
      },
      custom: function custom(d) {
        return d;
      }
    };
    state.renderObjs.objects([// Populate scene
    new three.AmbientLight(0xbbbbbb), new three.DirectionalLight(0xffffff, 0.6), state.globe]).hoverOrderComparator(function (a, b) {
      var aObj = getGlobeObj(a);
      var bObj = getGlobeObj(b); // de-prioritize background / non-globe objects

      var isBackground = function isBackground(o) {
        return !o;
      }; // || o.__globeObjType === 'globe' || o.__globeObjType === 'atmosphere';


      return isBackground(aObj) - isBackground(bObj);
    }).lineHoverPrecision(0.2).tooltipContent(function (obj) {
      var objAccessors = {
        point: state.pointLabel,
        arc: state.arcLabel,
        polygon: state.polygonLabel,
        path: state.pathLabel,
        hexbin: state.hexLabel,
        hexPolygon: state.hexPolygonLabel,
        label: state.labelLabel,
        custom: state.customLayerLabel
      };
      var globeObj = getGlobeObj(obj);
      var objType = globeObj.__globeObjType;
      return globeObj && objAccessors.hasOwnProperty(objType) && dataAccessors.hasOwnProperty(objType) ? Object(accessor_fn__WEBPACK_IMPORTED_MODULE_3__["default"])(objAccessors[objType])(dataAccessors[objType](globeObj.__data)) || '' : '';
    }).onHover(function (obj) {
      // Update tooltip and trigger onHover events
      var hoverObjFns = {
        point: state.onPointHover,
        arc: state.onArcHover,
        polygon: state.onPolygonHover,
        path: state.onPathHover,
        hexbin: state.onHexHover,
        hexPolygon: state.onHexPolygonHover,
        label: state.onLabelHover,
        custom: state.onCustomLayerHover
      };
      var hoverObj = getGlobeObj(obj); // ignore non-recognised obj types

      hoverObj && !hoverObjFns.hasOwnProperty(hoverObj.__globeObjType) && (hoverObj = null);

      if (hoverObj !== state.hoverObj) {
        var prevObjType = state.hoverObj ? state.hoverObj.__globeObjType : null;
        var prevObjData = state.hoverObj ? dataAccessors[prevObjType](state.hoverObj.__data) : null;
        var objType = hoverObj ? hoverObj.__globeObjType : null;
        var objData = hoverObj ? dataAccessors[objType](hoverObj.__data) : null;

        if (prevObjType && prevObjType !== objType) {
          // Hover out
          hoverObjFns[prevObjType](null, prevObjData);
        }

        if (objType) {
          // Hover in
          hoverObjFns[objType](objData, prevObjType === objType ? prevObjData : null);
        }

        state.hoverObj = hoverObj;
      }
    }).onClick(function (obj, ev, point) {
      if (!obj) return; // ignore background clicks
      // Handle click events on objects

      var objFns = {
        globe: state.onGlobeClick,
        point: state.onPointClick,
        arc: state.onArcClick,
        polygon: state.onPolygonClick,
        path: state.onPathClick,
        hexbin: state.onHexClick,
        hexPolygon: state.onHexPolygonClick,
        label: state.onLabelClick,
        custom: state.onCustomLayerClick
      };
      var globeObj = getGlobeObj(obj);
      var objType = globeObj.__globeObjType;

      if (globeObj && objFns.hasOwnProperty(objType)) {
        var args = [ev];

        if (objType === 'globe') {
          // include click coords in { lat, lng }
          var _this$toGeoCoords = _this.toGeoCoords(point),
              lat = _this$toGeoCoords.lat,
              lng = _this$toGeoCoords.lng;

          args.unshift({
            lat: lat,
            lng: lng
          });
        }

        dataAccessors.hasOwnProperty(objType) && args.unshift(dataAccessors[objType](globeObj.__data));
        objFns[objType].apply(objFns, args);
      }
    }).onRightClick(function (obj, ev, point) {
      if (!obj) return; // ignore background clicks
      // Handle right-click events

      var objFns = {
        globe: state.onGlobeRightClick,
        point: state.onPointRightClick,
        arc: state.onArcRightClick,
        polygon: state.onPolygonRightClick,
        path: state.onPathRightClick,
        hexbin: state.onHexRightClick,
        hexPolygon: state.onHexPolygonRightClick,
        label: state.onLabelRightClick,
        custom: state.onCustomLayerRightClick
      };
      var globeObj = getGlobeObj(obj);
      var objType = globeObj.__globeObjType;

      if (globeObj && objFns.hasOwnProperty(objType)) {
        var args = [ev];

        if (objType === 'globe') {
          // include click coords in { lat, lng }
          var _this$toGeoCoords2 = _this.toGeoCoords(point),
              lat = _this$toGeoCoords2.lat,
              lng = _this$toGeoCoords2.lng;

          args.unshift({
            lat: lat,
            lng: lng
          });
        }

        dataAccessors.hasOwnProperty(objType) && args.unshift(dataAccessors[objType](globeObj.__data));
        objFns[objType].apply(objFns, args);
      }
    }); //
    // Kick-off renderer

    this._animationCycle();
  }
});

/* harmony default export */ __webpack_exports__["default"] = (globe);


/***/ }),

/***/ "./node_modules/stats.js/build/stats.min.js":
/*!**************************************************!*\
  !*** ./node_modules/stats.js/build/stats.min.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// stats.js - http://github.com/mrdoob/stats.js
(function(f,e){ true?module.exports=e():undefined})(this,function(){var f=function(){function e(a){c.appendChild(a.dom);return a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";c.addEventListener("click",function(a){a.preventDefault();
u(++l%c.children.length)},!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));u(0);return{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();h.update(c-k,200);if(c>g+1E3&&(r.update(1E3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/
1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}};f.Panel=function(e,f,l){var c=Infinity,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r;q.height=h;q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");b.font="bold "+9*a+"px Helvetica,Arial,sans-serif";b.textBaseline="top";b.fillStyle=l;b.fillRect(0,0,r,h);b.fillStyle=f;b.fillText(e,t,v);
b.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(h,w){c=Math.min(c,h);k=Math.max(k,h);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=f;b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}};return f});


/***/ }),

/***/ "./src/app/ct-visualization/components/ct-globe-gl-intfrastructure/ct-globe-gl-intfrastructure.component.ngfactory.js":
/*!****************************************************************************************************************************!*\
  !*** ./src/app/ct-visualization/components/ct-globe-gl-intfrastructure/ct-globe-gl-intfrastructure.component.ngfactory.js ***!
  \****************************************************************************************************************************/
/*! exports provided: RenderType_CtGlobeGlIntfrastructureComponent, View_CtGlobeGlIntfrastructureComponent_0, View_CtGlobeGlIntfrastructureComponent_Host_0, CtGlobeGlIntfrastructureComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_CtGlobeGlIntfrastructureComponent", function() { return RenderType_CtGlobeGlIntfrastructureComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_CtGlobeGlIntfrastructureComponent_0", function() { return View_CtGlobeGlIntfrastructureComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_CtGlobeGlIntfrastructureComponent_Host_0", function() { return View_CtGlobeGlIntfrastructureComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CtGlobeGlIntfrastructureComponentNgFactory", function() { return CtGlobeGlIntfrastructureComponentNgFactory; });
/* harmony import */ var _ct_globe_gl_intfrastructure_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ct-globe-gl-intfrastructure.component.scss.shim.ngstyle */ "./src/app/ct-visualization/components/ct-globe-gl-intfrastructure/ct-globe-gl-intfrastructure.component.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ct_globe_gl_intfrastructure_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ct-globe-gl-intfrastructure.component */ "./src/app/ct-visualization/components/ct-globe-gl-intfrastructure/ct-globe-gl-intfrastructure.component.ts");
/* harmony import */ var _services_ct_visualization_request_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/ct-visualization-request.service */ "./src/app/ct-visualization/services/ct-visualization-request.service.ts");
/* harmony import */ var _three_services_three_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../three/services/three.service */ "./src/app/three/services/three.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 





var styles_CtGlobeGlIntfrastructureComponent = [_ct_globe_gl_intfrastructure_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_CtGlobeGlIntfrastructureComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_CtGlobeGlIntfrastructureComponent, data: {} });

function View_CtGlobeGlIntfrastructureComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](671088640, 1, { el: 0 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 1, "h3", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Coordinate Points: lib events, Globe.gl package (console listed)"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 1, "div", [["class", ""]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, [[1, 0], ["el", 1]], null, 0, "div", [["class", ""]], null, null, null, null, null))], null, null); }
function View_CtGlobeGlIntfrastructureComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-ct-globe-gl-intfrastructure", [], null, null, null, View_CtGlobeGlIntfrastructureComponent_0, RenderType_CtGlobeGlIntfrastructureComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 4440064, null, 0, _ct_globe_gl_intfrastructure_component__WEBPACK_IMPORTED_MODULE_2__["CtGlobeGlIntfrastructureComponent"], [_services_ct_visualization_request_service__WEBPACK_IMPORTED_MODULE_3__["CtVisualizationRequestService"], _three_services_three_service__WEBPACK_IMPORTED_MODULE_4__["ThreeService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var CtGlobeGlIntfrastructureComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-ct-globe-gl-intfrastructure", _ct_globe_gl_intfrastructure_component__WEBPACK_IMPORTED_MODULE_2__["CtGlobeGlIntfrastructureComponent"], View_CtGlobeGlIntfrastructureComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/ct-visualization/components/ct-globe-gl-intfrastructure/ct-globe-gl-intfrastructure.component.scss.shim.ngstyle.js":
/*!************************************************************************************************************************************!*\
  !*** ./src/app/ct-visualization/components/ct-globe-gl-intfrastructure/ct-globe-gl-intfrastructure.component.scss.shim.ngstyle.js ***!
  \************************************************************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2N0LXZpc3VhbGl6YXRpb24vY29tcG9uZW50cy9jdC1nbG9iZS1nbC1pbnRmcmFzdHJ1Y3R1cmUvY3QtZ2xvYmUtZ2wtaW50ZnJhc3RydWN0dXJlLmNvbXBvbmVudC5zY3NzIn0= */"];



/***/ }),

/***/ "./src/app/ct-visualization/components/ct-globe-gl-intfrastructure/ct-globe-gl-intfrastructure.component.ts":
/*!******************************************************************************************************************!*\
  !*** ./src/app/ct-visualization/components/ct-globe-gl-intfrastructure/ct-globe-gl-intfrastructure.component.ts ***!
  \******************************************************************************************************************/
/*! exports provided: CtGlobeGlIntfrastructureComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CtGlobeGlIntfrastructureComponent", function() { return CtGlobeGlIntfrastructureComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var globe_gl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! globe.gl */ "./node_modules/globe.gl/dist/globe.gl.module.js");
/* harmony import */ var _node_modules_stats_js_build_stats_min_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/stats.js/build/stats.min.js */ "./node_modules/stats.js/build/stats.min.js");
/* harmony import */ var _node_modules_stats_js_build_stats_min_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_stats_js_build_stats_min_js__WEBPACK_IMPORTED_MODULE_2__);



class CtGlobeGlIntfrastructureComponent {
    constructor(ctVisualization, threeService) {
        this.ctVisualization = ctVisualization;
        this.threeService = threeService;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    ngOnInit() {
        this.stats = new _node_modules_stats_js_build_stats_min_js__WEBPACK_IMPORTED_MODULE_2__();
        this.stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(this.stats.dom);
        this.statsUpdate();
    }
    statsUpdate() {
        this.stats.update();
        window.requestAnimationFrame(this.statsUpdate.bind(this));
    }
    getStateCapitalsData() {
        this.subscription = this.ctVisualization
            .getStateCapitals()
            .subscribe((response) => {
            if (response.features && response.features.length) {
                this.formatGeoJsonResponse(response.features);
                this.constructGlobe();
            }
        });
    }
    ngAfterViewInit() {
        this.getStateCapitalsData();
    }
    formatGeoJsonResponse(usaCapitalsGeoData) {
        this.filteredGlobeData = usaCapitalsGeoData
            .filter((location) => {
            return (location.geometry &&
                location.geometry.coordinates &&
                location.geometry.coordinates.length === 2);
        })
            .map((location) => {
            return {
                lat: location.geometry.coordinates[1],
                lng: location.geometry.coordinates[0],
                label: location.properties && location.properties.name
                    ? location.properties.name
                    : "",
            };
        });
    }
    constructGlobe() {
        const globe = Object(globe_gl__WEBPACK_IMPORTED_MODULE_1__["default"])();
        globe(this.el.nativeElement)
            .globeImageUrl("assets/earth-dark.jpg")
            .pointsData(this.filteredGlobeData)
            .pointAltitude(0.0005)
            .pointColor((e) => {
            return "#007FFF";
        })
            .pointRadius(0.2)
            .pointResolution(2000)
            .onPointClick(function (point, event) {
            console.log("click", point, event, this);
        })
            .onPointHover(function (point, prevPoint) {
            console.log("hover", point, prevPoint, this);
        });
    }
    scrollToTop($event) {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }
}


/***/ }),

/***/ "./src/app/ct-visualization/components/ct-globe-infrastructure/ct-globe-infrastructure.component.ngfactory.js":
/*!********************************************************************************************************************!*\
  !*** ./src/app/ct-visualization/components/ct-globe-infrastructure/ct-globe-infrastructure.component.ngfactory.js ***!
  \********************************************************************************************************************/
/*! exports provided: RenderType_CtGlobeInfrastructureComponent, View_CtGlobeInfrastructureComponent_0, View_CtGlobeInfrastructureComponent_Host_0, CtGlobeInfrastructureComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_CtGlobeInfrastructureComponent", function() { return RenderType_CtGlobeInfrastructureComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_CtGlobeInfrastructureComponent_0", function() { return View_CtGlobeInfrastructureComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_CtGlobeInfrastructureComponent_Host_0", function() { return View_CtGlobeInfrastructureComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CtGlobeInfrastructureComponentNgFactory", function() { return CtGlobeInfrastructureComponentNgFactory; });
/* harmony import */ var _ct_globe_infrastructure_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ct-globe-infrastructure.component.scss.shim.ngstyle */ "./src/app/ct-visualization/components/ct-globe-infrastructure/ct-globe-infrastructure.component.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ct_globe_infrastructure_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ct-globe-infrastructure.component */ "./src/app/ct-visualization/components/ct-globe-infrastructure/ct-globe-infrastructure.component.ts");
/* harmony import */ var _three_services_three_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../three/services/three.service */ "./src/app/three/services/three.service.ts");
/* harmony import */ var _services_ct_visualization_request_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/ct-visualization-request.service */ "./src/app/ct-visualization/services/ct-visualization-request.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 





var styles_CtGlobeInfrastructureComponent = [_ct_globe_infrastructure_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_CtGlobeInfrastructureComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_CtGlobeInfrastructureComponent, data: {} });

function View_CtGlobeInfrastructureComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](671088640, 1, { canvasEl: 0 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 1, "h3", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Coordinate Points: Raycaster events (console listed)"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, [[1, 0], ["canvasEl", 1]], null, 0, "div", [], null, null, null, null, null))], null, null); }
function View_CtGlobeInfrastructureComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-ct-globe-infrastructure", [], null, null, null, View_CtGlobeInfrastructureComponent_0, RenderType_CtGlobeInfrastructureComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 4440064, null, 0, _ct_globe_infrastructure_component__WEBPACK_IMPORTED_MODULE_2__["CtGlobeInfrastructureComponent"], [_three_services_three_service__WEBPACK_IMPORTED_MODULE_3__["ThreeService"], _services_ct_visualization_request_service__WEBPACK_IMPORTED_MODULE_4__["CtVisualizationRequestService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var CtGlobeInfrastructureComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-ct-globe-infrastructure", _ct_globe_infrastructure_component__WEBPACK_IMPORTED_MODULE_2__["CtGlobeInfrastructureComponent"], View_CtGlobeInfrastructureComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/ct-visualization/components/ct-globe-infrastructure/ct-globe-infrastructure.component.scss.shim.ngstyle.js":
/*!****************************************************************************************************************************!*\
  !*** ./src/app/ct-visualization/components/ct-globe-infrastructure/ct-globe-infrastructure.component.scss.shim.ngstyle.js ***!
  \****************************************************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2N0LXZpc3VhbGl6YXRpb24vY29tcG9uZW50cy9jdC1nbG9iZS1pbmZyYXN0cnVjdHVyZS9jdC1nbG9iZS1pbmZyYXN0cnVjdHVyZS5jb21wb25lbnQuc2NzcyJ9 */"];



/***/ }),

/***/ "./src/app/ct-visualization/components/ct-globe-infrastructure/ct-globe-infrastructure.component.ts":
/*!**********************************************************************************************************!*\
  !*** ./src/app/ct-visualization/components/ct-globe-infrastructure/ct-globe-infrastructure.component.ts ***!
  \**********************************************************************************************************/
/*! exports provided: CtGlobeInfrastructureComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CtGlobeInfrastructureComponent", function() { return CtGlobeInfrastructureComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_globe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three-globe */ "./node_modules/three-globe/dist/three-globe.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");

// import Globe from 'globe.gl';



class CtGlobeInfrastructureComponent {
    constructor(ctVisualization, ctVisualizationRequest) {
        this.ctVisualization = ctVisualization;
        this.ctVisualizationRequest = ctVisualizationRequest;
        this.subscriptions = [];
        this.raycaster = new three__WEBPACK_IMPORTED_MODULE_1__["Raycaster"]();
        this.mouse = new three__WEBPACK_IMPORTED_MODULE_1__["Vector2"]();
    }
    ngOnInit() { }
    ngAfterViewInit() {
        this.threeConstants = this.ctVisualization.getThreeCommonWindow();
        this.getAssetGeoData();
    }
    getAssetGeoData() {
        this.subscriptions.push(this.ctVisualizationRequest
            .getAssetsGeoData()
            .subscribe((response) => {
            if (response.features && response.features.length) {
                this.assetsGeoData = response.features;
                this.constructInfraGlobe();
            }
        }));
    }
    constructInfraGlobe() {
        this.formatGeoJsonResponse();
        const globe = new three_globe__WEBPACK_IMPORTED_MODULE_2__["default"]()
            .globeImageUrl("assets/earth-dark.jpg")
            .pointsData(this.filteredGlobeData)
            .pointAltitude(0.0005)
            .pointColor(() => "#007FFF")
            .pointRadius(0.2)
            .pointResolution(2000);
        this.threeConstants.scene.add(globe);
        this.configureSceneParameters();
        this.renderScene();
    }
    onPointClick(point) {
        console.log("point click");
    }
    formatGeoJsonResponse() {
        this.filteredGlobeData = this.assetsGeoData
            .filter((location) => {
            return (location.geometry &&
                location.geometry.coordinates &&
                location.geometry.coordinates.length === 2);
        })
            .map((location) => {
            return {
                lat: location.geometry.coordinates[1],
                lng: location.geometry.coordinates[0],
                label: location.properties && location.properties["city"]
                    ? location.properties["city"]
                    : "",
            };
        });
    }
    configureSceneParameters() {
        this.threeConstants.scene.add(new three__WEBPACK_IMPORTED_MODULE_1__["AmbientLight"](0xbbbbbb));
        this.threeConstants.scene.add(new three__WEBPACK_IMPORTED_MODULE_1__["DirectionalLight"](0xffffff, 0.6));
        this.threeConstants.renderer.setSize(1000, 500);
        this.canvasEl.nativeElement.appendChild(this.threeConstants.renderer.domElement);
        // (this.threeConstants.camera as THREE.PerspectiveCamera).aspect = this.canvasEl.nativeElement.offsetWidth / this.canvasEl.nativeElement.offsetHeight;
        this.threeConstants.camera.aspect = 1000 / 500;
        this.threeConstants
            .camera.updateProjectionMatrix();
        this.threeConstants.camera.position.z = 500;
        // controls.
        // this.tbControls = new TrackballControls(this.threeConstants.camera, this.threeConstants.renderer.domElement);
        // this.tbControls.minDistance = 101;
        // this.tbControls.rotateSpeed = 5;
        // this.tbControls.zoomSpeed = 0.8;
        this.obControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_3__["OrbitControls"](this.threeConstants.camera, this.threeConstants.renderer.domElement);
        this.obControls.minDistance = 101;
        this.obControls.rotateSpeed = 5;
        this.obControls.zoomSpeed = 0.8;
        // this.threeConstants.renderer.domElement.addEventListener('click', this.mouseMoveHandler.bind(this), false)
    }
    mouseMoveHandler(event) {
        this.mouse.x = (event.clientX / 1000) * 2 - 1;
        this.mouse.y = -(event.clientY / 500) * 2 + 1;
        this.enableRaycast = true;
    }
    raycastVisualization() {
        if (this.enableRaycast) {
            this.enableRaycast = false;
            this.raycaster.setFromCamera(this.mouse, this.threeConstants.camera);
            const intersects = this.raycaster.intersectObjects(this.threeConstants.scene.children, true);
            for (var i = 0; i < intersects.length; i++) {
                const changeProp = intersects[i].object &&
                    intersects[i].object["material"] &&
                    intersects[i].object["material"].color &&
                    intersects[i].object["material"].color.set;
                if (changeProp) {
                    console.log(changeProp, intersects[i]);
                    intersects[i].object["material"].color.set("red");
                }
                else {
                    console.log(changeProp, intersects[i]);
                }
            }
        }
    }
    renderScene() {
        this.obControls.update();
        this.raycastVisualization();
        this.threeConstants.renderer.render(this.threeConstants.scene, this.threeConstants.camera);
        window.requestAnimationFrame(this.renderScene.bind(this));
    }
    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
        this.ctVisualization.cleanScene(this.threeConstants);
    }
}


/***/ }),

/***/ "./src/app/ct-visualization/ct-visualization-routing.module.ts":
/*!*********************************************************************!*\
  !*** ./src/app/ct-visualization/ct-visualization-routing.module.ts ***!
  \*********************************************************************/
/*! exports provided: CtVisualizationRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CtVisualizationRoutingModule", function() { return CtVisualizationRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _common_enums_globe_module_routes_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/enums/globe-module-routes.enum */ "./src/app/common/enums/globe-module-routes.enum.ts");
/* harmony import */ var _components_ct_globe_gl_intfrastructure_ct_globe_gl_intfrastructure_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/ct-globe-gl-intfrastructure/ct-globe-gl-intfrastructure.component */ "./src/app/ct-visualization/components/ct-globe-gl-intfrastructure/ct-globe-gl-intfrastructure.component.ts");
/* harmony import */ var _components_ct_globe_infrastructure_ct_globe_infrastructure_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/ct-globe-infrastructure/ct-globe-infrastructure.component */ "./src/app/ct-visualization/components/ct-globe-infrastructure/ct-globe-infrastructure.component.ts");




const routes = [
    {
        path: `${_common_enums_globe_module_routes_enum__WEBPACK_IMPORTED_MODULE_1__["GlobeModuleRoutes"].globeGlPackage}`,
        component: _components_ct_globe_gl_intfrastructure_ct_globe_gl_intfrastructure_component__WEBPACK_IMPORTED_MODULE_2__["CtGlobeGlIntfrastructureComponent"],
    },
    {
        path: `${_common_enums_globe_module_routes_enum__WEBPACK_IMPORTED_MODULE_1__["GlobeModuleRoutes"].globeRaycaster}`,
        component: _components_ct_globe_infrastructure_ct_globe_infrastructure_component__WEBPACK_IMPORTED_MODULE_3__["CtGlobeInfrastructureComponent"],
    },
    {
        path: "",
        component: _components_ct_globe_gl_intfrastructure_ct_globe_gl_intfrastructure_component__WEBPACK_IMPORTED_MODULE_2__["CtGlobeGlIntfrastructureComponent"],
    },
];
class CtVisualizationRoutingModule {
}


/***/ }),

/***/ "./src/app/ct-visualization/ct-visualization.module.ngfactory.js":
/*!***********************************************************************!*\
  !*** ./src/app/ct-visualization/ct-visualization.module.ngfactory.js ***!
  \***********************************************************************/
/*! exports provided: CtVisualizationModuleNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CtVisualizationModuleNgFactory", function() { return CtVisualizationModuleNgFactory; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ct_visualization_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ct-visualization.module */ "./src/app/ct-visualization/ct-visualization.module.ts");
/* harmony import */ var _node_modules_angular_router_router_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/@angular/router/router.ngfactory */ "./node_modules/@angular/router/router.ngfactory.js");
/* harmony import */ var _components_ct_globe_gl_intfrastructure_ct_globe_gl_intfrastructure_component_ngfactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/ct-globe-gl-intfrastructure/ct-globe-gl-intfrastructure.component.ngfactory */ "./src/app/ct-visualization/components/ct-globe-gl-intfrastructure/ct-globe-gl-intfrastructure.component.ngfactory.js");
/* harmony import */ var _components_ct_globe_infrastructure_ct_globe_infrastructure_component_ngfactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/ct-globe-infrastructure/ct-globe-infrastructure.component.ngfactory */ "./src/app/ct-visualization/components/ct-globe-infrastructure/ct-globe-infrastructure.component.ngfactory.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _services_ct_visualization_request_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/ct-visualization-request.service */ "./src/app/ct-visualization/services/ct-visualization-request.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ct_visualization_routing_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ct-visualization-routing.module */ "./src/app/ct-visualization/ct-visualization-routing.module.ts");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/esm2015/bidi.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/esm2015/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/esm2015/platform.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm2015/button.js");
/* harmony import */ var _components_ct_globe_gl_intfrastructure_ct_globe_gl_intfrastructure_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/ct-globe-gl-intfrastructure/ct-globe-gl-intfrastructure.component */ "./src/app/ct-visualization/components/ct-globe-gl-intfrastructure/ct-globe-gl-intfrastructure.component.ts");
/* harmony import */ var _components_ct_globe_infrastructure_ct_globe_infrastructure_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/ct-globe-infrastructure/ct-globe-infrastructure.component */ "./src/app/ct-visualization/components/ct-globe-infrastructure/ct-globe-infrastructure.component.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 

















var CtVisualizationModuleNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcmf"](_ct_visualization_module__WEBPACK_IMPORTED_MODULE_1__["CtVisualizationModule"], [], function (_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmod"]([_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵCodegenComponentFactoryResolver"], [[8, [_node_modules_angular_router_router_ngfactory__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_router_router_lNgFactory"], _components_ct_globe_gl_intfrastructure_ct_globe_gl_intfrastructure_component_ngfactory__WEBPACK_IMPORTED_MODULE_3__["CtGlobeGlIntfrastructureComponentNgFactory"], _components_ct_globe_infrastructure_ct_globe_infrastructure_component_ngfactory__WEBPACK_IMPORTED_MODULE_4__["CtGlobeInfrastructureComponentNgFactory"]]], [3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgLocalization"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgLocaleLocalization"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_common_common_a"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpXsrfTokenExtractor"], _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_common_http_http_g"], [_angular_common__WEBPACK_IMPORTED_MODULE_5__["DOCUMENT"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["PLATFORM_ID"], _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_common_http_http_e"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_common_http_http_h"], _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_common_http_http_h"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpXsrfTokenExtractor"], _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_common_http_http_f"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HTTP_INTERCEPTORS"], function (p0_0) { return [p0_0]; }, [_angular_common_http__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_common_http_http_h"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_common_http_http_d"], _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_common_http_http_d"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](6144, _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["XhrFactory"], null, [_angular_common_http__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_common_http_http_d"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpXhrBackend"], _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpXhrBackend"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_6__["XhrFactory"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](6144, _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpBackend"], null, [_angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpXhrBackend"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpHandler"], _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["ɵHttpInterceptingHandler"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpBackend"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClient"], _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClient"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpHandler"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _services_ct_visualization_request_service__WEBPACK_IMPORTED_MODULE_7__["CtVisualizationRequestService"], _services_ct_visualization_request_service__WEBPACK_IMPORTED_MODULE_7__["CtVisualizationRequestService"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClient"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterModule"], _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterModule"], [[2, _angular_router__WEBPACK_IMPORTED_MODULE_8__["ɵangular_packages_router_router_a"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _ct_visualization_routing_module__WEBPACK_IMPORTED_MODULE_9__["CtVisualizationRoutingModule"], _ct_visualization_routing_module__WEBPACK_IMPORTED_MODULE_9__["CtVisualizationRoutingModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientXsrfModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientXsrfModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_10__["BidiModule"], _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_10__["BidiModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_11__["MatCommonModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_11__["MatCommonModule"], [[2, _angular_material_core__WEBPACK_IMPORTED_MODULE_11__["MATERIAL_SANITY_CHECKS"]], [2, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_12__["HAMMER_LOADER"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_13__["PlatformModule"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_13__["PlatformModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_11__["MatRippleModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_11__["MatRippleModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_button__WEBPACK_IMPORTED_MODULE_14__["MatButtonModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_14__["MatButtonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _ct_visualization_module__WEBPACK_IMPORTED_MODULE_1__["CtVisualizationModule"], _ct_visualization_module__WEBPACK_IMPORTED_MODULE_1__["CtVisualizationModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_router__WEBPACK_IMPORTED_MODULE_8__["ROUTES"], function () { return [[{ path: "globeGlPackage", component: _components_ct_globe_gl_intfrastructure_ct_globe_gl_intfrastructure_component__WEBPACK_IMPORTED_MODULE_15__["CtGlobeGlIntfrastructureComponent"] }, { path: "globeRaycasterEvent", component: _components_ct_globe_infrastructure_ct_globe_infrastructure_component__WEBPACK_IMPORTED_MODULE_16__["CtGlobeInfrastructureComponent"] }, { path: "", component: _components_ct_globe_gl_intfrastructure_ct_globe_gl_intfrastructure_component__WEBPACK_IMPORTED_MODULE_15__["CtGlobeGlIntfrastructureComponent"] }]]; }, []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_common_http_http_e"], "XSRF-TOKEN", []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_common_http_http_f"], "X-XSRF-TOKEN", [])]); });



/***/ }),

/***/ "./src/app/ct-visualization/ct-visualization.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/ct-visualization/ct-visualization.module.ts ***!
  \*************************************************************/
/*! exports provided: CtVisualizationModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CtVisualizationModule", function() { return CtVisualizationModule; });
class CtVisualizationModule {
}


/***/ }),

/***/ "./src/app/ct-visualization/services/ct-visualization-request.service.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/ct-visualization/services/ct-visualization-request.service.ts ***!
  \*******************************************************************************/
/*! exports provided: CtVisualizationRequestService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CtVisualizationRequestService", function() { return CtVisualizationRequestService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");


class CtVisualizationRequestService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.STATE_CAPITALS_PATH = 'assets/usa-capitals.geojson.json';
        this.ASSET_GEO_JSON_PATH = 'assets/capitals.geojson.json';
    }
    getAssetsGeoData() {
        return this.httpClient.get(this.ASSET_GEO_JSON_PATH);
    }
    getStateCapitals() {
        return this.httpClient.get(this.STATE_CAPITALS_PATH);
    }
}
CtVisualizationRequestService.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ factory: function CtVisualizationRequestService_Factory() { return new CtVisualizationRequestService(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); }, token: CtVisualizationRequestService, providedIn: "root" });


/***/ })

}]);
//# sourceMappingURL=ct-visualization-ct-visualization-module-ngfactory-es2015.js.map