(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["network-graph-network-graph-module-ngfactory"],{

/***/ "./node_modules/three-spritetext/dist/three-spritetext.module.js":
/*!***********************************************************************!*\
  !*** ./node_modules/three-spritetext/dist/three-spritetext.module.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
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

var three = window.THREE ? window.THREE // Prefer consumption from global THREE, if exists
: {
  LinearFilter: three__WEBPACK_IMPORTED_MODULE_0__["LinearFilter"],
  Sprite: three__WEBPACK_IMPORTED_MODULE_0__["Sprite"],
  SpriteMaterial: three__WEBPACK_IMPORTED_MODULE_0__["SpriteMaterial"],
  Texture: three__WEBPACK_IMPORTED_MODULE_0__["Texture"]
};

var _default = /*#__PURE__*/function (_three$Sprite) {
  _inherits(_default, _three$Sprite);

  var _super = _createSuper(_default);

  function _default() {
    var _this;

    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var textHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
    var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'rgba(255, 255, 255, 1)';

    _classCallCheck(this, _default);

    _this = _super.call(this, new three.SpriteMaterial({
      map: new three.Texture()
    }));
    _this._text = "".concat(text);
    _this._textHeight = textHeight;
    _this._color = color;
    _this._backgroundColor = false; // no background color

    _this._padding = 0;
    _this._borderWidth = 0;
    _this._borderColor = 'white';
    _this._strokeWidth = 0;
    _this._strokeColor = 'white';
    _this._fontFace = 'Arial';
    _this._fontSize = 90; // defines text resolution

    _this._fontWeight = 'normal';
    _this._canvas = document.createElement('canvas');
    _this._texture = _this.material.map;
    _this._texture.minFilter = three.LinearFilter;

    _this._genCanvas();

    return _this;
  }

  _createClass(_default, [{
    key: "_genCanvas",
    value: function _genCanvas() {
      var _this2 = this;

      var canvas = this._canvas;
      var ctx = canvas.getContext('2d');
      var border = Array.isArray(this.borderWidth) ? this.borderWidth : [this.borderWidth, this.borderWidth]; // x,y border

      var relBorder = border.map(function (b) {
        return b * _this2.fontSize * 0.1;
      }); // border in canvas units

      var padding = Array.isArray(this.padding) ? this.padding : [this.padding, this.padding]; // x,y padding

      var relPadding = padding.map(function (p) {
        return p * _this2.fontSize * 0.1;
      }); // padding in canvas units

      var lines = this.text.split('\n');
      var font = "".concat(this.fontWeight, " ").concat(this.fontSize, "px ").concat(this.fontFace);
      ctx.font = font; // measure canvas with appropriate font

      var innerWidth = Math.max.apply(Math, _toConsumableArray(lines.map(function (line) {
        return ctx.measureText(line).width;
      })));
      var innerHeight = this.fontSize * lines.length;
      canvas.width = innerWidth + relBorder[0] * 2 + relPadding[0] * 2;
      canvas.height = innerHeight + relBorder[1] * 2 + relPadding[1] * 2; // paint border

      if (this.borderWidth) {
        ctx.strokeStyle = this.borderColor;

        if (relBorder[0]) {
          ctx.lineWidth = relBorder[0] * 2;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, canvas.height);
          ctx.moveTo(canvas.width, 0);
          ctx.lineTo(canvas.width, canvas.height);
          ctx.stroke();
        }

        if (relBorder[1]) {
          ctx.lineWidth = relBorder[1] * 2;
          ctx.beginPath();
          ctx.moveTo(relBorder[0], 0);
          ctx.lineTo(canvas.width - relBorder[0], 0);
          ctx.moveTo(relBorder[0], canvas.height);
          ctx.lineTo(canvas.width - relBorder[0], canvas.height);
          ctx.stroke();
        }
      }

      ctx.translate.apply(ctx, _toConsumableArray(relBorder)); // paint background

      if (this.backgroundColor) {
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, canvas.width - relBorder[0] * 2, canvas.height - relBorder[1] * 2);
      }

      ctx.translate.apply(ctx, _toConsumableArray(relPadding)); // paint text

      ctx.font = font; // Set font again after canvas is resized, as context properties are reset

      ctx.fillStyle = this.color;
      ctx.textBaseline = 'bottom';
      var drawTextStroke = this.strokeWidth > 0;

      if (drawTextStroke) {
        ctx.lineWidth = this.strokeWidth * this.fontSize / 10;
        ctx.strokeStyle = this.strokeColor;
      }

      lines.forEach(function (line, index) {
        var lineX = (innerWidth - ctx.measureText(line).width) / 2;
        var lineY = (index + 1) * _this2.fontSize;
        drawTextStroke && ctx.strokeText(line, lineX, lineY);
        ctx.fillText(line, lineX, lineY);
      }); // Inject canvas into sprite

      this._texture.image = canvas;
      this._texture.needsUpdate = true;
      var yScale = this.textHeight * lines.length + border[1] * 2 + padding[1] * 2;
      this.scale.set(yScale * canvas.width / canvas.height, yScale, 0);
    }
  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor(this.text, this.textHeight, this.color).copy(this);
    }
  }, {
    key: "copy",
    value: function copy(source) {
      three.Sprite.prototype.copy.call(this, source);
      this.color = source.color;
      this.backgroundColor = source.backgroundColor;
      this.padding = source.padding;
      this.borderWidth = source.borderWidth;
      this.borderColor = source.borderColor;
      this.fontFace = source.fontFace;
      this.fontSize = source.fontSize;
      this.fontWeight = source.fontWeight;
      this.strokeWidth = source.strokeWidth;
      this.strokeColor = source.strokeColor;
      return this;
    }
  }, {
    key: "text",
    get: function get() {
      return this._text;
    },
    set: function set(text) {
      this._text = text;

      this._genCanvas();
    }
  }, {
    key: "textHeight",
    get: function get() {
      return this._textHeight;
    },
    set: function set(textHeight) {
      this._textHeight = textHeight;

      this._genCanvas();
    }
  }, {
    key: "color",
    get: function get() {
      return this._color;
    },
    set: function set(color) {
      this._color = color;

      this._genCanvas();
    }
  }, {
    key: "backgroundColor",
    get: function get() {
      return this._backgroundColor;
    },
    set: function set(color) {
      this._backgroundColor = color;

      this._genCanvas();
    }
  }, {
    key: "padding",
    get: function get() {
      return this._padding;
    },
    set: function set(padding) {
      this._padding = padding;

      this._genCanvas();
    }
  }, {
    key: "borderWidth",
    get: function get() {
      return this._borderWidth;
    },
    set: function set(borderWidth) {
      this._borderWidth = borderWidth;

      this._genCanvas();
    }
  }, {
    key: "borderColor",
    get: function get() {
      return this._borderColor;
    },
    set: function set(borderColor) {
      this._borderColor = borderColor;

      this._genCanvas();
    }
  }, {
    key: "fontFace",
    get: function get() {
      return this._fontFace;
    },
    set: function set(fontFace) {
      this._fontFace = fontFace;

      this._genCanvas();
    }
  }, {
    key: "fontSize",
    get: function get() {
      return this._fontSize;
    },
    set: function set(fontSize) {
      this._fontSize = fontSize;

      this._genCanvas();
    }
  }, {
    key: "fontWeight",
    get: function get() {
      return this._fontWeight;
    },
    set: function set(fontWeight) {
      this._fontWeight = fontWeight;

      this._genCanvas();
    }
  }, {
    key: "strokeWidth",
    get: function get() {
      return this._strokeWidth;
    },
    set: function set(strokeWidth) {
      this._strokeWidth = strokeWidth;

      this._genCanvas();
    }
  }, {
    key: "strokeColor",
    get: function get() {
      return this._strokeColor;
    },
    set: function set(strokeColor) {
      this._strokeColor = strokeColor;

      this._genCanvas();
    }
  }]);

  return _default;
}(three.Sprite);

/* harmony default export */ __webpack_exports__["default"] = (_default);


/***/ }),

/***/ "./node_modules/three/examples/jsm/lines/LineMaterial.js":
/*!***************************************************************!*\
  !*** ./node_modules/three/examples/jsm/lines/LineMaterial.js ***!
  \***************************************************************/
/*! exports provided: LineMaterial */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineMaterial", function() { return LineMaterial; });
/* harmony import */ var _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../build/three.module.js */ "./node_modules/three/build/three.module.js");


/**
 * parameters = {
 *  color: <hex>,
 *  linewidth: <float>,
 *  dashed: <boolean>,
 *  dashScale: <float>,
 *  dashSize: <float>,
 *  gapSize: <float>,
 *  resolution: <Vector2>, // to be set by renderer
 * }
 */

_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["UniformsLib"].line = {

	linewidth: { value: 1 },
	resolution: { value: new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Vector2"]( 1, 1 ) },
	dashScale: { value: 1 },
	dashSize: { value: 1 },
	gapSize: { value: 1 }, // todo FIX - maybe change to totalSize
	opacity: { value: 1 }

};

_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["ShaderLib"][ 'line' ] = {

	uniforms: _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["UniformsUtils"].merge( [
		_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["UniformsLib"].common,
		_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["UniformsLib"].fog,
		_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["UniformsLib"].line
	] ),

	vertexShader:
		`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		varying vec2 vUv;

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;

			#endif

			float aspect = resolution.x / resolution.y;

			vUv = uv;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec2 ndcStart = clipStart.xy / clipStart.w;
			vec2 ndcEnd = clipEnd.xy / clipEnd.w;

			// direction
			vec2 dir = ndcEnd - ndcStart;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			// perpendicular to dir
			vec2 offset = vec2( dir.y, - dir.x );

			// undo aspect ratio adjustment
			dir.x /= aspect;
			offset.x /= aspect;

			// sign flip
			if ( position.x < 0.0 ) offset *= - 1.0;

			// endcaps
			if ( position.y < 0.0 ) {

				offset += - dir;

			} else if ( position.y > 1.0 ) {

				offset += dir;

			}

			// adjust for linewidth
			offset *= linewidth;

			// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
			offset /= resolution.y;

			// select end
			vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

			// back to clip space
			offset *= clip.w;

			clip.xy += offset;

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,

	fragmentShader:
		`
		uniform vec3 diffuse;
		uniform float opacity;

		#ifdef USE_DASH

			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		varying vec2 vUv;

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			if ( abs( vUv.y ) > 1.0 ) {

				float a = vUv.x;
				float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
				float len2 = a * a + b * b;

				if ( len2 > 1.0 ) discard;

			}

			vec4 diffuseColor = vec4( diffuse, opacity );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, diffuseColor.a );

			#include <tonemapping_fragment>
			#include <encodings_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`
};

var LineMaterial = function ( parameters ) {

	_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["ShaderMaterial"].call( this, {

		type: 'LineMaterial',

		uniforms: _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["UniformsUtils"].clone( _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["ShaderLib"][ 'line' ].uniforms ),

		vertexShader: _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["ShaderLib"][ 'line' ].vertexShader,
		fragmentShader: _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["ShaderLib"][ 'line' ].fragmentShader,

		clipping: true // required for clipping support

	} );

	this.dashed = false;

	Object.defineProperties( this, {

		color: {

			enumerable: true,

			get: function () {

				return this.uniforms.diffuse.value;

			},

			set: function ( value ) {

				this.uniforms.diffuse.value = value;

			}

		},

		linewidth: {

			enumerable: true,

			get: function () {

				return this.uniforms.linewidth.value;

			},

			set: function ( value ) {

				this.uniforms.linewidth.value = value;

			}

		},

		dashScale: {

			enumerable: true,

			get: function () {

				return this.uniforms.dashScale.value;

			},

			set: function ( value ) {

				this.uniforms.dashScale.value = value;

			}

		},

		dashSize: {

			enumerable: true,

			get: function () {

				return this.uniforms.dashSize.value;

			},

			set: function ( value ) {

				this.uniforms.dashSize.value = value;

			}

		},

		gapSize: {

			enumerable: true,

			get: function () {

				return this.uniforms.gapSize.value;

			},

			set: function ( value ) {

				this.uniforms.gapSize.value = value;

			}

		},

		opacity: {

			enumerable: true,

			get: function () {

				return this.uniforms.opacity.value;

			},

			set: function ( value ) {

				this.uniforms.opacity.value = value;

			}

		},

		resolution: {

			enumerable: true,

			get: function () {

				return this.uniforms.resolution.value;

			},

			set: function ( value ) {

				this.uniforms.resolution.value.copy( value );

			}

		}

	} );

	this.setValues( parameters );

};

LineMaterial.prototype = Object.create( _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["ShaderMaterial"].prototype );
LineMaterial.prototype.constructor = LineMaterial;

LineMaterial.prototype.isLineMaterial = true;




/***/ }),

/***/ "./node_modules/three/examples/jsm/lines/LineSegments2.js":
/*!****************************************************************!*\
  !*** ./node_modules/three/examples/jsm/lines/LineSegments2.js ***!
  \****************************************************************/
/*! exports provided: LineSegments2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineSegments2", function() { return LineSegments2; });
/* harmony import */ var _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../build/three.module.js */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _lines_LineSegmentsGeometry_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lines/LineSegmentsGeometry.js */ "./node_modules/three/examples/jsm/lines/LineSegmentsGeometry.js");
/* harmony import */ var _lines_LineMaterial_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lines/LineMaterial.js */ "./node_modules/three/examples/jsm/lines/LineMaterial.js");




var LineSegments2 = function ( geometry, material ) {

	if ( geometry === undefined ) geometry = new _lines_LineSegmentsGeometry_js__WEBPACK_IMPORTED_MODULE_1__["LineSegmentsGeometry"]();
	if ( material === undefined ) material = new _lines_LineMaterial_js__WEBPACK_IMPORTED_MODULE_2__["LineMaterial"]( { color: Math.random() * 0xffffff } );

	_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Mesh"].call( this, geometry, material );

	this.type = 'LineSegments2';

};

LineSegments2.prototype = Object.assign( Object.create( _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Mesh"].prototype ), {

	constructor: LineSegments2,

	isLineSegments2: true,

	computeLineDistances: ( function () { // for backwards-compatability, but could be a method of LineSegmentsGeometry...

		var start = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
		var end = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();

		return function computeLineDistances() {

			var geometry = this.geometry;

			var instanceStart = geometry.attributes.instanceStart;
			var instanceEnd = geometry.attributes.instanceEnd;
			var lineDistances = new Float32Array( 2 * instanceStart.data.count );

			for ( var i = 0, j = 0, l = instanceStart.data.count; i < l; i ++, j += 2 ) {

				start.fromBufferAttribute( instanceStart, i );
				end.fromBufferAttribute( instanceEnd, i );

				lineDistances[ j ] = ( j === 0 ) ? 0 : lineDistances[ j - 1 ];
				lineDistances[ j + 1 ] = lineDistances[ j ] + start.distanceTo( end );

			}

			var instanceDistanceBuffer = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["InstancedInterleavedBuffer"]( lineDistances, 2, 1 ); // d0, d1

			geometry.setAttribute( 'instanceDistanceStart', new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["InterleavedBufferAttribute"]( instanceDistanceBuffer, 1, 0 ) ); // d0
			geometry.setAttribute( 'instanceDistanceEnd', new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["InterleavedBufferAttribute"]( instanceDistanceBuffer, 1, 1 ) ); // d1

			return this;

		};

	}() ),

	raycast: ( function () {

		var start = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Vector4"]();
		var end = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Vector4"]();

		var ssOrigin = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Vector4"]();
		var ssOrigin3 = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
		var mvMatrix = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Matrix4"]();
		var line = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Line3"]();
		var closestPoint = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();

		return function raycast( raycaster, intersects ) {

			if ( raycaster.camera === null ) {

				console.error( 'LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2.' );

			}

			var threshold = ( raycaster.params.Line2 !== undefined ) ? raycaster.params.Line2.threshold || 0 : 0;

			var ray = raycaster.ray;
			var camera = raycaster.camera;
			var projectionMatrix = camera.projectionMatrix;

			var geometry = this.geometry;
			var material = this.material;
			var resolution = material.resolution;
			var lineWidth = material.linewidth + threshold;

			var instanceStart = geometry.attributes.instanceStart;
			var instanceEnd = geometry.attributes.instanceEnd;

			// pick a point 1 unit out along the ray to avoid the ray origin
			// sitting at the camera origin which will cause "w" to be 0 when
			// applying the projection matrix.
			ray.at( 1, ssOrigin );

			// ndc space [ - 1.0, 1.0 ]
			ssOrigin.w = 1;
			ssOrigin.applyMatrix4( camera.matrixWorldInverse );
			ssOrigin.applyMatrix4( projectionMatrix );
			ssOrigin.multiplyScalar( 1 / ssOrigin.w );

			// screen space
			ssOrigin.x *= resolution.x / 2;
			ssOrigin.y *= resolution.y / 2;
			ssOrigin.z = 0;

			ssOrigin3.copy( ssOrigin );

			var matrixWorld = this.matrixWorld;
			mvMatrix.multiplyMatrices( camera.matrixWorldInverse, matrixWorld );

			for ( var i = 0, l = instanceStart.count; i < l; i ++ ) {

				start.fromBufferAttribute( instanceStart, i );
				end.fromBufferAttribute( instanceEnd, i );

				start.w = 1;
				end.w = 1;

				// camera space
				start.applyMatrix4( mvMatrix );
				end.applyMatrix4( mvMatrix );

				// clip space
				start.applyMatrix4( projectionMatrix );
				end.applyMatrix4( projectionMatrix );

				// ndc space [ - 1.0, 1.0 ]
				start.multiplyScalar( 1 / start.w );
				end.multiplyScalar( 1 / end.w );

				// skip the segment if it's outside the camera near and far planes
				var isBehindCameraNear = start.z < - 1 && end.z < - 1;
				var isPastCameraFar = start.z > 1 && end.z > 1;
				if ( isBehindCameraNear || isPastCameraFar ) {

					continue;

				}

				// screen space
				start.x *= resolution.x / 2;
				start.y *= resolution.y / 2;

				end.x *= resolution.x / 2;
				end.y *= resolution.y / 2;

				// create 2d segment
				line.start.copy( start );
				line.start.z = 0;

				line.end.copy( end );
				line.end.z = 0;

				// get closest point on ray to segment
				var param = line.closestPointToPointParameter( ssOrigin3, true );
				line.at( param, closestPoint );

				// check if the intersection point is within clip space
				var zPos = _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["MathUtils"].lerp( start.z, end.z, param );
				var isInClipSpace = zPos >= - 1 && zPos <= 1;

				var isInside = ssOrigin3.distanceTo( closestPoint ) < lineWidth * 0.5;

				if ( isInClipSpace && isInside ) {

					line.start.fromBufferAttribute( instanceStart, i );
					line.end.fromBufferAttribute( instanceEnd, i );

					line.start.applyMatrix4( matrixWorld );
					line.end.applyMatrix4( matrixWorld );

					var pointOnLine = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
					var point = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();

					ray.distanceSqToSegment( line.start, line.end, point, pointOnLine );

					intersects.push( {

						point: point,
						pointOnLine: pointOnLine,
						distance: ray.origin.distanceTo( point ),

						object: this,
						face: null,
						faceIndex: i,
						uv: null,
						uv2: null,

					} );

				}

			}

		};

	}() )

} );




/***/ }),

/***/ "./node_modules/three/examples/jsm/lines/LineSegmentsGeometry.js":
/*!***********************************************************************!*\
  !*** ./node_modules/three/examples/jsm/lines/LineSegmentsGeometry.js ***!
  \***********************************************************************/
/*! exports provided: LineSegmentsGeometry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineSegmentsGeometry", function() { return LineSegmentsGeometry; });
/* harmony import */ var _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../build/three.module.js */ "./node_modules/three/build/three.module.js");


var LineSegmentsGeometry = function () {

	_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["InstancedBufferGeometry"].call( this );

	this.type = 'LineSegmentsGeometry';

	var positions = [ - 1, 2, 0, 1, 2, 0, - 1, 1, 0, 1, 1, 0, - 1, 0, 0, 1, 0, 0, - 1, - 1, 0, 1, - 1, 0 ];
	var uvs = [ - 1, 2, 1, 2, - 1, 1, 1, 1, - 1, - 1, 1, - 1, - 1, - 2, 1, - 2 ];
	var index = [ 0, 2, 1, 2, 3, 1, 2, 4, 3, 4, 5, 3, 4, 6, 5, 6, 7, 5 ];

	this.setIndex( index );
	this.setAttribute( 'position', new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Float32BufferAttribute"]( positions, 3 ) );
	this.setAttribute( 'uv', new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Float32BufferAttribute"]( uvs, 2 ) );

};

LineSegmentsGeometry.prototype = Object.assign( Object.create( _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["InstancedBufferGeometry"].prototype ), {

	constructor: LineSegmentsGeometry,

	isLineSegmentsGeometry: true,

	applyMatrix4: function ( matrix ) {

		var start = this.attributes.instanceStart;
		var end = this.attributes.instanceEnd;

		if ( start !== undefined ) {

			start.applyMatrix4( matrix );

			end.applyMatrix4( matrix );

			start.needsUpdate = true;

		}

		if ( this.boundingBox !== null ) {

			this.computeBoundingBox();

		}

		if ( this.boundingSphere !== null ) {

			this.computeBoundingSphere();

		}

		return this;

	},

	setPositions: function ( array ) {

		var lineSegments;

		if ( array instanceof Float32Array ) {

			lineSegments = array;

		} else if ( Array.isArray( array ) ) {

			lineSegments = new Float32Array( array );

		}

		var instanceBuffer = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["InstancedInterleavedBuffer"]( lineSegments, 6, 1 ); // xyz, xyz

		this.setAttribute( 'instanceStart', new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["InterleavedBufferAttribute"]( instanceBuffer, 3, 0 ) ); // xyz
		this.setAttribute( 'instanceEnd', new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["InterleavedBufferAttribute"]( instanceBuffer, 3, 3 ) ); // xyz

		//

		this.computeBoundingBox();
		this.computeBoundingSphere();

		return this;

	},

	setColors: function ( array ) {

		var colors;

		if ( array instanceof Float32Array ) {

			colors = array;

		} else if ( Array.isArray( array ) ) {

			colors = new Float32Array( array );

		}

		var instanceColorBuffer = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["InstancedInterleavedBuffer"]( colors, 6, 1 ); // rgb, rgb

		this.setAttribute( 'instanceColorStart', new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["InterleavedBufferAttribute"]( instanceColorBuffer, 3, 0 ) ); // rgb
		this.setAttribute( 'instanceColorEnd', new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["InterleavedBufferAttribute"]( instanceColorBuffer, 3, 3 ) ); // rgb

		return this;

	},

	fromWireframeGeometry: function ( geometry ) {

		this.setPositions( geometry.attributes.position.array );

		return this;

	},

	fromEdgesGeometry: function ( geometry ) {

		this.setPositions( geometry.attributes.position.array );

		return this;

	},

	fromMesh: function ( mesh ) {

		this.fromWireframeGeometry( new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["WireframeGeometry"]( mesh.geometry ) );

		// set colors, maybe

		return this;

	},

	fromLineSegments: function ( lineSegments ) {

		var geometry = lineSegments.geometry;

		if ( geometry.isGeometry ) {

			this.setPositions( geometry.vertices );

		} else if ( geometry.isBufferGeometry ) {

			this.setPositions( geometry.attributes.position.array ); // assumes non-indexed

		}

		// set colors, maybe

		return this;

	},

	computeBoundingBox: function () {

		var box = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Box3"]();

		return function computeBoundingBox() {

			if ( this.boundingBox === null ) {

				this.boundingBox = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Box3"]();

			}

			var start = this.attributes.instanceStart;
			var end = this.attributes.instanceEnd;

			if ( start !== undefined && end !== undefined ) {

				this.boundingBox.setFromBufferAttribute( start );

				box.setFromBufferAttribute( end );

				this.boundingBox.union( box );

			}

		};

	}(),

	computeBoundingSphere: function () {

		var vector = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();

		return function computeBoundingSphere() {

			if ( this.boundingSphere === null ) {

				this.boundingSphere = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Sphere"]();

			}

			if ( this.boundingBox === null ) {

				this.computeBoundingBox();

			}

			var start = this.attributes.instanceStart;
			var end = this.attributes.instanceEnd;

			if ( start !== undefined && end !== undefined ) {

				var center = this.boundingSphere.center;

				this.boundingBox.getCenter( center );

				var maxRadiusSq = 0;

				for ( var i = 0, il = start.count; i < il; i ++ ) {

					vector.fromBufferAttribute( start, i );
					maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( vector ) );

					vector.fromBufferAttribute( end, i );
					maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( vector ) );

				}

				this.boundingSphere.radius = Math.sqrt( maxRadiusSq );

				if ( isNaN( this.boundingSphere.radius ) ) {

					console.error( 'THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.', this );

				}

			}

		};

	}(),

	toJSON: function () {

		// todo

	},

	applyMatrix: function ( matrix ) {

		console.warn( 'THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4().' );

		return this.applyMatrix4( matrix );

	}

} );




/***/ }),

/***/ "./src/app/network-graph/components/group-layout/group-layout.component.ngfactory.js":
/*!*******************************************************************************************!*\
  !*** ./src/app/network-graph/components/group-layout/group-layout.component.ngfactory.js ***!
  \*******************************************************************************************/
/*! exports provided: RenderType_GroupLayoutComponent, View_GroupLayoutComponent_0, View_GroupLayoutComponent_Host_0, GroupLayoutComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_GroupLayoutComponent", function() { return RenderType_GroupLayoutComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_GroupLayoutComponent_0", function() { return View_GroupLayoutComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_GroupLayoutComponent_Host_0", function() { return View_GroupLayoutComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupLayoutComponentNgFactory", function() { return GroupLayoutComponentNgFactory; });
/* harmony import */ var _group_layout_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./group-layout.component.scss.shim.ngstyle */ "./src/app/network-graph/components/group-layout/group-layout.component.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _group_layout_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./group-layout.component */ "./src/app/network-graph/components/group-layout/group-layout.component.ts");
/* harmony import */ var _three_services_three_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../three/services/three.service */ "./src/app/three/services/three.service.ts");
/* harmony import */ var _services_network_graph_request_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/network-graph-request.service */ "./src/app/network-graph/services/network-graph-request.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 





var styles_GroupLayoutComponent = [_group_layout_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_GroupLayoutComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_GroupLayoutComponent, data: {} });

function View_GroupLayoutComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](671088640, 1, { canvasEl: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](671088640, 2, { statsEl: 0 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, [[2, 0], ["stats", 1]], null, 44, "section", [["style", "position: relative"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 40, "section", [["class", "metrices"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](5, null, ["Render Calls: ", ""])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](6, 0, null, null, 7, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Node type "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](8, 0, null, null, 2, "label", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](9, 0, null, null, 0, "input", [["name", "nodeGeometryType"], ["type", "radio"], ["value", "obj"]], null, [[null, "change"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("change" === en)) {
        var pd_0 = (_co.nodeGeometryChangeHandler($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Imported Model "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](11, 0, null, null, 2, "label", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](12, 0, null, null, 0, "input", [["name", "nodeGeometryType"], ["type", "radio"], ["value", "buffer"]], null, [[null, "change"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("change" === en)) {
        var pd_0 = (_co.nodeGeometryChangeHandler($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Buffer geometry "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](14, 0, null, null, 3, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](15, 0, null, null, 2, "label", [["for", "points"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Node Count "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](17, 0, null, null, 0, "input", [["id", "points"], ["name", "points"], ["type", "number"]], [[8, "value", 0]], [[null, "change"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("change" === en)) {
        var pd_0 = (_co.objectCountChangeHandler($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](18, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](19, null, ["Connections: ", ""])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](20, 0, null, null, 3, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](21, 0, null, null, 2, "label", [["for", "enable"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](22, 0, null, null, 0, "input", [["id", "enable"], ["name", "enable"], ["type", "checkbox"]], [[8, "checked", 0]], [[null, "change"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("change" === en)) {
        var pd_0 = (_co.connectionStateHandler($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" connections "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](24, 0, null, null, 19, "div", [["class", "text-metrices"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](25, 0, null, null, 2, "label", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](26, 0, null, null, 0, "input", [["name", "labelType"], ["type", "radio"], ["value", "html"]], null, [[null, "change"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("change" === en)) {
        var pd_0 = (_co.labelsStateHandler($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" All Html "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](28, 0, null, null, 0, "hr", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](29, 0, null, null, 2, "label", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](30, 0, null, null, 0, "input", [["name", "labelType"], ["type", "radio"], ["value", "sprite"]], null, [[null, "change"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("change" === en)) {
        var pd_0 = (_co.labelsStateHandler($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" All npm SpriteText "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](32, 0, null, null, 0, "hr", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](33, 0, null, null, 2, "label", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](34, 0, null, null, 0, "input", [["name", "labelType"], ["type", "radio"], ["value", "allMouseSpriteNative"]], null, [[null, "change"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("change" === en)) {
        var pd_0 = (_co.labelsStateHandler($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" All native Mouse Sprite "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](36, 0, null, null, 0, "hr", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](37, 0, null, null, 2, "label", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](38, 0, null, null, 0, "input", [["name", "labelType"], ["type", "radio"], ["value", "mouseSprite"]], null, [[null, "change"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("change" === en)) {
        var pd_0 = (_co.labelsStateHandler($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Event npm SpriteText "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](40, 0, null, null, 0, "hr", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](41, 0, null, null, 2, "label", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](42, 0, null, null, 0, "input", [["name", "labelType"], ["type", "radio"], ["value", "mouseSpriteNative"]], null, [[null, "change"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("change" === en)) {
        var pd_0 = (_co.labelsStateHandler($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Event native Mouse Sprite "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](44, 0, null, null, 2, "div", [["style", "position: relative; width: 1002px; height: 502px; margin: 0 auto"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](45, 0, [[1, 0], ["canvasEl", 1]], null, 0, "canvas", [["height", "500"], ["width", "1000"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.clickHandler($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](46, 0, null, null, 0, "div", [["id", "labels"]], null, null, null, null, null))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.renderCalls; _ck(_v, 5, 0, currVal_0); var currVal_1 = _co.objectCount; _ck(_v, 17, 0, currVal_1); var currVal_2 = _co.connectionCount; _ck(_v, 19, 0, currVal_2); var currVal_3 = _co.enableConnections; _ck(_v, 22, 0, currVal_3); }); }
function View_GroupLayoutComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-group-layout", [], null, null, null, View_GroupLayoutComponent_0, RenderType_GroupLayoutComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 4308992, null, 0, _group_layout_component__WEBPACK_IMPORTED_MODULE_2__["GroupLayoutComponent"], [_three_services_three_service__WEBPACK_IMPORTED_MODULE_3__["ThreeService"], _services_network_graph_request_service__WEBPACK_IMPORTED_MODULE_4__["NetworkGraphRequestService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var GroupLayoutComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-group-layout", _group_layout_component__WEBPACK_IMPORTED_MODULE_2__["GroupLayoutComponent"], View_GroupLayoutComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/network-graph/components/group-layout/group-layout.component.scss.shim.ngstyle.js":
/*!***************************************************************************************************!*\
  !*** ./src/app/network-graph/components/group-layout/group-layout.component.scss.shim.ngstyle.js ***!
  \***************************************************************************************************/
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
var styles = [".metrices[_ngcontent-%COMP%] {\n  position: fixed;\n  width: 90vw;\n  top: 0;\n  height: 50px;\n  left: 81px;\n  overflow: scroll;\n  border: solid 1px #333;\n  border-radius: 10px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  background-color: white;\n}\n.metrices[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  border-right: solid 5px #333;\n  padding: 0 5px;\n}\n#labels[_ngcontent-%COMP%] {\n  position: absolute;\n  \n  z-index: 0;\n  \n  left: 0;\n  \n  top: 0;\n  color: #ec0303;\n}\n#labels[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  position: absolute;\n  \n  left: 0;\n  \n  top: 0;\n  cursor: pointer;\n  \n  font-size: small;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  \n  pointer-events: none;\n  \n  text-shadow: -1px -1px 0 #000, 0 -1px 0 #000, 1px -1px 0 #000, 1px 0 0 #000, 1px 1px 0 #000, 0 1px 0 #000, -1px 1px 0 #000, -1px 0 0 #000;\n  width: 100px;\n}\n.text-metrices[_ngcontent-%COMP%] {\n  overflow: auto;\n  position: fixed;\n  right: 0;\n  width: 160px;\n  background-color: white;\n  top: 10px;\n  border: solid;\n  padding: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zdW1pdC5rdW1hci9Xb3Jrc3BhY2UvZ2l0aHViL3NvdXJjZWNvZGUvVGhyZWVKc1ByaW1lci9zcmMvYXBwL25ldHdvcmstZ3JhcGgvY29tcG9uZW50cy9ncm91cC1sYXlvdXQvZ3JvdXAtbGF5b3V0LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9uZXR3b3JrLWdyYXBoL2NvbXBvbmVudHMvZ3JvdXAtbGF5b3V0L2dyb3VwLWxheW91dC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGVBQUE7RUFDQSxXQUFBO0VBQ0EsTUFBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLHVCQUFBO0FDQ0Y7QURBRTtFQUNFLDRCQUFBO0VBQ0EsY0FBQTtBQ0VKO0FEQ0E7RUFDRSxrQkFBQTtFQUFvQixpREFBQTtFQUNwQixVQUFBO0VBQVkseUVBQUE7RUFDWixPQUFBO0VBQVMsb0RBQUE7RUFDVCxNQUFBO0VBQ0EsY0FBQTtBQ0tGO0FESEE7RUFDRSxrQkFBQTtFQUFvQiw4Q0FBQTtFQUNwQixPQUFBO0VBQVMsOERBQUE7RUFDVCxNQUFBO0VBQ0EsZUFBQTtFQUFpQiw2Q0FBQTtFQUNqQixnQkFBQTtFQUNBLHlCQUFBO0tBQUEsc0JBQUE7TUFBQSxxQkFBQTtVQUFBLGlCQUFBO0VBQW1CLG9DQUFBO0VBQ25CLG9CQUFBO0VBQXNCLHFDQUFBO0VBQ3RCLHlJQUFBO0VBR0EsWUFBQTtBQ1NGO0FETkE7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLFFBQUE7RUFDQSxZQUFBO0VBQ0EsdUJBQUE7RUFDQSxTQUFBO0VBQ0EsYUFBQTtFQUNBLGFBQUE7QUNTRiIsImZpbGUiOiJzcmMvYXBwL25ldHdvcmstZ3JhcGgvY29tcG9uZW50cy9ncm91cC1sYXlvdXQvZ3JvdXAtbGF5b3V0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1ldHJpY2VzIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB3aWR0aDogOTB2dztcbiAgdG9wOiAwO1xuICBoZWlnaHQ6IDUwcHg7XG4gIGxlZnQ6IDgxcHg7XG4gIG92ZXJmbG93OiBzY3JvbGw7XG4gIGJvcmRlcjogc29saWQgMXB4ICMzMzM7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBkaXYge1xuICAgIGJvcmRlci1yaWdodDogc29saWQgNXB4ICMzMzM7XG4gICAgcGFkZGluZzogMCA1cHg7XG4gIH1cbn1cbiNsYWJlbHMge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7IC8qIGxldCB1cyBwb3NpdGlvbiBvdXJzZWxmIGluc2lkZSB0aGUgY29udGFpbmVyICovXG4gIHotaW5kZXg6IDA7IC8qIG1ha2UgYSBuZXcgc3RhY2tpbmcgY29udGV4dCBzbyBjaGlsZHJlbiBkb24ndCBzb3J0IHdpdGggcmVzdCBvZiBwYWdlICovXG4gIGxlZnQ6IDA7IC8qIG1ha2Ugb3VyIHBvc2l0aW9uIHRoZSB0b3AgbGVmdCBvZiB0aGUgY29udGFpbmVyICovXG4gIHRvcDogMDtcbiAgY29sb3I6IHJnYigyMzYsIDMsIDMpO1xufVxuI2xhYmVscyA+IGRpdiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTsgLyogbGV0IHVzIHBvc2l0aW9uIHRoZW0gaW5zaWRlIHRoZSBjb250YWluZXIgKi9cbiAgbGVmdDogMDsgLyogbWFrZSB0aGVpciBkZWZhdWx0IHBvc2l0aW9uIHRoZSB0b3AgbGVmdCBvZiB0aGUgY29udGFpbmVyICovXG4gIHRvcDogMDtcbiAgY3Vyc29yOiBwb2ludGVyOyAvKiBjaGFuZ2UgdGhlIGN1cnNvciB0byBhIGhhbmQgd2hlbiBvdmVyIHVzICovXG4gIGZvbnQtc2l6ZTogc21hbGw7XG4gIHVzZXItc2VsZWN0OiBub25lOyAvKiBkb24ndCBsZXQgdGhlIHRleHQgZ2V0IHNlbGVjdGVkICovXG4gIHBvaW50ZXItZXZlbnRzOiBub25lOyAvKiBtYWtlIHVzIGludmlzaWJsZSB0byB0aGUgcG9pbnRlciAqL1xuICB0ZXh0LXNoYWRvdzogICAgICAgICAvKiBjcmVhdGUgYSBibGFjayBvdXRsaW5lICovIC0xcHggLTFweCAwICMwMDAsXG4gICAgMCAtMXB4IDAgIzAwMCwgMXB4IC0xcHggMCAjMDAwLCAxcHggMCAwICMwMDAsIDFweCAxcHggMCAjMDAwLCAwIDFweCAwICMwMDAsXG4gICAgLTFweCAxcHggMCAjMDAwLCAtMXB4IDAgMCAjMDAwO1xuICB3aWR0aDogMTAwcHg7XG59XG5cbi50ZXh0LW1ldHJpY2VzIHtcbiAgb3ZlcmZsb3c6IGF1dG87XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgcmlnaHQ6IDA7XG4gIHdpZHRoOiAxNjBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIHRvcDogMTBweDtcbiAgYm9yZGVyOiBzb2xpZDtcbiAgcGFkZGluZzogMTBweDtcbn1cbiIsIi5tZXRyaWNlcyB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgd2lkdGg6IDkwdnc7XG4gIHRvcDogMDtcbiAgaGVpZ2h0OiA1MHB4O1xuICBsZWZ0OiA4MXB4O1xuICBvdmVyZmxvdzogc2Nyb2xsO1xuICBib3JkZXI6IHNvbGlkIDFweCAjMzMzO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cbi5tZXRyaWNlcyBkaXYge1xuICBib3JkZXItcmlnaHQ6IHNvbGlkIDVweCAjMzMzO1xuICBwYWRkaW5nOiAwIDVweDtcbn1cblxuI2xhYmVscyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgLyogbGV0IHVzIHBvc2l0aW9uIG91cnNlbGYgaW5zaWRlIHRoZSBjb250YWluZXIgKi9cbiAgei1pbmRleDogMDtcbiAgLyogbWFrZSBhIG5ldyBzdGFja2luZyBjb250ZXh0IHNvIGNoaWxkcmVuIGRvbid0IHNvcnQgd2l0aCByZXN0IG9mIHBhZ2UgKi9cbiAgbGVmdDogMDtcbiAgLyogbWFrZSBvdXIgcG9zaXRpb24gdGhlIHRvcCBsZWZ0IG9mIHRoZSBjb250YWluZXIgKi9cbiAgdG9wOiAwO1xuICBjb2xvcjogI2VjMDMwMztcbn1cblxuI2xhYmVscyA+IGRpdiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgLyogbGV0IHVzIHBvc2l0aW9uIHRoZW0gaW5zaWRlIHRoZSBjb250YWluZXIgKi9cbiAgbGVmdDogMDtcbiAgLyogbWFrZSB0aGVpciBkZWZhdWx0IHBvc2l0aW9uIHRoZSB0b3AgbGVmdCBvZiB0aGUgY29udGFpbmVyICovXG4gIHRvcDogMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICAvKiBjaGFuZ2UgdGhlIGN1cnNvciB0byBhIGhhbmQgd2hlbiBvdmVyIHVzICovXG4gIGZvbnQtc2l6ZTogc21hbGw7XG4gIHVzZXItc2VsZWN0OiBub25lO1xuICAvKiBkb24ndCBsZXQgdGhlIHRleHQgZ2V0IHNlbGVjdGVkICovXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAvKiBtYWtlIHVzIGludmlzaWJsZSB0byB0aGUgcG9pbnRlciAqL1xuICB0ZXh0LXNoYWRvdzogLTFweCAtMXB4IDAgIzAwMCwgMCAtMXB4IDAgIzAwMCwgMXB4IC0xcHggMCAjMDAwLCAxcHggMCAwICMwMDAsIDFweCAxcHggMCAjMDAwLCAwIDFweCAwICMwMDAsIC0xcHggMXB4IDAgIzAwMCwgLTFweCAwIDAgIzAwMDtcbiAgd2lkdGg6IDEwMHB4O1xufVxuXG4udGV4dC1tZXRyaWNlcyB7XG4gIG92ZXJmbG93OiBhdXRvO1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHJpZ2h0OiAwO1xuICB3aWR0aDogMTYwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICB0b3A6IDEwcHg7XG4gIGJvcmRlcjogc29saWQ7XG4gIHBhZGRpbmc6IDEwcHg7XG59Il19 */"];



/***/ }),

/***/ "./src/app/network-graph/components/group-layout/group-layout.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/network-graph/components/group-layout/group-layout.component.ts ***!
  \*********************************************************************************/
/*! exports provided: GroupLayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupLayoutComponent", function() { return GroupLayoutComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_spritetext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three-spritetext */ "./node_modules/three-spritetext/dist/three-spritetext.module.js");
/* harmony import */ var three_examples_jsm_lines_LineSegments2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three/examples/jsm/lines/LineSegments2 */ "./node_modules/three/examples/jsm/lines/LineSegments2.js");
/* harmony import */ var three_examples_jsm_lines_LineSegmentsGeometry__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! three/examples/jsm/lines/LineSegmentsGeometry */ "./node_modules/three/examples/jsm/lines/LineSegmentsGeometry.js");
/* harmony import */ var _node_modules_stats_js_build_stats_min_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../node_modules/stats.js/build/stats.min.js */ "./node_modules/stats.js/build/stats.min.js");
/* harmony import */ var _node_modules_stats_js_build_stats_min_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_node_modules_stats_js_build_stats_min_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _node_modules_three_examples_jsm_lines_LineMaterial_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../../../../node_modules/three/examples/jsm/lines/LineMaterial.js */ "./node_modules/three/examples/jsm/lines/LineMaterial.js");

/**
 * TODO: check if other possibilities are there for loaded mesh. current 'Group'.
 * TODO: Groups Texture.
 */








var GroupLayoutComponent = /** @class */ (function () {
    function GroupLayoutComponent(threeService, graphRequestService) {
        this.threeService = threeService;
        this.graphRequestService = graphRequestService;
        this.objectCount = 3;
        this.previousObjectCount = 0;
        this.nodePositionCollection = [];
        this.connectionStep = 1;
        this.connectionCount = "not specified";
        this.enableConnections = false;
        this.noConnectionMesh = false;
        this.raycaster = new three__WEBPACK_IMPORTED_MODULE_3__["Raycaster"]();
        this.traffic = {};
        this.trafficColor = 0x378ef0;
        this.labelsElements = {};
    }
    GroupLayoutComponent.prototype.ngOnInit = function () {
        this.initRequests();
    };
    GroupLayoutComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.threeCommon = this.threeService.getThreeCommon(this.canvasEl.nativeElement, true);
        this.setUpStats();
        this.threeCommon.camera.position.z = 10;
        // this.threeCommon.camera.aspect =
        //   this.canvasEl.nativeElement.offsetWidth /
        //   this.canvasEl.nativeElement.offsetHeight;
        // this.threeCommon.renderer.setPixelRatio(2);
        this.threeCommon.scene.background = new three__WEBPACK_IMPORTED_MODULE_3__["Color"](0x000000);
        this.threeCommon.camera.updateProjectionMatrix();
        this.threeCommon.controls.addEventListener("change", function () {
            // this.configureRaycast();
            // this.configureLabels();
            _this.requestRenderIfNotRequested();
        });
        window.addEventListener("resize", this.requestRenderIfNotRequested.bind(this));
    };
    GroupLayoutComponent.prototype.initRequests = function () {
        var _this = this;
        Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["forkJoin"])(this.graphRequestService.getGroups(), this.graphRequestService.getNodeMesh()).subscribe(function (_a) {
            var _b = tslib__WEBPACK_IMPORTED_MODULE_0__["__read"](_a, 2), groupData = _b[0], mesh = _b[1];
            _this.nodeMeshResponseHandler(mesh);
            _this.groupsResponseHandler(groupData);
        });
    };
    GroupLayoutComponent.prototype.nodeMeshResponseHandler = function (mesh) {
        this.nodeMeshBuffer = {
            geometry: new three__WEBPACK_IMPORTED_MODULE_3__["SphereBufferGeometry"](1, 10, 10),
            material: new three__WEBPACK_IMPORTED_MODULE_3__["MeshPhongMaterial"]({ color: 0xefefef }),
        };
        if (mesh.type && mesh.type === "Group") {
            this.nodeMesh = mesh.children[0];
        }
        else {
            this.nodeMesh = mesh;
        }
    };
    GroupLayoutComponent.prototype.groupsResponseHandler = function (groupData) {
        this.sceneController();
    };
    GroupLayoutComponent.prototype.constructNodes = function (forceNewMesh) {
        var newMesh = forceNewMesh || !this.instancedNodeMesh;
        if (newMesh) {
            if (this.instancedNodeMesh) {
                this.instancedNodeMesh.geometry.dispose();
                this.instancedNodeMesh.material.dispose();
                this.threeCommon.scene.remove(this.instancedNodeMesh);
            }
            var attrObj = this.loadObjModel ? this.nodeMesh : this.nodeMeshBuffer;
            this.instancedNodeMesh = new three__WEBPACK_IMPORTED_MODULE_3__["InstancedMesh"](attrObj.geometry, attrObj.material, 10000);
            this.instancedNodeMesh.userData = { __graphObj: "nodeMesh" };
        }
        else {
            this.instancedNodeMesh.instanceMatrix.needsUpdate = true;
        }
        for (var i = 0; i < this.objectCount; i++) {
            this.instancedNodeMesh.setMatrixAt(i, this.setPositionFromLayout(i));
        }
        if (this.previousObjectCount > this.objectCount) {
            for (var i = this.objectCount; i < this.previousObjectCount; i++) {
                //using indexes as id.
                var mat = new three__WEBPACK_IMPORTED_MODULE_3__["Matrix4"]();
                this.instancedNodeMesh.setMatrixAt(i, mat);
            }
        }
        this.threeCommon.scene.add(this.instancedNodeMesh);
    };
    GroupLayoutComponent.prototype.setPositionFromTraffic = function (trafficLink) {
        var source = trafficLink.source.position;
        var target = trafficLink.target.position;
        var axis = new three__WEBPACK_IMPORTED_MODULE_3__["Vector3"](0, 1, 0);
        var matrix = new three__WEBPACK_IMPORTED_MODULE_3__["Matrix4"]();
        var quaternion = new three__WEBPACK_IMPORTED_MODULE_3__["Quaternion"]();
        var position = new three__WEBPACK_IMPORTED_MODULE_3__["Vector3"]((source.x + target.x) / 2, (source.y + target.y) / 2, (source.z + target.z) / 2);
        var scale = new three__WEBPACK_IMPORTED_MODULE_3__["Vector3"](1, 1, 1);
        quaternion.setFromUnitVectors(axis, target.clone().sub(source.clone()).normalize());
        matrix.compose(position, quaternion, scale);
        return matrix;
    };
    GroupLayoutComponent.prototype.setPositionFromLayout = function (i) {
        var matrix = new three__WEBPACK_IMPORTED_MODULE_3__["Matrix4"]();
        var rotation = new three__WEBPACK_IMPORTED_MODULE_3__["Euler"]();
        var quaternion = new three__WEBPACK_IMPORTED_MODULE_3__["Quaternion"]();
        var position = new three__WEBPACK_IMPORTED_MODULE_3__["Vector3"]();
        var offset = i * 5;
        position.x = (offset * Math.sin(i)) / Math.sqrt(i + 1);
        position.y = (offset * Math.cos(i)) / Math.sqrt(i + 1);
        position.z = i / 10;
        this.nodePositionCollection.push({ position: position, nodeIndex: i });
        var scale = new three__WEBPACK_IMPORTED_MODULE_3__["Vector3"]();
        quaternion.setFromEuler(rotation);
        scale.x = scale.y = scale.z = 1;
        matrix.compose(position, quaternion, scale);
        return matrix;
    };
    GroupLayoutComponent.prototype.sceneController = function (newMesh) {
        this.constructNodes(!!newMesh);
        if (this.enableConnections) {
            this.configureLineSegmentConnections();
            this.configureDirectionalArrows();
        }
        this.configureRaycast();
        this.configureLabels();
        this.requestRenderIfNotRequested();
    };
    GroupLayoutComponent.prototype.configureDirectionalArrows = function () {
        var _this = this;
        var newMesh = !this.directionInstanceMesh;
        if (newMesh) {
            var geometry = new three__WEBPACK_IMPORTED_MODULE_3__["ConeBufferGeometry"](0.3, 0.8);
            var material = new three__WEBPACK_IMPORTED_MODULE_3__["MeshBasicMaterial"]({
                color: this.trafficColor,
            });
            this.directionInstanceMesh = new three__WEBPACK_IMPORTED_MODULE_3__["InstancedMesh"](geometry, material, 10000);
        }
        else {
            this.directionInstanceMesh.instanceMatrix.needsUpdate = true;
        }
        console.log(this.directionInstanceMesh.countx);
        for (var index = 0; index < this.directionInstanceMesh.count; index++) {
            this.directionInstanceMesh.setMatrixAt(index, new three__WEBPACK_IMPORTED_MODULE_3__["Matrix4"]());
        }
        Object.keys(this.traffic).forEach(function (key, index) {
            _this.directionInstanceMesh.setMatrixAt(index, _this.setPositionFromTraffic(_this.traffic[key]));
        });
        this.threeCommon.scene.add(this.directionInstanceMesh);
        //     const geometry = new THREE.ConeGeometry(0.2, 0.6);
        //  const material = new THREE.MeshPhongMaterial({
        //   color: 0x2984cf,
        //  emissive: 0x2984cf
        //  });
        //  const cone = new THREE.Mesh(geometry, material);
        //  cone.position.y = target.distanceTo(source) / 2;
        //  cone.scale.set(0.5, 0.5, 0.5);
        //  target.sub(source).normalize();
        //  this.arrowHelper = new THREE.ArrowHelper(target, source, 0);
        //  this.arrowHelper.cone.copy(cone);
        //  this.threeCommon.scene.add(this.arrowHelper);
    };
    GroupLayoutComponent.prototype.configureLineSegmentConnections = function () {
        this.connectionCount = 0;
        this.traffic = {};
        var lineGeometry = new three_examples_jsm_lines_LineSegmentsGeometry__WEBPACK_IMPORTED_MODULE_6__["LineSegmentsGeometry"]();
        var positions = [];
        var colors = [];
        var matLine = new _node_modules_three_examples_jsm_lines_LineMaterial_js__WEBPACK_IMPORTED_MODULE_8__["LineMaterial"]({
            color: this.trafficColor,
            vertexColors: true,
            dashed: false,
            linewidth: 3,
        });
        matLine.resolution.set(this.canvasEl.nativeElement.offsetWidth, this.canvasEl.nativeElement.offsetHeight);
        var colorRGB = new three__WEBPACK_IMPORTED_MODULE_3__["Color"](this.trafficColor).convertLinearToSRGB();
        for (var index = 0; index < this.nodePositionCollection.length - 1; index++) {
            var source = this.nodePositionCollection[index];
            var target = this.nodePositionCollection[index + 1];
            this.traffic[index] = { source: source, target: target };
            positions.push(source.position.x, source.position.y, source.position.z, target.position.x, target.position.y, target.position.z);
            colors.push(colorRGB.r, colorRGB.g, colorRGB.b, colorRGB.r, colorRGB.g, colorRGB.b);
            this.connectionCount++;
        }
        lineGeometry.setPositions(new Float32Array(positions));
        lineGeometry.setColors(colors);
        this.line = new three_examples_jsm_lines_LineSegments2__WEBPACK_IMPORTED_MODULE_5__["LineSegments2"](lineGeometry, matLine);
        this.line.userData = { __graphObj: "connection" };
        this.threeCommon.scene.add(this.line);
    };
    GroupLayoutComponent.prototype.lineClickHandler = function (raycastObj) {
        var _connection = this.traffic[raycastObj.faceIndex];
        console.log("faceIndex", raycastObj.faceIndex, _connection);
    };
    GroupLayoutComponent.prototype.setUpStats = function () {
        this.stats = new _node_modules_stats_js_build_stats_min_js__WEBPACK_IMPORTED_MODULE_7__();
        this.stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
        this.statsEl.nativeElement.appendChild(this.stats.dom);
        this.updateStats();
    };
    GroupLayoutComponent.prototype.updateStats = function () {
        this.stats.update();
        window.requestAnimationFrame(this.updateStats.bind(this));
    };
    // event handlers
    /**
     *
     * @param event
     * this.mouse.x =
        ((event.clientX - canvasBounds.left) /
          (canvasBounds.right - canvasBounds.left))
          
        (x + 1)/2 *
     */
    GroupLayoutComponent.prototype.clickHandler = function (event) {
        event.preventDefault();
        var canvasBounds = this.threeCommon.renderer.context.canvas.getBoundingClientRect();
        this.mouse = this.mouse || new three__WEBPACK_IMPORTED_MODULE_3__["Vector3"]();
        this.mouse.x =
            ((event.clientX - canvasBounds.left) /
                (canvasBounds.right - canvasBounds.left)) *
                2 -
                1;
        this.mouse.y =
            -((event.clientY - canvasBounds.top) /
                (canvasBounds.bottom - canvasBounds.top)) *
                2 +
                1;
        this.configureRaycast();
        this.configureLabels();
    };
    GroupLayoutComponent.prototype.objectCountChangeHandler = function ($event) {
        this.threeService.cleanScene(this.threeCommon);
        this.nodePositionCollection = [];
        this.previousObjectCount = this.objectCount;
        this.objectCount = Number.parseInt($event.target.value, 10);
        this.connectionStep = this.objectCount;
        this.sceneController();
    };
    GroupLayoutComponent.prototype.connectionStepHandler = function ($event) {
        this.threeService.cleanScene(this.threeCommon);
        this.nodePositionCollection = [];
        this.connectionStep = Number.parseInt($event.target.value, 10);
        this.sceneController();
    };
    GroupLayoutComponent.prototype.connectionStateHandler = function ($event) {
        this.threeService.cleanScene(this.threeCommon);
        this.nodePositionCollection = [];
        this.enableConnections = $event.target.checked;
        this.sceneController();
    };
    GroupLayoutComponent.prototype.meshTypeStateHandler = function ($event) {
        this.threeService.cleanScene(this.threeCommon);
        this.nodePositionCollection = [];
        this.noConnectionMesh = $event.target.checked;
        this.sceneController();
    };
    GroupLayoutComponent.prototype.nodeGeometryChangeHandler = function ($event) {
        this.threeService.cleanScene(this.threeCommon);
        this.loadObjModel = $event.target.value === "obj";
        this.sceneController(true);
    };
    GroupLayoutComponent.prototype.labelsStateHandler = function ($event) {
        this.threeService.cleanScene(this.threeCommon);
        this.labelSpriteText = $event.target.value;
        this.sceneController();
    };
    GroupLayoutComponent.prototype.renderView = function () {
        this.renderRequested = false;
        if (this.resizeRendererToDisplaySize(this.threeCommon.renderer)) {
            var canvas = this.threeCommon.renderer.domElement;
            this.threeCommon.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            this.threeCommon.camera.updateProjectionMatrix();
        }
        this.threeCommon.renderer.render(this.threeCommon.scene, this.threeCommon.camera);
        this.renderCalls = this.threeService.getRendererCallCount(this.threeCommon.renderer);
    };
    GroupLayoutComponent.prototype.configureLabels = function () {
        if (this.labelSpriteText === "html") {
            this.htmlOverlayAllLabels();
        }
        else if (this.labelSpriteText === "sprite") {
            this.npmSpriteAllLabels();
        }
        else if (this.labelSpriteText === "allMouseSpriteNative") {
            this.nativeSpriteAllLabels();
        }
    };
    GroupLayoutComponent.prototype.configureEventBasedLabels = function (intersects) {
        if (this.labelSpriteText === "mouseSprite") {
            this.npmSpriteOnEvent(intersects);
        }
        else if (this.labelSpriteText === "mouseSpriteNative") {
            this.nativeSpriteOnEvent(intersects);
        }
    };
    GroupLayoutComponent.prototype.resizeRendererToDisplaySize = function (renderer) {
        var canvas = renderer.domElement;
        var width = canvas.clientWidth;
        var height = canvas.clientHeight;
        var needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    };
    GroupLayoutComponent.prototype.requestRenderIfNotRequested = function () {
        if (!this.renderRequested) {
            this.renderRequested = true;
            window.requestAnimationFrame(this.renderView.bind(this));
        }
    };
    GroupLayoutComponent.prototype.configureRaycast = function () {
        // if (this.mouse) {
        //   this.raycaster.setFromCamera(this.mouse, this.threeCommon.camera);
        //   // const intersects = this.raycaster.intersectObjects(
        //   //   this.threeCommon.scene.children
        //   // );
        //   // console.log(intersects);
        //   const lineRaycast = this.raycaster.intersectObjects([this.line]);
        //   if (
        //     lineRaycast &&
        //     lineRaycast[0] &&
        //     lineRaycast[0].object &&
        //     lineRaycast[0].object.userData &&
        //     lineRaycast[0].object.userData.__graphObj === "connection"
        //   ) {
        //     this.lineClickHandler(lineRaycast[0]);
        //   }
        // }
        if (this.mouse) {
            this.raycaster.setFromCamera(this.mouse, this.threeCommon.camera);
            // label
            var intersects = this.raycaster.intersectObjects(this.threeCommon.scene.children);
            if (intersects &&
                intersects[0] &&
                intersects[0].object &&
                intersects[0].object.userData.__graphObj === "nodeMesh") {
                this.configureEventBasedLabels(intersects);
            }
        }
    };
    /**
     * NPM sprite text. On mouse click
     */
    GroupLayoutComponent.prototype.npmSpriteOnEvent = function (intersects) {
        var sprite = new three_spritetext__WEBPACK_IMPORTED_MODULE_4__["default"]("node label" + intersects[0].instanceId);
        sprite.color = "#ffffff";
        sprite.textHeight = 0.7;
        sprite.visible = true;
        var position = this.getLabelPosition(intersects, null);
        sprite.position.set(position.x, position.y - 2, position.z);
        this.threeCommon.scene.add(sprite);
    };
    /**
     * NPM sprite text. all labels
     */
    GroupLayoutComponent.prototype.npmSpriteAllLabels = function () {
        for (var index = 0; index < this.objectCount; index++) {
            var matrix = new three__WEBPACK_IMPORTED_MODULE_3__["Matrix4"]();
            this.instancedNodeMesh.getMatrixAt(index, matrix);
            var position = new three__WEBPACK_IMPORTED_MODULE_3__["Vector3"]();
            position.setFromMatrixPosition(matrix);
            // console.log(cameraPosition.distanceTo(position), `node index ${index}`);
            var sprite = new three_spritetext__WEBPACK_IMPORTED_MODULE_4__["default"]("node index " + index);
            sprite.color = "#b3b3b3";
            sprite.textHeight = 0.25;
            sprite.visible = true;
            sprite.position.setX(position.x);
            sprite.position.setY(position.y + 1.2);
            this.threeCommon.scene.add(sprite);
        }
    };
    /**
     * Native canvas sprite text. On mouse click
     */
    GroupLayoutComponent.prototype.nativeSpriteOnEvent = function (intersects) {
        var sprite = this.createNativeSpriteLabel("node label" + intersects[0].instanceId);
        var position = this.getLabelPosition(intersects, null);
        sprite.position.set(position.x, position.y - 2, position.z);
        this.threeCommon.scene.add(sprite);
    };
    /**
     * Native canvas sprite text. all labels
     */
    GroupLayoutComponent.prototype.nativeSpriteAllLabels = function () {
        for (var index = 0; index < this.objectCount; index++) {
            var position = this.getLabelPosition(null, index);
            var sprite = this.createNativeSpriteLabel("node index " + index);
            sprite.position.setX(position.x);
            sprite.position.setY(position.y - 2);
            this.threeCommon.scene.add(sprite);
        }
    };
    /**
     * HTML overlay. all labels
     */
    GroupLayoutComponent.prototype.htmlOverlayAllLabels = function () {
        var labelParentElem = document.querySelector("#labels");
        labelParentElem.innerHTML = "";
        var docFrag = document.createDocumentFragment();
        var canvasBounds = this.threeCommon.renderer.context.canvas.getBoundingClientRect();
        var frustum = new three__WEBPACK_IMPORTED_MODULE_3__["Frustum"]();
        for (var index = 0; index < this.objectCount; index++) {
            var elem = document.createElement("div");
            elem.className = "label-div";
            elem.textContent = "node name " + index;
            elem.setAttribute("data-matrix-id", index + "");
            var matrix = new three__WEBPACK_IMPORTED_MODULE_3__["Matrix4"]();
            this.instancedNodeMesh.getMatrixAt(index, matrix);
            var position = new three__WEBPACK_IMPORTED_MODULE_3__["Vector3"]();
            position.setFromMatrixPosition(matrix);
            this.threeCommon.camera.updateMatrix();
            this.threeCommon.camera.updateMatrixWorld();
            frustum.setFromProjectionMatrix(new three__WEBPACK_IMPORTED_MODULE_3__["Matrix4"]().multiplyMatrices(this.threeCommon.camera.projectionMatrix, this.threeCommon.camera.matrixWorldInverse));
            // if (
            //   frustum.containsPoint(position) &&
            //   this.threeCommon.camera.position.distanceTo(position) < 25
            // ) {
            position.setY(position.y - 1);
            position.project(this.threeCommon.camera);
            // convert to unit  vector.
            position.normalize();
            if (Number.isNaN(position.x)) {
                position.x = 0;
            }
            if (Number.isNaN(position.y)) {
                position.y = 0;
            }
            var x = ((position.x + 1) * canvasBounds.width) / 2;
            var y = ((1 - position.y) * canvasBounds.height) / 2;
            elem.style.left = 0 + "px";
            elem.style.top = 0 + "px";
            elem.style.position = "absolute";
            elem.style.zIndex = (((-position.z * 0.5 + 0.5) * 100000) | 0) + "";
            elem.style.minWidth = "100px";
            elem.style.transform = "translate(" + x + "px," + y + "px)";
            docFrag.appendChild(elem);
        }
        labelParentElem.append(docFrag);
    };
    GroupLayoutComponent.prototype.createNativeSpriteLabel = function (text) {
        var font = "Arial";
        var size = 130;
        var color = "#ffffff";
        var font = "bold " + size + "px " + font;
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        context.font = font;
        var metrics = context.measureText(text), textWidth = metrics.width;
        canvas.width = textWidth + 3;
        canvas.height = size + 3;
        context.font = font;
        context.fillStyle = color;
        context.fillText(text, 0, size + 3);
        var texture = new three__WEBPACK_IMPORTED_MODULE_3__["Texture"](canvas);
        texture.needsUpdate = true;
        var spriteMaterial = new three__WEBPACK_IMPORTED_MODULE_3__["SpriteMaterial"]({ map: texture });
        var sprite1 = new three__WEBPACK_IMPORTED_MODULE_3__["Sprite"](spriteMaterial);
        sprite1.scale.set(4, 1, 1.0);
        return sprite1;
    };
    GroupLayoutComponent.prototype.getLabelPosition = function (intersects, index) {
        var _index = intersects[0].instanceId || index;
        var matrix = new three__WEBPACK_IMPORTED_MODULE_3__["Matrix4"]();
        this.instancedNodeMesh.getMatrixAt(_index, matrix);
        var position = new three__WEBPACK_IMPORTED_MODULE_3__["Vector3"]();
        position.setFromMatrixPosition(matrix);
        return position;
    };
    return GroupLayoutComponent;
}());



/***/ }),

/***/ "./src/app/network-graph/network-graph-routing.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/network-graph/network-graph-routing.module.ts ***!
  \***************************************************************/
/*! exports provided: NetworkGraphRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetworkGraphRoutingModule", function() { return NetworkGraphRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _common_enums_network_graph_routes_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/enums/network-graph-routes.enum */ "./src/app/common/enums/network-graph-routes.enum.ts");
/* harmony import */ var _components_group_layout_group_layout_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/group-layout/group-layout.component */ "./src/app/network-graph/components/group-layout/group-layout.component.ts");



var routes = [
    {
        path: "" + _common_enums_network_graph_routes_enum__WEBPACK_IMPORTED_MODULE_1__["NetworkGraphRoutes"].groupLayout,
        component: _components_group_layout_group_layout_component__WEBPACK_IMPORTED_MODULE_2__["GroupLayoutComponent"],
    },
    {
        path: "",
        component: _components_group_layout_group_layout_component__WEBPACK_IMPORTED_MODULE_2__["GroupLayoutComponent"],
    },
];
var NetworkGraphRoutingModule = /** @class */ (function () {
    function NetworkGraphRoutingModule() {
    }
    return NetworkGraphRoutingModule;
}());



/***/ }),

/***/ "./src/app/network-graph/network-graph.module.ngfactory.js":
/*!*****************************************************************!*\
  !*** ./src/app/network-graph/network-graph.module.ngfactory.js ***!
  \*****************************************************************/
/*! exports provided: NetworkGraphModuleNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetworkGraphModuleNgFactory", function() { return NetworkGraphModuleNgFactory; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _network_graph_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./network-graph.module */ "./src/app/network-graph/network-graph.module.ts");
/* harmony import */ var _node_modules_angular_router_router_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/@angular/router/router.ngfactory */ "./node_modules/@angular/router/router.ngfactory.js");
/* harmony import */ var _components_group_layout_group_layout_component_ngfactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/group-layout/group-layout.component.ngfactory */ "./src/app/network-graph/components/group-layout/group-layout.component.ngfactory.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _network_graph_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./network-graph-routing.module */ "./src/app/network-graph/network-graph-routing.module.ts");
/* harmony import */ var _components_group_layout_group_layout_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/group-layout/group-layout.component */ "./src/app/network-graph/components/group-layout/group-layout.component.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 








var NetworkGraphModuleNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcmf"](_network_graph_module__WEBPACK_IMPORTED_MODULE_1__["NetworkGraphModule"], [], function (_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmod"]([_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵCodegenComponentFactoryResolver"], [[8, [_node_modules_angular_router_router_ngfactory__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_router_router_lNgFactory"], _components_group_layout_group_layout_component_ngfactory__WEBPACK_IMPORTED_MODULE_3__["GroupLayoutComponentNgFactory"]]], [3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgLocalization"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgLocaleLocalization"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_4__["ɵangular_packages_common_common_a"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"], [[2, _angular_router__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_router_router_a"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _network_graph_routing_module__WEBPACK_IMPORTED_MODULE_6__["NetworkGraphRoutingModule"], _network_graph_routing_module__WEBPACK_IMPORTED_MODULE_6__["NetworkGraphRoutingModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _network_graph_module__WEBPACK_IMPORTED_MODULE_1__["NetworkGraphModule"], _network_graph_module__WEBPACK_IMPORTED_MODULE_1__["NetworkGraphModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_router__WEBPACK_IMPORTED_MODULE_5__["ROUTES"], function () { return [[{ path: "group-layout", component: _components_group_layout_group_layout_component__WEBPACK_IMPORTED_MODULE_7__["GroupLayoutComponent"] }, { path: "", component: _components_group_layout_group_layout_component__WEBPACK_IMPORTED_MODULE_7__["GroupLayoutComponent"] }]]; }, [])]); });



/***/ }),

/***/ "./src/app/network-graph/network-graph.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/network-graph/network-graph.module.ts ***!
  \*******************************************************/
/*! exports provided: NetworkGraphModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetworkGraphModule", function() { return NetworkGraphModule; });
var NetworkGraphModule = /** @class */ (function () {
    function NetworkGraphModule() {
    }
    return NetworkGraphModule;
}());



/***/ }),

/***/ "./src/app/network-graph/services/network-graph-request.service.ts":
/*!*************************************************************************!*\
  !*** ./src/app/network-graph/services/network-graph-request.service.ts ***!
  \*************************************************************************/
/*! exports provided: NetworkGraphRequestService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetworkGraphRequestService", function() { return NetworkGraphRequestService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _node_modules_three_examples_jsm_loaders_OBJLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../../node_modules/three/examples/jsm/loaders/OBJLoader */ "./node_modules/three/examples/jsm/loaders/OBJLoader.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");




var NetworkGraphRequestService = /** @class */ (function () {
    function NetworkGraphRequestService(httpClient) {
        this.httpClient = httpClient;
        this.GEOMETRY_URL = "assets/network-graph/geometry/node.obj";
        this.MOCK_GROUPS_URL = "assets/network-graph/server/groups.json";
        this.MOCK_CONNECTIONS_URL = "assets/network-graph/server/connections.json";
    }
    NetworkGraphRequestService.prototype.getNodeMesh = function () {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["from"])(new _node_modules_three_examples_jsm_loaders_OBJLoader__WEBPACK_IMPORTED_MODULE_1__["OBJLoader"]().loadAsync(this.GEOMETRY_URL));
    };
    NetworkGraphRequestService.prototype.getGroups = function () {
        return this.httpClient.get(this.MOCK_GROUPS_URL);
    };
    NetworkGraphRequestService.prototype.getTrafficConnections = function () {
        return this.httpClient.get(this.MOCK_CONNECTIONS_URL);
    };
    NetworkGraphRequestService.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ factory: function NetworkGraphRequestService_Factory() { return new NetworkGraphRequestService(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"])); }, token: NetworkGraphRequestService, providedIn: "root" });
    return NetworkGraphRequestService;
}());



/***/ })

}]);
//# sourceMappingURL=network-graph-network-graph-module-ngfactory-es5.js.map