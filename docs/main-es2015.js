(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n\n<mat-toolbar color=\"primary\">\n  <header>\n    <h1>JavaScript Visualization</h1>\n  </header>\n</mat-toolbar>\n<main>\n  <app-menu-primary></app-menu-primary>\n  <div class=\"overflow-container\">\n    <section class=\"main-flex\">\n      <div class=\"sub-nav\">\n        <app-menu-secondary></app-menu-secondary>\n      </div>\n      <div class=\"router-container\">\n        <router-outlet></router-outlet>\n      </div>\n    </section>\n  </div>\n</main>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/common/components/menu-primary/menu-primary.component.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/common/components/menu-primary/menu-primary.component.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav>\n  <a\n    [routerLink]=\"['/' + MAIN_ROUTES_DOM_REF.base3d]\"\n    [routerLinkActive]=\"['selected']\"\n  >\n    Base 3D\n  </a>\n  <a\n    [routerLink]=\"['/' + MAIN_ROUTES_DOM_REF.three - optimized]\"\n    [routerLinkActive]=\"['selected']\"\n  >\n    Three Instancing\n  </a>\n  <a [routerLink]=\"['/three']\" [routerLinkActive]=\"['selected']\"> Three Js </a>\n  <a [routerLink]=\"['/3dforce']\" [routerLinkActive]=\"['selected']\">\n    3D Force Graph\n  </a>\n  <a [routerLink]=\"['/us-regions']\" [routerLinkActive]=\"['selected']\">\n    US Regions on Globe\n  </a>\n  <a [routerLink]=\"['/d3']\" [routerLinkActive]=\"['selected']\"> Canvas </a>\n</nav>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/common/components/menu-secondary/menu-secondary.component.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/common/components/menu-secondary/menu-secondary.component.html ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div [ngSwitch]=\"currentMainRoute\">\n  \n  <div *ngSwitchCase=\"MAIN_ROUTES_DOM_REF.base3d\">\n    base 3d Menu\n  </div>\n  <div *ngSwitchCase=\"MAIN_ROUTES_DOM_REF['three-optimized']\">\n    <nav>\n      <a\n        [routerLink]=\"[\n          MAIN_ROUTES_DOM_REF['three-optimized'],\n          THREE_OPTIMIZED_ROUTES.unoptimizedCubes\n        ]\"\n      >\n        Unoptimized cubes\n      </a>\n      <a\n        [routerLink]=\"[\n          MAIN_ROUTES_DOM_REF['three-optimized'],\n          THREE_OPTIMIZED_ROUTES.webglShaders\n        ]\"\n      >\n        WebGl Shaders\n      </a>\n      <a\n        [routerLink]=\"[\n          MAIN_ROUTES_DOM_REF['three-optimized'],\n          THREE_OPTIMIZED_ROUTES.instancingBasic\n        ]\"\n      >\n        Three Instancing\n      </a>\n      <a\n        [routerLink]=\"[\n          MAIN_ROUTES_DOM_REF['three-optimized'],\n          THREE_OPTIMIZED_ROUTES.instancingRaycast\n        ]\"\n      >\n        Instancing Raycast\n      </a>\n      <a\n        [routerLink]=\"[\n          MAIN_ROUTES_DOM_REF['three-optimized'],\n          THREE_OPTIMIZED_ROUTES.instancingLayout\n        ]\"\n      >\n        Instancing Layout\n      </a>\n    </nav>\n  </div>\n  <div *ngSwitchDefault>output2</div>\n</div>\n"

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _common_enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/enums/main-routes.enum */ "./src/app/common/enums/main-routes.enum.ts");




const routes = [
    {
        path: `${_common_enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_3__["MainRoutes"].base3d}`,
        loadChildren: () => Promise.all(/*! import() | basic3d-basic3d-module */[__webpack_require__.e("default~basic3d-basic3d-module~ct-visualization-ct-visualization-module~three-force-three-force-modu~e19a601b"), __webpack_require__.e("common"), __webpack_require__.e("basic3d-basic3d-module")]).then(__webpack_require__.bind(null, /*! ./basic3d/basic3d.module */ "./src/app/basic3d/basic3d.module.ts")).then((m) => m.Basic3dModule),
    },
    {
        path: `${_common_enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_3__["MainRoutes"]["three-optimized"]}`,
        loadChildren: () => Promise.all(/*! import() | three-optimized-three-optimized-module */[__webpack_require__.e("default~basic3d-basic3d-module~ct-visualization-ct-visualization-module~three-force-three-force-modu~e19a601b"), __webpack_require__.e("common"), __webpack_require__.e("three-optimized-three-optimized-module")]).then(__webpack_require__.bind(null, /*! ./three-optimized/three-optimized.module */ "./src/app/three-optimized/three-optimized.module.ts")).then((m) => m.ThreeOptimizedModule),
    },
    {
        path: `${_common_enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_3__["MainRoutes"]["three-basics"]}`,
        loadChildren: () => Promise.all(/*! import() | three-three-module */[__webpack_require__.e("default~basic3d-basic3d-module~ct-visualization-ct-visualization-module~three-force-three-force-modu~e19a601b"), __webpack_require__.e("default~ct-visualization-ct-visualization-module~three-force-three-force-module~three-three-module"), __webpack_require__.e("default~ct-visualization-ct-visualization-module~three-three-module"), __webpack_require__.e("common"), __webpack_require__.e("three-three-module")]).then(__webpack_require__.bind(null, /*! ./three/three.module */ "./src/app/three/three.module.ts")).then((m) => m.ThreeModule),
    },
    // {
    //   path: "pixi",
    //   loadChildren: () => import("./pixi/pixi.module").then((m) => m.PixiModule),
    // },
    {
        path: `${_common_enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_3__["MainRoutes"].canvas}`,
        loadChildren: () => __webpack_require__.e(/*! import() | d3-d3-module */ "d3-d3-module").then(__webpack_require__.bind(null, /*! ./d3/d3.module */ "./src/app/d3/d3.module.ts")).then((m) => m.D3Module),
    },
    {
        path: `${_common_enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_3__["MainRoutes"]["globe-visualization"]}`,
        loadChildren: () => Promise.all(/*! import() | ct-visualization-ct-visualization-module */[__webpack_require__.e("default~basic3d-basic3d-module~ct-visualization-ct-visualization-module~three-force-three-force-modu~e19a601b"), __webpack_require__.e("default~ct-visualization-ct-visualization-module~three-force-three-force-module~three-three-module"), __webpack_require__.e("default~ct-visualization-ct-visualization-module~three-three-module"), __webpack_require__.e("default~ct-visualization-ct-visualization-module~three-force-three-force-module"), __webpack_require__.e("ct-visualization-ct-visualization-module")]).then(__webpack_require__.bind(null, /*! ./ct-visualization/ct-visualization.module */ "./src/app/ct-visualization/ct-visualization.module.ts")).then((m) => m.CtVisualizationModule),
    },
    {
        path: `${_common_enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_3__["MainRoutes"]["force-graph"]}`,
        loadChildren: () => Promise.all(/*! import() | three-force-three-force-module */[__webpack_require__.e("default~basic3d-basic3d-module~ct-visualization-ct-visualization-module~three-force-three-force-modu~e19a601b"), __webpack_require__.e("default~ct-visualization-ct-visualization-module~three-force-three-force-module~three-three-module"), __webpack_require__.e("default~ct-visualization-ct-visualization-module~three-force-three-force-module"), __webpack_require__.e("three-force-three-force-module")]).then(__webpack_require__.bind(null, /*! ./three-force/three-force.module */ "./src/app/three-force/three-force.module.ts")).then((m) => m.ThreeForceModule),
    },
    {
        path: "",
        redirectTo: "three-optimized",
        pathMatch: "full",
    },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes, { enableTracing: false })],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], AppRoutingModule);



/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "main {\n  width: 80vw;\n  margin: 0 auto;\n}\n\n.main-flex {\n  display: -webkit-box;\n  display: flex;\n  overflow: auto;\n}\n\n.main-flex .sub-nav {\n  -webkit-box-flex: 0;\n          flex: 0 0 20%;\n}\n\n.main-flex .router-container {\n  padding: 20px;\n  -webkit-box-flex: 0;\n          flex: 0 0 80%;\n}\n\n.ThreeJsElem.one {\n  height: 400px;\n  width: 90vw;\n  border: solid 1px;\n  margin: 0 auto;\n}\n\n.overflow-container {\n  height: 100%;\n  width: 100%;\n  overflow: scroll;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zdW1pdC5rdW1hci9Xb3Jrc3BhY2UvZ2l0aHViL3NvdXJjZWNvZGUvVGhyZWVKc1ByaW1lci9zcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLGNBQUE7QUNDRjs7QURDQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLGNBQUE7QUNFRjs7QURBRTtFQUNFLG1CQUFBO1VBQUEsYUFBQTtBQ0VKOztBREFFO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO1VBQUEsYUFBQTtBQ0VKOztBREdFO0VBQ0UsYUFBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7QUNBSjs7QURHQTtFQUNJLFlBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7QUNBSiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIm1haW4ge1xuICB3aWR0aDogODB2dztcbiAgbWFyZ2luOiAwIGF1dG87XG59XG4ubWFpbi1mbGV4IHtcbiAgZGlzcGxheTogZmxleDtcbiAgb3ZlcmZsb3c6IGF1dG87XG5cbiAgLnN1Yi1uYXYge1xuICAgIGZsZXg6IDAgMCAyMCU7XG4gIH1cbiAgLnJvdXRlci1jb250YWluZXIge1xuICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgZmxleDogMCAwIDgwJTtcbiAgfVxufVxuXG4uVGhyZWVKc0VsZW0ge1xuICAmLm9uZSB7XG4gICAgaGVpZ2h0OiA0MDBweDtcbiAgICB3aWR0aDogOTB2dztcbiAgICBib3JkZXI6IHNvbGlkIDFweDtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgfVxufVxuLm92ZXJmbG93LWNvbnRhaW5lcntcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgb3ZlcmZsb3c6IHNjcm9sbDtcbn1cbiIsIm1haW4ge1xuICB3aWR0aDogODB2dztcbiAgbWFyZ2luOiAwIGF1dG87XG59XG5cbi5tYWluLWZsZXgge1xuICBkaXNwbGF5OiBmbGV4O1xuICBvdmVyZmxvdzogYXV0bztcbn1cbi5tYWluLWZsZXggLnN1Yi1uYXYge1xuICBmbGV4OiAwIDAgMjAlO1xufVxuLm1haW4tZmxleCAucm91dGVyLWNvbnRhaW5lciB7XG4gIHBhZGRpbmc6IDIwcHg7XG4gIGZsZXg6IDAgMCA4MCU7XG59XG5cbi5UaHJlZUpzRWxlbS5vbmUge1xuICBoZWlnaHQ6IDQwMHB4O1xuICB3aWR0aDogOTB2dztcbiAgYm9yZGVyOiBzb2xpZCAxcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuXG4ub3ZlcmZsb3ctY29udGFpbmVyIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgb3ZlcmZsb3c6IHNjcm9sbDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


// import * as THREE from 'three';
// // import { ThreeService } from './services/three.service';
let AppComponent = class AppComponent {
};
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
        styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
    })
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm2015/button.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm2015/icon.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm2015/toolbar.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm2015/animations.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _common_components_menu_primary_menu_primary_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./common/components/menu-primary/menu-primary.component */ "./src/app/common/components/menu-primary/menu-primary.component.ts");
/* harmony import */ var _common_components_menu_secondary_menu_secondary_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./common/components/menu-secondary/menu-secondary.component */ "./src/app/common/components/menu-secondary/menu-secondary.component.ts");











let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"], _common_components_menu_primary_menu_primary_component__WEBPACK_IMPORTED_MODULE_9__["MenuPrimaryComponent"], _common_components_menu_secondary_menu_secondary_component__WEBPACK_IMPORTED_MODULE_10__["MenuSecondaryComponent"]],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_7__["AppRoutingModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__["MatIconModule"],
            _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__["MatToolbarModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
        ],
        providers: [],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"]],
    })
], AppModule);



/***/ }),

/***/ "./src/app/common/components/menu-primary/menu-primary.component.scss":
/*!****************************************************************************!*\
  !*** ./src/app/common/components/menu-primary/menu-primary.component.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "nav {\n  display: -webkit-box;\n  display: flex;\n  margin-top: 10px;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\nnav a {\n  flex-basis: 30%;\n  text-decoration: none;\n  padding: 5px;\n  border: solid 1px;\n  text-align: center;\n}\nnav a.selected {\n  background-image: -webkit-gradient(linear, left top, left bottom, from(#ffffff), color-stop(75%, #f3f3f3), to(#c2c7de));\n  background-image: linear-gradient(180deg, #ffffff 0%, #f3f3f3 75%, #c2c7de 100%);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zdW1pdC5rdW1hci9Xb3Jrc3BhY2UvZ2l0aHViL3NvdXJjZWNvZGUvVGhyZWVKc1ByaW1lci9zcmMvYXBwL2NvbW1vbi9jb21wb25lbnRzL21lbnUtcHJpbWFyeS9tZW51LXByaW1hcnkuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NvbW1vbi9jb21wb25lbnRzL21lbnUtcHJpbWFyeS9tZW51LXByaW1hcnkuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFDQSxnQkFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7QUNDSjtBREFJO0VBQ0ksZUFBQTtFQUNBLHFCQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7QUNFUjtBREFJO0VBQ0ksdUhBQUE7RUFBQSxnRkFBQTtBQ0VSIiwiZmlsZSI6InNyYy9hcHAvY29tbW9uL2NvbXBvbmVudHMvbWVudS1wcmltYXJ5L21lbnUtcHJpbWFyeS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIm5hdiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBhIHtcbiAgICAgICAgZmxleC1iYXNpczogMzAlO1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICAgIHBhZGRpbmc6IDVweDtcbiAgICAgICAgYm9yZGVyOiBzb2xpZCAxcHg7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB9XG4gICAgYS5zZWxlY3RlZHtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgI2ZmZmZmZiAwJSwgI2YzZjNmMyA3NSUsICNjMmM3ZGUgMTAwJSk7O1xuICAgIH1cbn0iLCJuYXYge1xuICBkaXNwbGF5OiBmbGV4O1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5uYXYgYSB7XG4gIGZsZXgtYmFzaXM6IDMwJTtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBwYWRkaW5nOiA1cHg7XG4gIGJvcmRlcjogc29saWQgMXB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5uYXYgYS5zZWxlY3RlZCB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCgxODBkZWcsICNmZmZmZmYgMCUsICNmM2YzZjMgNzUlLCAjYzJjN2RlIDEwMCUpO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/common/components/menu-primary/menu-primary.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/common/components/menu-primary/menu-primary.component.ts ***!
  \**************************************************************************/
/*! exports provided: MenuPrimaryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuPrimaryComponent", function() { return MenuPrimaryComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../enums/main-routes.enum */ "./src/app/common/enums/main-routes.enum.ts");



let MenuPrimaryComponent = class MenuPrimaryComponent {
    constructor() {
        this.MAIN_ROUTES_DOM_REF = _enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_2__["MainRoutes"];
    }
    ngOnInit() { }
};
MenuPrimaryComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-menu-primary",
        template: __webpack_require__(/*! raw-loader!./menu-primary.component.html */ "./node_modules/raw-loader/index.js!./src/app/common/components/menu-primary/menu-primary.component.html"),
        styles: [__webpack_require__(/*! ./menu-primary.component.scss */ "./src/app/common/components/menu-primary/menu-primary.component.scss")]
    })
], MenuPrimaryComponent);



/***/ }),

/***/ "./src/app/common/components/menu-secondary/menu-secondary.component.scss":
/*!********************************************************************************!*\
  !*** ./src/app/common/components/menu-secondary/menu-secondary.component.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "nav {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  margin-top: 10px;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\nnav a {\n  flex-basis: 30%;\n  text-decoration: none;\n  padding: 5px;\n  border: solid 1px;\n  text-align: center;\n}\nnav a.selected {\n  background-image: -webkit-gradient(linear, left top, left bottom, from(#ffffff), color-stop(75%, #f3f3f3), to(#c2c7de));\n  background-image: linear-gradient(180deg, #ffffff 0%, #f3f3f3 75%, #c2c7de 100%);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zdW1pdC5rdW1hci9Xb3Jrc3BhY2UvZ2l0aHViL3NvdXJjZWNvZGUvVGhyZWVKc1ByaW1lci9zcmMvYXBwL2NvbW1vbi9jb21wb25lbnRzL21lbnUtc2Vjb25kYXJ5L21lbnUtc2Vjb25kYXJ5LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9jb21tb24vY29tcG9uZW50cy9tZW51LXNlY29uZGFyeS9tZW51LXNlY29uZGFyeS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDRCQUFBO0VBQUEsNkJBQUE7VUFBQSxzQkFBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtBQ0NKO0FEQUk7RUFDSSxlQUFBO0VBQ0EscUJBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtBQ0VSO0FEQUk7RUFDSSx1SEFBQTtFQUFBLGdGQUFBO0FDRVIiLCJmaWxlIjoic3JjL2FwcC9jb21tb24vY29tcG9uZW50cy9tZW51LXNlY29uZGFyeS9tZW51LXNlY29uZGFyeS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIm5hdiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGEge1xuICAgICAgICBmbGV4LWJhc2lzOiAzMCU7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgICAgcGFkZGluZzogNXB4O1xuICAgICAgICBib3JkZXI6IHNvbGlkIDFweDtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIH1cbiAgICBhLnNlbGVjdGVke1xuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjZmZmZmZmIDAlLCAjZjNmM2YzIDc1JSwgI2MyYzdkZSAxMDAlKTs7XG4gICAgfVxufSIsIm5hdiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcbn1cbm5hdiBhIHtcbiAgZmxleC1iYXNpczogMzAlO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIHBhZGRpbmc6IDVweDtcbiAgYm9yZGVyOiBzb2xpZCAxcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbm5hdiBhLnNlbGVjdGVkIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgI2ZmZmZmZiAwJSwgI2YzZjNmMyA3NSUsICNjMmM3ZGUgMTAwJSk7XG59Il19 */"

/***/ }),

/***/ "./src/app/common/components/menu-secondary/menu-secondary.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/common/components/menu-secondary/menu-secondary.component.ts ***!
  \******************************************************************************/
/*! exports provided: MenuSecondaryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuSecondaryComponent", function() { return MenuSecondaryComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../enums/main-routes.enum */ "./src/app/common/enums/main-routes.enum.ts");
/* harmony import */ var _enums_three_optimized_routes_enum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../enums/three-optimized-routes.enum */ "./src/app/common/enums/three-optimized-routes.enum.ts");





let MenuSecondaryComponent = class MenuSecondaryComponent {
    constructor(router) {
        this.router = router;
        this.currentMainRoute = "";
        this.THREE_OPTIMIZED_ROUTES = _enums_three_optimized_routes_enum__WEBPACK_IMPORTED_MODULE_4__["ThreeOptimizedRoutes"];
        this.MAIN_ROUTES_DOM_REF = _enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_3__["MainRoutes"];
    }
    ngOnInit() {
        this.routerSubscription = this.router.events.subscribe((event) => {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationEnd"] && event.url) {
                this.currentMainRoute = event.url.split("/")[1];
            }
        });
    }
};
MenuSecondaryComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
MenuSecondaryComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-menu-secondary",
        template: __webpack_require__(/*! raw-loader!./menu-secondary.component.html */ "./node_modules/raw-loader/index.js!./src/app/common/components/menu-secondary/menu-secondary.component.html"),
        styles: [__webpack_require__(/*! ./menu-secondary.component.scss */ "./src/app/common/components/menu-secondary/menu-secondary.component.scss")]
    })
], MenuSecondaryComponent);



/***/ }),

/***/ "./src/app/common/enums/main-routes.enum.ts":
/*!**************************************************!*\
  !*** ./src/app/common/enums/main-routes.enum.ts ***!
  \**************************************************/
/*! exports provided: MainRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainRoutes", function() { return MainRoutes; });
var MainRoutes;
(function (MainRoutes) {
    MainRoutes["three-optimized"] = "three-optimized";
    MainRoutes["three-basics"] = "three-basics";
    MainRoutes["globe-visualization"] = "globe-visualization";
    MainRoutes["force-graph"] = "force-graph";
    MainRoutes["canvas"] = "canvas";
    MainRoutes["base3d"] = "base3d";
})(MainRoutes || (MainRoutes = {}));


/***/ }),

/***/ "./src/app/common/enums/three-optimized-routes.enum.ts":
/*!*************************************************************!*\
  !*** ./src/app/common/enums/three-optimized-routes.enum.ts ***!
  \*************************************************************/
/*! exports provided: ThreeOptimizedRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThreeOptimizedRoutes", function() { return ThreeOptimizedRoutes; });
var ThreeOptimizedRoutes;
(function (ThreeOptimizedRoutes) {
    ThreeOptimizedRoutes["unoptimizedCubes"] = "unoptimized-cubes";
    ThreeOptimizedRoutes["webglShaders"] = "webgl-shaders";
    ThreeOptimizedRoutes["instancingBasic"] = "instancing-basic";
    ThreeOptimizedRoutes["instancingRaycast"] = "instancing-raycast";
    ThreeOptimizedRoutes["instancingLayout"] = "instancing-layout";
})(ThreeOptimizedRoutes || (ThreeOptimizedRoutes = {}));


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/sumit.kumar/Workspace/github/sourcecode/ThreeJsPrimer/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map