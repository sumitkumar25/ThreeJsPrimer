(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pixi-pixi-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pixi/components/visualization-pixi/visualization-pixi.component.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pixi/components/visualization-pixi/visualization-pixi.component.html ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>visualization-pixi works!</p>\n"

/***/ }),

/***/ "./src/app/pixi/components/visualization-pixi/visualization-pixi.component.scss":
/*!**************************************************************************************!*\
  !*** ./src/app/pixi/components/visualization-pixi/visualization-pixi.component.scss ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BpeGkvY29tcG9uZW50cy92aXN1YWxpemF0aW9uLXBpeGkvdmlzdWFsaXphdGlvbi1waXhpLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/pixi/components/visualization-pixi/visualization-pixi.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/pixi/components/visualization-pixi/visualization-pixi.component.ts ***!
  \************************************************************************************/
/*! exports provided: VisualizationPixiComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisualizationPixiComponent", function() { return VisualizationPixiComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let VisualizationPixiComponent = class VisualizationPixiComponent {
    constructor() { }
    ngOnInit() {
    }
};
VisualizationPixiComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-visualization-pixi',
        template: __webpack_require__(/*! raw-loader!./visualization-pixi.component.html */ "./node_modules/raw-loader/index.js!./src/app/pixi/components/visualization-pixi/visualization-pixi.component.html"),
        styles: [__webpack_require__(/*! ./visualization-pixi.component.scss */ "./src/app/pixi/components/visualization-pixi/visualization-pixi.component.scss")]
    })
], VisualizationPixiComponent);



/***/ }),

/***/ "./src/app/pixi/pixi-routing/pixi-routing.module.ts":
/*!**********************************************************!*\
  !*** ./src/app/pixi/pixi-routing/pixi-routing.module.ts ***!
  \**********************************************************/
/*! exports provided: PixiRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PixiRoutingModule", function() { return PixiRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _components_visualization_pixi_visualization_pixi_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/visualization-pixi/visualization-pixi.component */ "./src/app/pixi/components/visualization-pixi/visualization-pixi.component.ts");




const routes = [
    {
        path: '',
        component: _components_visualization_pixi_visualization_pixi_component__WEBPACK_IMPORTED_MODULE_3__["VisualizationPixiComponent"]
    }
];
let PixiRoutingModule = class PixiRoutingModule {
};
PixiRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], PixiRoutingModule);



/***/ }),

/***/ "./src/app/pixi/pixi.module.ts":
/*!*************************************!*\
  !*** ./src/app/pixi/pixi.module.ts ***!
  \*************************************/
/*! exports provided: PixiModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PixiModule", function() { return PixiModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _components_visualization_pixi_visualization_pixi_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/visualization-pixi/visualization-pixi.component */ "./src/app/pixi/components/visualization-pixi/visualization-pixi.component.ts");
/* harmony import */ var _pixi_routing_pixi_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pixi-routing/pixi-routing.module */ "./src/app/pixi/pixi-routing/pixi-routing.module.ts");





let PixiModule = class PixiModule {
};
PixiModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_components_visualization_pixi_visualization_pixi_component__WEBPACK_IMPORTED_MODULE_3__["VisualizationPixiComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _pixi_routing_pixi_routing_module__WEBPACK_IMPORTED_MODULE_4__["PixiRoutingModule"]
        ]
    })
], PixiModule);



/***/ })

}]);
//# sourceMappingURL=pixi-pixi-module-es2015.js.map