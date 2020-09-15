(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ct-visualization-ct-visualization-module"],{

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

/***/ "./node_modules/raw-loader/index.js!./src/app/ct-visualization/components/ct-globe-gl-intfrastructure/ct-globe-gl-intfrastructure.component.html":
/*!**********************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/ct-visualization/components/ct-globe-gl-intfrastructure/ct-globe-gl-intfrastructure.component.html ***!
  \**********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h3>Coordinate Points: lib events, Globe.gl package (console listed)</h3>\n<div class=\"pos-relative\">\n    <button (click)=\"scrollToTop($event)\" mat-button class=\"top-btn\" color=\"accent\">Go to top</button>\n    <div #el class=\"pos-abs\"></div>\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/ct-visualization/components/ct-globe-infrastructure/ct-globe-infrastructure.component.html":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/ct-visualization/components/ct-globe-infrastructure/ct-globe-infrastructure.component.html ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h3>Coordinate Points: Raycaster events (console listed)</h3>\n<div #canvasEl></div>\n<!-- <canvas height=\"500\" width=\"1000\"  class=\"visualization--canvas\" #canvasEl></canvas> -->"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/ct-visualization/components/ct-visualization/ct-visualization.component.html":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/ct-visualization/components/ct-visualization/ct-visualization.component.html ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-ct-globe-infrastructure></app-ct-globe-infrastructure>\n<app-ct-globe-gl-intfrastructure></app-ct-globe-gl-intfrastructure>\n"

/***/ }),

/***/ "./src/app/ct-visualization/components/ct-globe-gl-intfrastructure/ct-globe-gl-intfrastructure.component.scss":
/*!********************************************************************************************************************!*\
  !*** ./src/app/ct-visualization/components/ct-globe-gl-intfrastructure/ct-globe-gl-intfrastructure.component.scss ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".pos-relative {\n  position: relative;\n}\n\n.pos-abs {\n  position: absolute;\n  height: 100vh;\n  left: -10.1vw;\n  right: 0;\n  top: 0;\n}\n\n.top-btn {\n  position: absolute;\n  top: 0;\n  right: 0;\n  z-index: 6;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zdW1pdC5rdW1hci9Xb3Jrc3BhY2UvZ2l0aHViL3NvdXJjZWNvZGUvVGhyZWVKc1ByaW1lci9zcmMvYXBwL2N0LXZpc3VhbGl6YXRpb24vY29tcG9uZW50cy9jdC1nbG9iZS1nbC1pbnRmcmFzdHJ1Y3R1cmUvY3QtZ2xvYmUtZ2wtaW50ZnJhc3RydWN0dXJlLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9jdC12aXN1YWxpemF0aW9uL2NvbXBvbmVudHMvY3QtZ2xvYmUtZ2wtaW50ZnJhc3RydWN0dXJlL2N0LWdsb2JlLWdsLWludGZyYXN0cnVjdHVyZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFBO0FDQ0o7O0FEQ0E7RUFDSSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxhQUFBO0VBQ0EsUUFBQTtFQUNBLE1BQUE7QUNFSjs7QURBQTtFQUNJLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLFFBQUE7RUFDQSxVQUFBO0FDR0oiLCJmaWxlIjoic3JjL2FwcC9jdC12aXN1YWxpemF0aW9uL2NvbXBvbmVudHMvY3QtZ2xvYmUtZ2wtaW50ZnJhc3RydWN0dXJlL2N0LWdsb2JlLWdsLWludGZyYXN0cnVjdHVyZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wb3MtcmVsYXRpdmV7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLnBvcy1hYnN7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGhlaWdodDogMTAwdmg7XG4gICAgbGVmdDogLTEwLjF2dztcbiAgICByaWdodDogMDtcbiAgICB0b3A6IDA7XG59XG4udG9wLWJ0bntcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wIDogMDtcbiAgICByaWdodDogMDtcbiAgICB6LWluZGV4OiA2O1xufSIsIi5wb3MtcmVsYXRpdmUge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5wb3MtYWJzIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBoZWlnaHQ6IDEwMHZoO1xuICBsZWZ0OiAtMTAuMXZ3O1xuICByaWdodDogMDtcbiAgdG9wOiAwO1xufVxuXG4udG9wLWJ0biB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICByaWdodDogMDtcbiAgei1pbmRleDogNjtcbn0iXX0= */"

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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var globe_gl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! globe.gl */ "./node_modules/globe.gl/dist/globe.gl.module.js");
/* harmony import */ var _services_ct_visualization_request_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/ct-visualization-request.service */ "./src/app/ct-visualization/services/ct-visualization-request.service.ts");




var CtGlobeGlIntfrastructureComponent = /** @class */ (function () {
    function CtGlobeGlIntfrastructureComponent(ctVisualization) {
        this.ctVisualization = ctVisualization;
    }
    CtGlobeGlIntfrastructureComponent.prototype.ngOnInit = function () {
    };
    CtGlobeGlIntfrastructureComponent.prototype.getStateCapitalsData = function () {
        var _this = this;
        this.ctVisualization.getStateCapitals()
            .subscribe(function (response) {
            if (response.features && response.features.length) {
                _this.formatGeoJsonResponse(response.features);
                _this.constructGlobe();
            }
        });
    };
    CtGlobeGlIntfrastructureComponent.prototype.ngAfterViewInit = function () {
        this.getStateCapitalsData();
    };
    CtGlobeGlIntfrastructureComponent.prototype.formatGeoJsonResponse = function (usaCapitalsGeoData) {
        this.filteredGlobeData = usaCapitalsGeoData
            .filter(function (location) {
            return (location.geometry && location.geometry.coordinates && location.geometry.coordinates.length === 2);
        }).map(function (location) {
            return {
                lat: location.geometry.coordinates[1],
                lng: location.geometry.coordinates[0],
                label: location.properties && location.properties.name ? location.properties.name : ''
            };
        });
    };
    CtGlobeGlIntfrastructureComponent.prototype.constructGlobe = function () {
        var globe = Object(globe_gl__WEBPACK_IMPORTED_MODULE_2__["default"])();
        globe(this.el.nativeElement)
            .globeImageUrl('assets/earth-dark.jpg')
            .pointsData(this.filteredGlobeData)
            .pointAltitude(0.0005)
            .pointColor(function (e) {
            return '#007FFF';
        })
            .pointRadius(.2)
            .pointResolution(2000)
            .onPointClick(function (point, event) {
            console.log('click', point, event, this);
        }).onPointHover(function (point, prevPoint) {
            console.log('hover', point, prevPoint, this);
        });
    };
    CtGlobeGlIntfrastructureComponent.prototype.scrollToTop = function ($event) {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };
    CtGlobeGlIntfrastructureComponent.ctorParameters = function () { return [
        { type: _services_ct_visualization_request_service__WEBPACK_IMPORTED_MODULE_3__["CtVisualizationRequestService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('el', { static: false })
    ], CtGlobeGlIntfrastructureComponent.prototype, "el", void 0);
    CtGlobeGlIntfrastructureComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-ct-globe-gl-intfrastructure',
            template: __webpack_require__(/*! raw-loader!./ct-globe-gl-intfrastructure.component.html */ "./node_modules/raw-loader/index.js!./src/app/ct-visualization/components/ct-globe-gl-intfrastructure/ct-globe-gl-intfrastructure.component.html"),
            styles: [__webpack_require__(/*! ./ct-globe-gl-intfrastructure.component.scss */ "./src/app/ct-visualization/components/ct-globe-gl-intfrastructure/ct-globe-gl-intfrastructure.component.scss")]
        })
    ], CtGlobeGlIntfrastructureComponent);
    return CtGlobeGlIntfrastructureComponent;
}());



/***/ }),

/***/ "./src/app/ct-visualization/components/ct-globe-infrastructure/ct-globe-infrastructure.component.scss":
/*!************************************************************************************************************!*\
  !*** ./src/app/ct-visualization/components/ct-globe-infrastructure/ct-globe-infrastructure.component.scss ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2N0LXZpc3VhbGl6YXRpb24vY29tcG9uZW50cy9jdC1nbG9iZS1pbmZyYXN0cnVjdHVyZS9jdC1nbG9iZS1pbmZyYXN0cnVjdHVyZS5jb21wb25lbnQuc2NzcyJ9 */"

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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_ct_visualization_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/ct-visualization.service */ "./src/app/ct-visualization/services/ct-visualization.service.ts");
/* harmony import */ var _services_ct_visualization_request_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/ct-visualization-request.service */ "./src/app/ct-visualization/services/ct-visualization-request.service.ts");
/* harmony import */ var three_globe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three-globe */ "./node_modules/three-globe/dist/three-globe.module.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");





// import Globe from 'globe.gl';


var CtGlobeInfrastructureComponent = /** @class */ (function () {
    function CtGlobeInfrastructureComponent(ctVisualization, ctVisualizationRequest) {
        this.ctVisualization = ctVisualization;
        this.ctVisualizationRequest = ctVisualizationRequest;
        this.subscriptions = [];
        this.raycaster = new three__WEBPACK_IMPORTED_MODULE_5__["Raycaster"]();
        this.mouse = new three__WEBPACK_IMPORTED_MODULE_5__["Vector2"]();
    }
    CtGlobeInfrastructureComponent.prototype.ngOnInit = function () {
    };
    CtGlobeInfrastructureComponent.prototype.ngAfterViewInit = function () {
        this.threeConstants = this.ctVisualization.generateThreeConstants();
        this.getAssetGeoData();
    };
    CtGlobeInfrastructureComponent.prototype.getAssetGeoData = function () {
        var _this = this;
        this.subscriptions.push(this.ctVisualizationRequest.getAssetsGeoData()
            .subscribe(function (response) {
            if (response.features && response.features.length) {
                _this.assetsGeoData = response.features;
                _this.constructInfraGlobe();
            }
        }));
    };
    CtGlobeInfrastructureComponent.prototype.constructInfraGlobe = function () {
        this.formatGeoJsonResponse();
        var globe = new three_globe__WEBPACK_IMPORTED_MODULE_4__["default"]()
            .globeImageUrl('assets/earth-dark.jpg')
            .pointsData(this.filteredGlobeData)
            .pointAltitude(0.0005)
            .pointColor(function () { return '#007FFF'; })
            .pointRadius(.2)
            .pointResolution(2000);
        this.threeConstants.scene.add(globe);
        this.configureSceneParameters();
        this.renderScene();
    };
    CtGlobeInfrastructureComponent.prototype.onPointClick = function (point) {
        console.log('point click');
    };
    CtGlobeInfrastructureComponent.prototype.formatGeoJsonResponse = function () {
        this.filteredGlobeData = this.assetsGeoData
            .filter(function (location) {
            return (location.geometry && location.geometry.coordinates && location.geometry.coordinates.length === 2);
        }).map(function (location) {
            return {
                lat: location.geometry.coordinates[1],
                lng: location.geometry.coordinates[0],
                label: location.properties && location.properties['city'] ? location.properties['city'] : ''
            };
        });
    };
    CtGlobeInfrastructureComponent.prototype.configureSceneParameters = function () {
        this.threeConstants.scene.add(new three__WEBPACK_IMPORTED_MODULE_5__["AmbientLight"](0xbbbbbb));
        this.threeConstants.scene.add(new three__WEBPACK_IMPORTED_MODULE_5__["DirectionalLight"](0xffffff, 0.6));
        this.threeConstants.renderer.setSize(1000, (500));
        this.canvasEl.nativeElement.appendChild(this.threeConstants.renderer.domElement);
        // (this.threeConstants.camera as THREE.PerspectiveCamera).aspect = this.canvasEl.nativeElement.offsetWidth / this.canvasEl.nativeElement.offsetHeight;
        this.threeConstants.camera.aspect = 1000 / 500;
        this.threeConstants.camera.updateProjectionMatrix();
        this.threeConstants.camera.position.z = 500;
        // controls.
        // this.tbControls = new TrackballControls(this.threeConstants.camera, this.threeConstants.renderer.domElement);
        // this.tbControls.minDistance = 101;
        // this.tbControls.rotateSpeed = 5;
        // this.tbControls.zoomSpeed = 0.8;
        this.obControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_6__["OrbitControls"](this.threeConstants.camera, this.threeConstants.renderer.domElement);
        this.obControls.minDistance = 101;
        this.obControls.rotateSpeed = 5;
        this.obControls.zoomSpeed = 0.8;
        // this.threeConstants.renderer.domElement.addEventListener('click', this.mouseMoveHandler.bind(this), false)
    };
    CtGlobeInfrastructureComponent.prototype.mouseMoveHandler = function (event) {
        this.mouse.x = (event.clientX / 1000) * 2 - 1;
        this.mouse.y = -(event.clientY / 500) * 2 + 1;
        this.enableRaycast = true;
    };
    CtGlobeInfrastructureComponent.prototype.raycastVisualization = function () {
        if (this.enableRaycast) {
            this.enableRaycast = false;
            this.raycaster.setFromCamera(this.mouse, this.threeConstants.camera);
            var intersects = this.raycaster.intersectObjects(this.threeConstants.scene.children, true);
            for (var i = 0; i < intersects.length; i++) {
                var changeProp = intersects[i].object &&
                    intersects[i].object['material'] &&
                    intersects[i].object['material'].color &&
                    intersects[i].object['material'].color.set;
                if (changeProp) {
                    console.log(changeProp, intersects[i]);
                    intersects[i].object['material'].color.set('red');
                }
                else {
                    console.log(changeProp, intersects[i]);
                }
            }
        }
    };
    CtGlobeInfrastructureComponent.prototype.renderScene = function () {
        this.obControls.update();
        this.raycastVisualization();
        this.threeConstants.renderer.render(this.threeConstants.scene, this.threeConstants.camera);
        window.requestAnimationFrame(this.renderScene.bind(this));
    };
    CtGlobeInfrastructureComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    CtGlobeInfrastructureComponent.ctorParameters = function () { return [
        { type: _services_ct_visualization_service__WEBPACK_IMPORTED_MODULE_2__["CtVisualizationService"] },
        { type: _services_ct_visualization_request_service__WEBPACK_IMPORTED_MODULE_3__["CtVisualizationRequestService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('canvasEl', { read: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], static: false })
    ], CtGlobeInfrastructureComponent.prototype, "canvasEl", void 0);
    CtGlobeInfrastructureComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-ct-globe-infrastructure',
            template: __webpack_require__(/*! raw-loader!./ct-globe-infrastructure.component.html */ "./node_modules/raw-loader/index.js!./src/app/ct-visualization/components/ct-globe-infrastructure/ct-globe-infrastructure.component.html"),
            styles: [__webpack_require__(/*! ./ct-globe-infrastructure.component.scss */ "./src/app/ct-visualization/components/ct-globe-infrastructure/ct-globe-infrastructure.component.scss")]
        })
    ], CtGlobeInfrastructureComponent);
    return CtGlobeInfrastructureComponent;
}());



/***/ }),

/***/ "./src/app/ct-visualization/components/ct-visualization/ct-visualization.component.scss":
/*!**********************************************************************************************!*\
  !*** ./src/app/ct-visualization/components/ct-visualization/ct-visualization.component.scss ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2N0LXZpc3VhbGl6YXRpb24vY29tcG9uZW50cy9jdC12aXN1YWxpemF0aW9uL2N0LXZpc3VhbGl6YXRpb24uY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/ct-visualization/components/ct-visualization/ct-visualization.component.ts":
/*!********************************************************************************************!*\
  !*** ./src/app/ct-visualization/components/ct-visualization/ct-visualization.component.ts ***!
  \********************************************************************************************/
/*! exports provided: CtVisualizationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CtVisualizationComponent", function() { return CtVisualizationComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var CtVisualizationComponent = /** @class */ (function () {
    function CtVisualizationComponent() {
    }
    CtVisualizationComponent.prototype.ngOnInit = function () {
    };
    CtVisualizationComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-ct-visualization',
            template: __webpack_require__(/*! raw-loader!./ct-visualization.component.html */ "./node_modules/raw-loader/index.js!./src/app/ct-visualization/components/ct-visualization/ct-visualization.component.html"),
            styles: [__webpack_require__(/*! ./ct-visualization.component.scss */ "./src/app/ct-visualization/components/ct-visualization/ct-visualization.component.scss")]
        })
    ], CtVisualizationComponent);
    return CtVisualizationComponent;
}());



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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _components_ct_visualization_ct_visualization_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/ct-visualization/ct-visualization.component */ "./src/app/ct-visualization/components/ct-visualization/ct-visualization.component.ts");




var routes = [
    {
        path: '',
        component: _components_ct_visualization_ct_visualization_component__WEBPACK_IMPORTED_MODULE_3__["CtVisualizationComponent"]
    }
];
var CtVisualizationRoutingModule = /** @class */ (function () {
    function CtVisualizationRoutingModule() {
    }
    CtVisualizationRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], CtVisualizationRoutingModule);
    return CtVisualizationRoutingModule;
}());



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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ct_visualization_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ct-visualization-routing.module */ "./src/app/ct-visualization/ct-visualization-routing.module.ts");
/* harmony import */ var _components_ct_visualization_ct_visualization_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/ct-visualization/ct-visualization.component */ "./src/app/ct-visualization/components/ct-visualization/ct-visualization.component.ts");
/* harmony import */ var _components_ct_globe_infrastructure_ct_globe_infrastructure_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/ct-globe-infrastructure/ct-globe-infrastructure.component */ "./src/app/ct-visualization/components/ct-globe-infrastructure/ct-globe-infrastructure.component.ts");
/* harmony import */ var _services_ct_visualization_request_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/ct-visualization-request.service */ "./src/app/ct-visualization/services/ct-visualization-request.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _components_ct_globe_gl_intfrastructure_ct_globe_gl_intfrastructure_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/ct-globe-gl-intfrastructure/ct-globe-gl-intfrastructure.component */ "./src/app/ct-visualization/components/ct-globe-gl-intfrastructure/ct-globe-gl-intfrastructure.component.ts");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");










var CtVisualizationModule = /** @class */ (function () {
    function CtVisualizationModule() {
    }
    CtVisualizationModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_components_ct_visualization_ct_visualization_component__WEBPACK_IMPORTED_MODULE_4__["CtVisualizationComponent"], _components_ct_globe_infrastructure_ct_globe_infrastructure_component__WEBPACK_IMPORTED_MODULE_5__["CtGlobeInfrastructureComponent"], _components_ct_globe_gl_intfrastructure_ct_globe_gl_intfrastructure_component__WEBPACK_IMPORTED_MODULE_8__["CtGlobeGlIntfrastructureComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _ct_visualization_routing_module__WEBPACK_IMPORTED_MODULE_3__["CtVisualizationRoutingModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatButtonModule"]
            ],
            providers: [
                _services_ct_visualization_request_service__WEBPACK_IMPORTED_MODULE_6__["CtVisualizationRequestService"]
            ]
        })
    ], CtVisualizationModule);
    return CtVisualizationModule;
}());



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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



var CtVisualizationRequestService = /** @class */ (function () {
    function CtVisualizationRequestService(httpClient) {
        this.httpClient = httpClient;
        this.STATE_CAPITALS_PATH = 'assets/usa-capitals.geojson.json';
        this.ASSET_GEO_JSON_PATH = 'assets/capitals.geojson.json';
    }
    CtVisualizationRequestService.prototype.getAssetsGeoData = function () {
        return this.httpClient.get(this.ASSET_GEO_JSON_PATH);
    };
    CtVisualizationRequestService.prototype.getStateCapitals = function () {
        return this.httpClient.get(this.STATE_CAPITALS_PATH);
    };
    CtVisualizationRequestService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    CtVisualizationRequestService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
    ], CtVisualizationRequestService);
    return CtVisualizationRequestService;
}());



/***/ }),

/***/ "./src/app/ct-visualization/services/ct-visualization.service.ts":
/*!***********************************************************************!*\
  !*** ./src/app/ct-visualization/services/ct-visualization.service.ts ***!
  \***********************************************************************/
/*! exports provided: CtVisualizationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CtVisualizationService", function() { return CtVisualizationService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");



var CtVisualizationService = /** @class */ (function () {
    function CtVisualizationService() {
    }
    CtVisualizationService.prototype.generateThreeConstants = function (canvasEl) {
        var scene = new three__WEBPACK_IMPORTED_MODULE_2__["Scene"]();
        var camera = new three__WEBPACK_IMPORTED_MODULE_2__["PerspectiveCamera"]();
        var renderer = canvasEl ? new three__WEBPACK_IMPORTED_MODULE_2__["WebGLRenderer"]({ canvas: canvasEl }) : new three__WEBPACK_IMPORTED_MODULE_2__["WebGLRenderer"]();
        return { scene: scene, camera: camera, renderer: renderer };
    };
    CtVisualizationService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
    ], CtVisualizationService);
    return CtVisualizationService;
}());



/***/ })

}]);
//# sourceMappingURL=ct-visualization-ct-visualization-module-es5.js.map