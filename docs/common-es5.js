(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./src/app/common/colors.enum.ts":
/*!***************************************!*\
  !*** ./src/app/common/colors.enum.ts ***!
  \***************************************/
/*! exports provided: Colors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Colors", function() { return Colors; });
var Colors;
(function (Colors) {
    Colors["red"] = "#F97664";
    Colors["green"] = "#C8FF67";
    Colors["canvasBackground"] = "#ECFCF9";
    Colors["yellow"] = "#F9E764";
})(Colors || (Colors = {}));


/***/ }),

/***/ "./src/app/three/services/three.service.ts":
/*!*************************************************!*\
  !*** ./src/app/three/services/three.service.ts ***!
  \*************************************************/
/*! exports provided: ThreeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThreeService", function() { return ThreeService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var src_app_common_colors_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/common/colors.enum */ "./src/app/common/colors.enum.ts");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");





var ThreeService = /** @class */ (function () {
    function ThreeService() {
    }
    ThreeService.prototype.getThreeCommon = function (canvasEl) {
        var common = {
            scene: new three__WEBPACK_IMPORTED_MODULE_2__["Scene"](),
            renderer: new three__WEBPACK_IMPORTED_MODULE_2__["WebGLRenderer"]({ canvas: canvasEl, antialias: true }),
            camera: new three__WEBPACK_IMPORTED_MODULE_2__["PerspectiveCamera"](75, 2),
            controls: {}
        };
        common.renderer.setSize(canvasEl.offsetWidth, canvasEl.offsetHeight);
        common.scene.add(new three__WEBPACK_IMPORTED_MODULE_2__["AmbientLight"](0xffffff, 1));
        common.controls = this.configureViewSettings(common.scene, common.camera, common.renderer);
        return common;
    };
    ThreeService.prototype.getThreeCommonWindow = function () {
        var common = {
            scene: new three__WEBPACK_IMPORTED_MODULE_2__["Scene"](),
            renderer: new three__WEBPACK_IMPORTED_MODULE_2__["WebGLRenderer"](),
            camera: new three__WEBPACK_IMPORTED_MODULE_2__["PerspectiveCamera"](),
        };
        common.scene.background = new three__WEBPACK_IMPORTED_MODULE_2__["Color"](src_app_common_colors_enum__WEBPACK_IMPORTED_MODULE_3__["Colors"].canvasBackground);
        common.renderer.setSize(window.innerWidth, window.innerHeight);
        common.camera.position.z = 100;
        return common;
    };
    ThreeService.prototype.configureViewSettings = function (scene, camera, renderer) {
        scene.background = new three__WEBPACK_IMPORTED_MODULE_2__["Color"]('black');
        var light = new three__WEBPACK_IMPORTED_MODULE_2__["AmbientLight"](0x404040); // soft white light
        scene.add(light);
        var controls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_4__["OrbitControls"](camera, renderer.domElement);
        camera.position.set(0, 0, 100);
        controls.update();
        return controls;
    };
    ThreeService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
    ], ThreeService);
    return ThreeService;
}());



/***/ })

}]);
//# sourceMappingURL=common-es5.js.map