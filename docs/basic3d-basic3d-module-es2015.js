(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["basic3d-basic3d-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/basic3d/components/geometry/geometry.component.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/basic3d/components/geometry/geometry.component.html ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<canvas height=\"400\" width=\"800\" #canvasEl></canvas>"

/***/ }),

/***/ "./src/app/basic3d/basic3d-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/basic3d/basic3d-routing.module.ts ***!
  \***************************************************/
/*! exports provided: Basic3dRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Basic3dRoutingModule", function() { return Basic3dRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _components_geometry_geometry_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/geometry/geometry.component */ "./src/app/basic3d/components/geometry/geometry.component.ts");




const routes = [{ path: "", component: _components_geometry_geometry_component__WEBPACK_IMPORTED_MODULE_3__["GeometryComponent"] }];
let Basic3dRoutingModule = class Basic3dRoutingModule {
};
Basic3dRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], Basic3dRoutingModule);



/***/ }),

/***/ "./src/app/basic3d/basic3d.module.ts":
/*!*******************************************!*\
  !*** ./src/app/basic3d/basic3d.module.ts ***!
  \*******************************************/
/*! exports provided: Basic3dModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Basic3dModule", function() { return Basic3dModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _basic3d_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./basic3d-routing.module */ "./src/app/basic3d/basic3d-routing.module.ts");
/* harmony import */ var _components_geometry_geometry_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/geometry/geometry.component */ "./src/app/basic3d/components/geometry/geometry.component.ts");





let Basic3dModule = class Basic3dModule {
};
Basic3dModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_components_geometry_geometry_component__WEBPACK_IMPORTED_MODULE_4__["GeometryComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _basic3d_routing_module__WEBPACK_IMPORTED_MODULE_3__["Basic3dRoutingModule"]
        ]
    })
], Basic3dModule);



/***/ }),

/***/ "./src/app/basic3d/components/geometry/geometry.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/basic3d/components/geometry/geometry.component.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Jhc2ljM2QvY29tcG9uZW50cy9nZW9tZXRyeS9nZW9tZXRyeS5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/basic3d/components/geometry/geometry.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/basic3d/components/geometry/geometry.component.ts ***!
  \*******************************************************************/
/*! exports provided: GeometryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeometryComponent", function() { return GeometryComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_three_services_three_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/three/services/three.service */ "./src/app/three/services/three.service.ts");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");





let GeometryComponent = class GeometryComponent {
    constructor(threeService) {
        this.threeService = threeService;
    }
    ngOnInit() { }
    ngAfterViewInit() {
        this.threeCommon = this.threeService.getThreeCommon(this.canvasEl.nativeElement);
        this.viewController();
    }
    viewController() {
        this.configureGeometry();
        this.configureMesh();
        this.renderView();
    }
    configureGeometry() {
        this.geometry = new three__WEBPACK_IMPORTED_MODULE_3__["Geometry"]();
        this.geometry.vertices.push(new three__WEBPACK_IMPORTED_MODULE_3__["Vector3"](1, 0, 0));
        this.geometry.vertices.push(new three__WEBPACK_IMPORTED_MODULE_3__["Vector3"](0, 1, 0));
        this.geometry.vertices.push(new three__WEBPACK_IMPORTED_MODULE_3__["Vector3"](0, 0, 1));
        this.geometry.faces.push(new three__WEBPACK_IMPORTED_MODULE_3__["Face3"](0, 1, 2));
    }
    configureMesh() {
        this.threeCommon.scene.add(new three__WEBPACK_IMPORTED_MODULE_3__["Mesh"](this.geometry, new three__WEBPACK_IMPORTED_MODULE_3__["MeshBasicMaterial"]({ color: "red", side: three__WEBPACK_IMPORTED_MODULE_3__["DoubleSide"] })));
    }
    renderView() {
        this.threeCommon.renderer.render(this.threeCommon.scene, this.threeCommon.camera);
        window.requestAnimationFrame(this.renderView.bind(this));
    }
};
GeometryComponent.ctorParameters = () => [
    { type: src_app_three_services_three_service__WEBPACK_IMPORTED_MODULE_2__["ThreeService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])("canvasEl", { static: false, read: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] })
], GeometryComponent.prototype, "canvasEl", void 0);
GeometryComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-geometry",
        template: __webpack_require__(/*! raw-loader!./geometry.component.html */ "./node_modules/raw-loader/index.js!./src/app/basic3d/components/geometry/geometry.component.html"),
        styles: [__webpack_require__(/*! ./geometry.component.scss */ "./src/app/basic3d/components/geometry/geometry.component.scss")]
    })
], GeometryComponent);



/***/ })

}]);
//# sourceMappingURL=basic3d-basic3d-module-es2015.js.map