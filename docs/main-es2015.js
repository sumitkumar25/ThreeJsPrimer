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

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule, ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵ0", function() { return ɵ0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵ1", function() { return ɵ1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵ2", function() { return ɵ2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵ3", function() { return ɵ3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵ4", function() { return ɵ4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵ5", function() { return ɵ5; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵ6", function() { return ɵ6; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _common_enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/enums/main-routes.enum */ "./src/app/common/enums/main-routes.enum.ts");


const ɵ0 = () => Promise.all(/*! import() | basic3d-basic3d-module-ngfactory */[__webpack_require__.e("default~basic3d-basic3d-module-ngfactory~ct-visualization-ct-visualization-module-ngfactory~network-~fe4d91da"), __webpack_require__.e("basic3d-basic3d-module-ngfactory")]).then(__webpack_require__.bind(null, /*! ./basic3d/basic3d.module.ngfactory */ "./src/app/basic3d/basic3d.module.ngfactory.js")).then((m) => m.Basic3dModuleNgFactory), ɵ1 = () => Promise.all(/*! import() | three-optimized-three-optimized-module-ngfactory */[__webpack_require__.e("default~basic3d-basic3d-module-ngfactory~ct-visualization-ct-visualization-module-ngfactory~network-~fe4d91da"), __webpack_require__.e("default~network-graph-network-graph-module-ngfactory~three-optimized-three-optimized-module-ngfactory"), __webpack_require__.e("three-optimized-three-optimized-module-ngfactory")]).then(__webpack_require__.bind(null, /*! ./three-optimized/three-optimized.module.ngfactory */ "./src/app/three-optimized/three-optimized.module.ngfactory.js")).then((m) => m.ThreeOptimizedModuleNgFactory), ɵ2 = () => Promise.all(/*! import() | three-three-module-ngfactory */[__webpack_require__.e("default~basic3d-basic3d-module-ngfactory~ct-visualization-ct-visualization-module-ngfactory~network-~fe4d91da"), __webpack_require__.e("default~ct-visualization-ct-visualization-module-ngfactory~three-force-three-force-module-ngfactory~~a459a580"), __webpack_require__.e("default~ct-visualization-ct-visualization-module-ngfactory~three-three-module-ngfactory"), __webpack_require__.e("three-three-module-ngfactory")]).then(__webpack_require__.bind(null, /*! ./three/three.module.ngfactory */ "./src/app/three/three.module.ngfactory.js")).then((m) => m.ThreeModuleNgFactory), ɵ3 = () => __webpack_require__.e(/*! import() | d3-d3-module-ngfactory */ "d3-d3-module-ngfactory").then(__webpack_require__.bind(null, /*! ./d3/d3.module.ngfactory */ "./src/app/d3/d3.module.ngfactory.js")).then((m) => m.D3ModuleNgFactory), ɵ4 = () => Promise.all(/*! import() | ct-visualization-ct-visualization-module-ngfactory */[__webpack_require__.e("default~basic3d-basic3d-module-ngfactory~ct-visualization-ct-visualization-module-ngfactory~network-~fe4d91da"), __webpack_require__.e("default~ct-visualization-ct-visualization-module-ngfactory~three-force-three-force-module-ngfactory~~a459a580"), __webpack_require__.e("default~ct-visualization-ct-visualization-module-ngfactory~three-three-module-ngfactory"), __webpack_require__.e("default~ct-visualization-ct-visualization-module-ngfactory~three-force-three-force-module-ngfactory"), __webpack_require__.e("ct-visualization-ct-visualization-module-ngfactory")]).then(__webpack_require__.bind(null, /*! ./ct-visualization/ct-visualization.module.ngfactory */ "./src/app/ct-visualization/ct-visualization.module.ngfactory.js")).then((m) => m.CtVisualizationModuleNgFactory), ɵ5 = () => Promise.all(/*! import() | three-force-three-force-module-ngfactory */[__webpack_require__.e("default~basic3d-basic3d-module-ngfactory~ct-visualization-ct-visualization-module-ngfactory~network-~fe4d91da"), __webpack_require__.e("default~ct-visualization-ct-visualization-module-ngfactory~three-force-three-force-module-ngfactory~~a459a580"), __webpack_require__.e("default~ct-visualization-ct-visualization-module-ngfactory~three-force-three-force-module-ngfactory"), __webpack_require__.e("three-force-three-force-module-ngfactory")]).then(__webpack_require__.bind(null, /*! ./three-force/three-force.module.ngfactory */ "./src/app/three-force/three-force.module.ngfactory.js")).then((m) => m.ThreeForceModuleNgFactory), ɵ6 = () => Promise.all(/*! import() | network-graph-network-graph-module-ngfactory */[__webpack_require__.e("default~basic3d-basic3d-module-ngfactory~ct-visualization-ct-visualization-module-ngfactory~network-~fe4d91da"), __webpack_require__.e("default~network-graph-network-graph-module-ngfactory~three-optimized-three-optimized-module-ngfactory"), __webpack_require__.e("network-graph-network-graph-module-ngfactory")]).then(__webpack_require__.bind(null, /*! ./network-graph/network-graph.module.ngfactory */ "./src/app/network-graph/network-graph.module.ngfactory.js")).then((m) => m.NetworkGraphModuleNgFactory);
const routes = [
    {
        path: `${_common_enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_1__["MainRoutes"].base3d}`,
        loadChildren: ɵ0,
    },
    {
        path: `${_common_enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_1__["MainRoutes"].threeOptimized}`,
        loadChildren: ɵ1,
    },
    {
        path: `${_common_enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_1__["MainRoutes"].threeBasics}`,
        loadChildren: ɵ2,
    },
    {
        path: `${_common_enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_1__["MainRoutes"].canvas}`,
        loadChildren: ɵ3,
    },
    {
        path: `${_common_enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_1__["MainRoutes"].globeVisualization}`,
        loadChildren: ɵ4,
    },
    {
        path: `${_common_enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_1__["MainRoutes"].forceGraph}`,
        loadChildren: ɵ5,
    },
    {
        path: `${_common_enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_1__["MainRoutes"].networkGraph}`,
        loadChildren: ɵ6,
    },
    {
        path: "",
        redirectTo: "three-optimized",
        pathMatch: "full",
    },
];
class AppRoutingModule {
}



/***/ }),

/***/ "./src/app/app.component.ngfactory.js":
/*!********************************************!*\
  !*** ./src/app/app.component.ngfactory.js ***!
  \********************************************/
/*! exports provided: RenderType_AppComponent, View_AppComponent_0, View_AppComponent_Host_0, AppComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_AppComponent", function() { return RenderType_AppComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_AppComponent_0", function() { return View_AppComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_AppComponent_Host_0", function() { return View_AppComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponentNgFactory", function() { return AppComponentNgFactory; });
/* harmony import */ var _app_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component.scss.shim.ngstyle */ "./src/app/app.component.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _common_components_menu_primary_menu_primary_component_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/components/menu-primary/menu-primary.component.ngfactory */ "./src/app/common/components/menu-primary/menu-primary.component.ngfactory.js");
/* harmony import */ var _common_components_menu_primary_menu_primary_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/components/menu-primary/menu-primary.component */ "./src/app/common/components/menu-primary/menu-primary.component.ts");
/* harmony import */ var _common_components_menu_secondary_menu_secondary_component_ngfactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/components/menu-secondary/menu-secondary.component.ngfactory */ "./src/app/common/components/menu-secondary/menu-secondary.component.ngfactory.js");
/* harmony import */ var _common_components_menu_secondary_menu_secondary_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/components/menu-secondary/menu-secondary.component */ "./src/app/common/components/menu-secondary/menu-secondary.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 








var styles_AppComponent = [_app_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_AppComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_AppComponent, data: {} });

function View_AppComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 6, "header", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 1, "h1", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Data Visualization"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 3, "nav", [["class", "logos"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](4, 0, null, null, 0, "img", [["alt", "js"], ["src", "assets/header/js.png"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 0, "img", [["alt", "three"], ["class", "three"], ["src", "assets/header/three.png"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](6, 0, null, null, 0, "img", [["alt", "angular"], ["src", "assets/header/angular.png"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](7, 0, null, null, 10, "main", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](8, 0, null, null, 1, "app-menu-primary", [], null, null, null, _common_components_menu_primary_menu_primary_component_ngfactory__WEBPACK_IMPORTED_MODULE_2__["View_MenuPrimaryComponent_0"], _common_components_menu_primary_menu_primary_component_ngfactory__WEBPACK_IMPORTED_MODULE_2__["RenderType_MenuPrimaryComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](9, 114688, null, 0, _common_components_menu_primary_menu_primary_component__WEBPACK_IMPORTED_MODULE_3__["MenuPrimaryComponent"], [], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](10, 0, null, null, 7, "div", [["class", "overflow-container"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](11, 0, null, null, 6, "section", [["class", "main-flex"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](12, 0, null, null, 2, "div", [["class", "sub-nav"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](13, 0, null, null, 1, "app-menu-secondary", [], null, null, null, _common_components_menu_secondary_menu_secondary_component_ngfactory__WEBPACK_IMPORTED_MODULE_4__["View_MenuSecondaryComponent_0"], _common_components_menu_secondary_menu_secondary_component_ngfactory__WEBPACK_IMPORTED_MODULE_4__["RenderType_MenuSecondaryComponent"])), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](14, 114688, null, 0, _common_components_menu_secondary_menu_secondary_component__WEBPACK_IMPORTED_MODULE_5__["MenuSecondaryComponent"], [_angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]], null, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](15, 0, null, null, 2, "div", [["class", "router-container"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](16, 16777216, null, null, 1, "router-outlet", [], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](17, 212992, null, 0, _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterOutlet"], [_angular_router__WEBPACK_IMPORTED_MODULE_6__["ChildrenOutletContexts"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"], [8, null], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]], null, null)], function (_ck, _v) { _ck(_v, 9, 0); _ck(_v, 14, 0); _ck(_v, 17, 0); }, null); }
function View_AppComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-root", [], null, null, null, View_AppComponent_0, RenderType_AppComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 49152, null, 0, _app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"], [], null, null)], null, null); }
var AppComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-root", _app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"], View_AppComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/app.component.scss.shim.ngstyle.js":
/*!****************************************************!*\
  !*** ./src/app/app.component.scss.shim.ngstyle.js ***!
  \****************************************************/
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
var styles = ["main[_ngcontent-%COMP%] {\n  width: 80vw;\n  margin: 0 auto;\n}\n\n.main-flex[_ngcontent-%COMP%] {\n  display: -webkit-box;\n  display: flex;\n  overflow: auto;\n}\n\n.main-flex[_ngcontent-%COMP%]   .sub-nav[_ngcontent-%COMP%] {\n  -webkit-box-flex: 0;\n          flex: 0 0 20%;\n}\n\n.main-flex[_ngcontent-%COMP%]   .router-container[_ngcontent-%COMP%] {\n  padding: 20px;\n  -webkit-box-flex: 0;\n          flex: 0 0 80%;\n}\n\nheader[_ngcontent-%COMP%] {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  padding: 10px 0;\n}\n\nheader[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n.logos[_ngcontent-%COMP%] {\n  display: -webkit-box;\n  display: flex;\n}\n\n.logos[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 35px;\n  height: 35px;\n}\n\n.overflow-container[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n  overflow: scroll;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zdW1pdC5rdW1hci9Xb3Jrc3BhY2UvZ2l0aHViL3NvdXJjZWNvZGUvVGhyZWVKc1ByaW1lci9zcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLGNBQUE7QUNDRjs7QURDQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLGNBQUE7QUNFRjs7QURBRTtFQUNFLG1CQUFBO1VBQUEsYUFBQTtBQ0VKOztBREFFO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO1VBQUEsYUFBQTtBQ0VKOztBRENBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtFQUNBLGVBQUE7QUNFRjs7QURERTtFQUNFLFNBQUE7QUNHSjs7QURBQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtBQ0dGOztBREZFO0VBQ0UsV0FBQTtFQUNBLFlBQUE7QUNJSjs7QUREQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7QUNJRiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIm1haW4ge1xuICB3aWR0aDogODB2dztcbiAgbWFyZ2luOiAwIGF1dG87XG59XG4ubWFpbi1mbGV4IHtcbiAgZGlzcGxheTogZmxleDtcbiAgb3ZlcmZsb3c6IGF1dG87XG5cbiAgLnN1Yi1uYXYge1xuICAgIGZsZXg6IDAgMCAyMCU7XG4gIH1cbiAgLnJvdXRlci1jb250YWluZXIge1xuICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgZmxleDogMCAwIDgwJTtcbiAgfVxufVxuaGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBwYWRkaW5nOiAxMHB4IDA7XG4gIGgxe1xuICAgIG1hcmdpbjogMDtcbiAgfVxufVxuLmxvZ29zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgaW1nIHtcbiAgICB3aWR0aDogMzVweDtcbiAgICBoZWlnaHQ6IDM1cHg7XG4gIH1cbn1cbi5vdmVyZmxvdy1jb250YWluZXIge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBvdmVyZmxvdzogc2Nyb2xsO1xufVxuIiwibWFpbiB7XG4gIHdpZHRoOiA4MHZ3O1xuICBtYXJnaW46IDAgYXV0bztcbn1cblxuLm1haW4tZmxleCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIG92ZXJmbG93OiBhdXRvO1xufVxuLm1haW4tZmxleCAuc3ViLW5hdiB7XG4gIGZsZXg6IDAgMCAyMCU7XG59XG4ubWFpbi1mbGV4IC5yb3V0ZXItY29udGFpbmVyIHtcbiAgcGFkZGluZzogMjBweDtcbiAgZmxleDogMCAwIDgwJTtcbn1cblxuaGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBwYWRkaW5nOiAxMHB4IDA7XG59XG5oZWFkZXIgaDEge1xuICBtYXJnaW46IDA7XG59XG5cbi5sb2dvcyB7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG4ubG9nb3MgaW1nIHtcbiAgd2lkdGg6IDM1cHg7XG4gIGhlaWdodDogMzVweDtcbn1cblxuLm92ZXJmbG93LWNvbnRhaW5lciB7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIG92ZXJmbG93OiBzY3JvbGw7XG59Il19 */"];



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
// import * as THREE from 'three';
// // import { ThreeService } from './services/three.service';
class AppComponent {
}


/***/ }),

/***/ "./src/app/app.module.ngfactory.js":
/*!*****************************************!*\
  !*** ./src/app/app.module.ngfactory.js ***!
  \*****************************************/
/*! exports provided: AppModuleNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModuleNgFactory", function() { return AppModuleNgFactory; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _app_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.module */ "./src/app/app.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _node_modules_angular_router_router_ngfactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/@angular/router/router.ngfactory */ "./node_modules/@angular/router/router.ngfactory.js");
/* harmony import */ var _app_component_ngfactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component.ngfactory */ "./src/app/app.component.ngfactory.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_animations_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/animations/browser */ "./node_modules/@angular/animations/fesm2015/browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm2015/animations.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm2015/animations.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _common_enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./common/enums/main-routes.enum */ "./src/app/common/enums/main-routes.enum.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/esm2015/bidi.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/esm2015/core.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm2015/icon.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm2015/toolbar.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/esm2015/platform.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm2015/button.js");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 




















var AppModuleNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcmf"](_app_module__WEBPACK_IMPORTED_MODULE_1__["AppModule"], [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]], function (_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmod"]([_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵCodegenComponentFactoryResolver"], [[8, [_node_modules_angular_router_router_ngfactory__WEBPACK_IMPORTED_MODULE_3__["ɵangular_packages_router_router_lNgFactory"], _app_component_ngfactory__WEBPACK_IMPORTED_MODULE_4__["AppComponentNgFactory"]]], [3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_core_core_q"], [[3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgLocalization"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgLocaleLocalization"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_common_common_a"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_core_core_bb"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_core_core_s"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_core__WEBPACK_IMPORTED_MODULE_0__["APP_ID"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_core_core_f"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_core__WEBPACK_IMPORTED_MODULE_0__["IterableDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_core_core_o"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_core__WEBPACK_IMPORTED_MODULE_0__["KeyValueDiffers"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_core_core_p"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["DomSanitizer"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["ɵDomSanitizerImpl"], [_angular_common__WEBPACK_IMPORTED_MODULE_5__["DOCUMENT"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](6144, _angular_core__WEBPACK_IMPORTED_MODULE_0__["Sanitizer"], null, [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["DomSanitizer"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["HAMMER_GESTURE_CONFIG"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["HammerGestureConfig"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["EVENT_MANAGER_PLUGINS"], function (p0_0, p0_1, p0_2, p1_0, p2_0, p2_1, p2_2, p2_3) { return [new _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["ɵDomEventsPlugin"](p0_0, p0_1, p0_2), new _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["ɵKeyEventsPlugin"](p1_0), new _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["ɵHammerGesturesPlugin"](p2_0, p2_1, p2_2, p2_3)]; }, [_angular_common__WEBPACK_IMPORTED_MODULE_5__["DOCUMENT"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["PLATFORM_ID"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["DOCUMENT"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["DOCUMENT"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["HAMMER_GESTURE_CONFIG"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵConsole"], [2, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["HAMMER_LOADER"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["EventManager"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["EventManager"], [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["EVENT_MANAGER_PLUGINS"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](135680, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["ɵDomSharedStylesHost"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["ɵDomSharedStylesHost"], [_angular_common__WEBPACK_IMPORTED_MODULE_5__["DOCUMENT"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["ɵDomRendererFactory2"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["ɵDomRendererFactory2"], [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["EventManager"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["ɵDomSharedStylesHost"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["APP_ID"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_animations_browser__WEBPACK_IMPORTED_MODULE_7__["AnimationDriver"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["ɵangular_packages_platform_browser_animations_animations_a"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_animations_browser__WEBPACK_IMPORTED_MODULE_7__["ɵAnimationStyleNormalizer"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["ɵangular_packages_platform_browser_animations_animations_b"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_animations_browser__WEBPACK_IMPORTED_MODULE_7__["ɵAnimationEngine"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["ɵInjectableAnimationEngine"], [_angular_common__WEBPACK_IMPORTED_MODULE_5__["DOCUMENT"], _angular_animations_browser__WEBPACK_IMPORTED_MODULE_7__["AnimationDriver"], _angular_animations_browser__WEBPACK_IMPORTED_MODULE_7__["ɵAnimationStyleNormalizer"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_core__WEBPACK_IMPORTED_MODULE_0__["RendererFactory2"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["ɵangular_packages_platform_browser_animations_animations_c"], [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["ɵDomRendererFactory2"], _angular_animations_browser__WEBPACK_IMPORTED_MODULE_7__["ɵAnimationEngine"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](6144, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["ɵSharedStylesHost"], null, [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["ɵDomSharedStylesHost"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_core__WEBPACK_IMPORTED_MODULE_0__["Testability"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Testability"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["ɵangular_packages_router_router_g"], [_angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_router__WEBPACK_IMPORTED_MODULE_9__["NoPreloading"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["NoPreloading"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](6144, _angular_router__WEBPACK_IMPORTED_MODULE_9__["PreloadingStrategy"], null, [_angular_router__WEBPACK_IMPORTED_MODULE_9__["NoPreloading"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](135680, _angular_router__WEBPACK_IMPORTED_MODULE_9__["RouterPreloader"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["RouterPreloader"], [_angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleFactoryLoader"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Compiler"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["PreloadingStrategy"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_router__WEBPACK_IMPORTED_MODULE_9__["PreloadAllModules"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["PreloadAllModules"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_router__WEBPACK_IMPORTED_MODULE_9__["ɵangular_packages_router_router_o"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["ɵangular_packages_router_router_c"], [_angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["ViewportScroller"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["ROUTER_CONFIGURATION"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_router__WEBPACK_IMPORTED_MODULE_9__["ROUTER_INITIALIZER"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["ɵangular_packages_router_router_j"], [_angular_router__WEBPACK_IMPORTED_MODULE_9__["ɵangular_packages_router_router_h"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_core__WEBPACK_IMPORTED_MODULE_0__["APP_BOOTSTRAP_LISTENER"], function (p0_0) { return [p0_0]; }, [_angular_router__WEBPACK_IMPORTED_MODULE_9__["ROUTER_INITIALIZER"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_animations__WEBPACK_IMPORTED_MODULE_10__["AnimationBuilder"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["ɵBrowserAnimationBuilder"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["RendererFactory2"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["DOCUMENT"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["HttpXsrfTokenExtractor"], _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_common_http_http_g"], [_angular_common__WEBPACK_IMPORTED_MODULE_5__["DOCUMENT"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["PLATFORM_ID"], _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_common_http_http_e"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_common_http_http_h"], _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_common_http_http_h"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_11__["HttpXsrfTokenExtractor"], _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_common_http_http_f"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](5120, _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["HTTP_INTERCEPTORS"], function (p0_0) { return [p0_0]; }, [_angular_common_http__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_common_http_http_h"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_common_http_http_d"], _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_common_http_http_d"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](6144, _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["XhrFactory"], null, [_angular_common_http__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_common_http_http_d"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["HttpXhrBackend"], _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["HttpXhrBackend"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_11__["XhrFactory"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](6144, _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["HttpBackend"], null, [_angular_common_http__WEBPACK_IMPORTED_MODULE_11__["HttpXhrBackend"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["HttpHandler"], _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["ɵHttpInterceptingHandler"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_11__["HttpBackend"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["HttpClient"], _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["HttpClient"], [_angular_common_http__WEBPACK_IMPORTED_MODULE_11__["HttpHandler"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ErrorHandler"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_platform_browser_platform_browser_a"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgProbeToken"], function () { return [_angular_router__WEBPACK_IMPORTED_MODULE_9__["ɵangular_packages_router_router_b"]()]; }, []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_router__WEBPACK_IMPORTED_MODULE_9__["ɵangular_packages_router_router_h"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["ɵangular_packages_router_router_h"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_core__WEBPACK_IMPORTED_MODULE_0__["APP_INITIALIZER"], function (p0_0, p1_0) { return [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_platform_browser_platform_browser_j"](p0_0), _angular_router__WEBPACK_IMPORTED_MODULE_9__["ɵangular_packages_router_router_i"](p1_0)]; }, [[2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgProbeToken"]], _angular_router__WEBPACK_IMPORTED_MODULE_9__["ɵangular_packages_router_router_h"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationInitStatus"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationInitStatus"], [[2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["APP_INITIALIZER"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](131584, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationRef"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵConsole"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ErrorHandler"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationInitStatus"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationModule"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationModule"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["BrowserModule"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["BrowserModule"], [[3, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["BrowserModule"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_router__WEBPACK_IMPORTED_MODULE_9__["ɵangular_packages_router_router_a"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["ɵangular_packages_router_router_e"], [[3, _angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_router__WEBPACK_IMPORTED_MODULE_9__["UrlSerializer"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["DefaultUrlSerializer"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_router__WEBPACK_IMPORTED_MODULE_9__["ChildrenOutletContexts"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["ChildrenOutletContexts"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _angular_router__WEBPACK_IMPORTED_MODULE_9__["ROUTER_CONFIGURATION"], { enableTracing: false }, []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_common__WEBPACK_IMPORTED_MODULE_5__["LocationStrategy"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["ɵangular_packages_router_router_d"], [_angular_common__WEBPACK_IMPORTED_MODULE_5__["PlatformLocation"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_5__["APP_BASE_HREF"]], _angular_router__WEBPACK_IMPORTED_MODULE_9__["ROUTER_CONFIGURATION"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_common__WEBPACK_IMPORTED_MODULE_5__["Location"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["Location"], [_angular_common__WEBPACK_IMPORTED_MODULE_5__["LocationStrategy"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["PlatformLocation"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["Compiler"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Compiler"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleFactoryLoader"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["SystemJsNgModuleLoader"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["Compiler"], [2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["SystemJsNgModuleLoaderConfig"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_router__WEBPACK_IMPORTED_MODULE_9__["ROUTES"], function () { return [[{ path: _common_enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_12__["MainRoutes"].base3d, loadChildren: _app_routing_module__WEBPACK_IMPORTED_MODULE_13__["ɵ0"] }, { path: _common_enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_12__["MainRoutes"].threeOptimized, loadChildren: _app_routing_module__WEBPACK_IMPORTED_MODULE_13__["ɵ1"] }, { path: _common_enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_12__["MainRoutes"].threeBasics, loadChildren: _app_routing_module__WEBPACK_IMPORTED_MODULE_13__["ɵ2"] }, { path: _common_enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_12__["MainRoutes"].canvas, loadChildren: _app_routing_module__WEBPACK_IMPORTED_MODULE_13__["ɵ3"] }, { path: _common_enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_12__["MainRoutes"].globeVisualization, loadChildren: _app_routing_module__WEBPACK_IMPORTED_MODULE_13__["ɵ4"] }, { path: _common_enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_12__["MainRoutes"].forceGraph, loadChildren: _app_routing_module__WEBPACK_IMPORTED_MODULE_13__["ɵ5"] }, { path: _common_enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_12__["MainRoutes"].networkGraph, loadChildren: _app_routing_module__WEBPACK_IMPORTED_MODULE_13__["ɵ6"] }, { path: "", redirectTo: "three-optimized", pathMatch: "full" }]]; }, []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["ɵangular_packages_router_router_f"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationRef"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["UrlSerializer"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["ChildrenOutletContexts"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["Location"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleFactoryLoader"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Compiler"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["ROUTES"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["ROUTER_CONFIGURATION"], [2, _angular_router__WEBPACK_IMPORTED_MODULE_9__["UrlHandlingStrategy"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_9__["RouteReuseStrategy"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_router__WEBPACK_IMPORTED_MODULE_9__["RouterModule"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["RouterModule"], [[2, _angular_router__WEBPACK_IMPORTED_MODULE_9__["ɵangular_packages_router_router_a"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _app_routing_module__WEBPACK_IMPORTED_MODULE_13__["AppRoutingModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_13__["AppRoutingModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["BrowserAnimationsModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["BrowserAnimationsModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_14__["BidiModule"], _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_14__["BidiModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_15__["MatCommonModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_15__["MatCommonModule"], [[2, _angular_material_core__WEBPACK_IMPORTED_MODULE_15__["MATERIAL_SANITY_CHECKS"]], [2, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["HAMMER_LOADER"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__["MatIconModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__["MatIconModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_17__["MatToolbarModule"], _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_17__["MatToolbarModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_18__["PlatformModule"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_18__["PlatformModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_core__WEBPACK_IMPORTED_MODULE_15__["MatRippleModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_15__["MatRippleModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_material_button__WEBPACK_IMPORTED_MODULE_19__["MatButtonModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_19__["MatButtonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["HttpClientXsrfModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["HttpClientXsrfModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["HttpClientModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["HttpClientModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _app_module__WEBPACK_IMPORTED_MODULE_1__["AppModule"], _app_module__WEBPACK_IMPORTED_MODULE_1__["AppModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵAPP_ROOT"], true, []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["ANIMATION_MODULE_TYPE"], "BrowserAnimations", []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_common_http_http_e"], "XSRF-TOKEN", []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](256, _angular_common_http__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_common_http_http_f"], "X-XSRF-TOKEN", [])]); });



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
class AppModule {
}


/***/ }),

/***/ "./src/app/common/components/menu-primary/menu-primary.component.ngfactory.js":
/*!************************************************************************************!*\
  !*** ./src/app/common/components/menu-primary/menu-primary.component.ngfactory.js ***!
  \************************************************************************************/
/*! exports provided: RenderType_MenuPrimaryComponent, View_MenuPrimaryComponent_0, View_MenuPrimaryComponent_Host_0, MenuPrimaryComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_MenuPrimaryComponent", function() { return RenderType_MenuPrimaryComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_MenuPrimaryComponent_0", function() { return View_MenuPrimaryComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_MenuPrimaryComponent_Host_0", function() { return View_MenuPrimaryComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuPrimaryComponentNgFactory", function() { return MenuPrimaryComponentNgFactory; });
/* harmony import */ var _menu_primary_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu-primary.component.scss.shim.ngstyle */ "./src/app/common/components/menu-primary/menu-primary.component.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _menu_primary_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./menu-primary.component */ "./src/app/common/components/menu-primary/menu-primary.component.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 





var styles_MenuPrimaryComponent = [_menu_primary_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_MenuPrimaryComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_MenuPrimaryComponent, data: {} });

function View_MenuPrimaryComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 56, "nav", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 7, "a", [], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](2, 671744, [[2, 4]], 0, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["LocationStrategy"]], { routerLink: [0, "routerLink"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](3, 1), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](4, 1720320, null, 2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkActive"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]]], { routerLinkActive: [0, "routerLinkActive"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 1, { links: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 2, { linksWithHrefs: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](7, 1), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Network Graph "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](9, 0, null, null, 7, "a", [], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](10, 671744, [[4, 4]], 0, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["LocationStrategy"]], { routerLink: [0, "routerLink"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](11, 1), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](12, 1720320, null, 2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkActive"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]]], { routerLinkActive: [0, "routerLinkActive"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 3, { links: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 4, { linksWithHrefs: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](15, 1), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Three Instancing "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](17, 0, null, null, 7, "a", [], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](18, 671744, [[6, 4]], 0, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["LocationStrategy"]], { routerLink: [0, "routerLink"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](19, 1), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](20, 1720320, null, 2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkActive"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]]], { routerLinkActive: [0, "routerLinkActive"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 5, { links: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 6, { linksWithHrefs: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](23, 1), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Three Js Basics"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](25, 0, null, null, 7, "a", [], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](26, 671744, [[8, 4]], 0, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["LocationStrategy"]], { routerLink: [0, "routerLink"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](27, 1), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](28, 1720320, null, 2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkActive"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]]], { routerLinkActive: [0, "routerLinkActive"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 7, { links: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 8, { linksWithHrefs: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](31, 1), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" US Regions on Globe "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](33, 0, null, null, 7, "a", [], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](34, 671744, [[10, 4]], 0, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["LocationStrategy"]], { routerLink: [0, "routerLink"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](35, 1), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](36, 1720320, null, 2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkActive"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]]], { routerLinkActive: [0, "routerLinkActive"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 9, { links: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 10, { linksWithHrefs: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](39, 1), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" 3D Force Graph "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](41, 0, null, null, 7, "a", [], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 42).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](42, 671744, [[12, 4]], 0, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["LocationStrategy"]], { routerLink: [0, "routerLink"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](43, 1), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](44, 1720320, null, 2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkActive"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]]], { routerLinkActive: [0, "routerLinkActive"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 11, { links: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 12, { linksWithHrefs: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](47, 1), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Canvas "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](49, 0, null, null, 7, "a", [], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 50).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](50, 671744, [[14, 4]], 0, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["LocationStrategy"]], { routerLink: [0, "routerLink"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](51, 1), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](52, 1720320, null, 2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkActive"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]]], { routerLinkActive: [0, "routerLinkActive"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 13, { links: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 14, { linksWithHrefs: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](55, 1), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Base 3D "]))], function (_ck, _v) { var _co = _v.component; var currVal_2 = _ck(_v, 3, 0, ("/" + _co.MAIN_ROUTES_DOM_REF.networkGraph)); _ck(_v, 2, 0, currVal_2); var currVal_3 = _ck(_v, 7, 0, "selected"); _ck(_v, 4, 0, currVal_3); var currVal_6 = _ck(_v, 11, 0, ("/" + _co.MAIN_ROUTES_DOM_REF.threeOptimized)); _ck(_v, 10, 0, currVal_6); var currVal_7 = _ck(_v, 15, 0, "selected"); _ck(_v, 12, 0, currVal_7); var currVal_10 = _ck(_v, 19, 0, ("/" + _co.MAIN_ROUTES_DOM_REF.threeBasics)); _ck(_v, 18, 0, currVal_10); var currVal_11 = _ck(_v, 23, 0, "selected"); _ck(_v, 20, 0, currVal_11); var currVal_14 = _ck(_v, 27, 0, ("/" + _co.MAIN_ROUTES_DOM_REF.globeVisualization)); _ck(_v, 26, 0, currVal_14); var currVal_15 = _ck(_v, 31, 0, "selected"); _ck(_v, 28, 0, currVal_15); var currVal_18 = _ck(_v, 35, 0, ("/" + _co.MAIN_ROUTES_DOM_REF.forceGraph)); _ck(_v, 34, 0, currVal_18); var currVal_19 = _ck(_v, 39, 0, "selected"); _ck(_v, 36, 0, currVal_19); var currVal_22 = _ck(_v, 43, 0, ("/" + _co.MAIN_ROUTES_DOM_REF.canvas)); _ck(_v, 42, 0, currVal_22); var currVal_23 = _ck(_v, 47, 0, "selected"); _ck(_v, 44, 0, currVal_23); var currVal_26 = _ck(_v, 51, 0, ("/" + _co.MAIN_ROUTES_DOM_REF.base3d)); _ck(_v, 50, 0, currVal_26); var currVal_27 = _ck(_v, 55, 0, "selected"); _ck(_v, 52, 0, currVal_27); }, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).target; var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 2).href; _ck(_v, 1, 0, currVal_0, currVal_1); var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10).target; var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 10).href; _ck(_v, 9, 0, currVal_4, currVal_5); var currVal_8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).target; var currVal_9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 18).href; _ck(_v, 17, 0, currVal_8, currVal_9); var currVal_12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26).target; var currVal_13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 26).href; _ck(_v, 25, 0, currVal_12, currVal_13); var currVal_16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).target; var currVal_17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 34).href; _ck(_v, 33, 0, currVal_16, currVal_17); var currVal_20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 42).target; var currVal_21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 42).href; _ck(_v, 41, 0, currVal_20, currVal_21); var currVal_24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 50).target; var currVal_25 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 50).href; _ck(_v, 49, 0, currVal_24, currVal_25); }); }
function View_MenuPrimaryComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-menu-primary", [], null, null, null, View_MenuPrimaryComponent_0, RenderType_MenuPrimaryComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, _menu_primary_component__WEBPACK_IMPORTED_MODULE_4__["MenuPrimaryComponent"], [], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var MenuPrimaryComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-menu-primary", _menu_primary_component__WEBPACK_IMPORTED_MODULE_4__["MenuPrimaryComponent"], View_MenuPrimaryComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/common/components/menu-primary/menu-primary.component.scss.shim.ngstyle.js":
/*!********************************************************************************************!*\
  !*** ./src/app/common/components/menu-primary/menu-primary.component.scss.shim.ngstyle.js ***!
  \********************************************************************************************/
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
var styles = ["nav[_ngcontent-%COMP%] {\n  display: -webkit-box;\n  display: flex;\n  margin-top: 10px;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\nnav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  flex-basis: 30%;\n  text-decoration: none;\n  padding: 5px;\n  border: solid 1px;\n  text-align: center;\n}\nnav[_ngcontent-%COMP%]   a.selected[_ngcontent-%COMP%] {\n  background-image: -webkit-gradient(linear, left top, left bottom, from(#ffffff), color-stop(75%, #f3f3f3), to(#c2c7de));\n  background-image: linear-gradient(180deg, #ffffff 0%, #f3f3f3 75%, #c2c7de 100%);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zdW1pdC5rdW1hci9Xb3Jrc3BhY2UvZ2l0aHViL3NvdXJjZWNvZGUvVGhyZWVKc1ByaW1lci9zcmMvYXBwL2NvbW1vbi9jb21wb25lbnRzL21lbnUtcHJpbWFyeS9tZW51LXByaW1hcnkuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NvbW1vbi9jb21wb25lbnRzL21lbnUtcHJpbWFyeS9tZW51LXByaW1hcnkuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFDQSxnQkFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7QUNDSjtBREFJO0VBQ0ksZUFBQTtFQUNBLHFCQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7QUNFUjtBREFJO0VBQ0ksdUhBQUE7RUFBQSxnRkFBQTtBQ0VSIiwiZmlsZSI6InNyYy9hcHAvY29tbW9uL2NvbXBvbmVudHMvbWVudS1wcmltYXJ5L21lbnUtcHJpbWFyeS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIm5hdiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBhIHtcbiAgICAgICAgZmxleC1iYXNpczogMzAlO1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICAgIHBhZGRpbmc6IDVweDtcbiAgICAgICAgYm9yZGVyOiBzb2xpZCAxcHg7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB9XG4gICAgYS5zZWxlY3RlZHtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgI2ZmZmZmZiAwJSwgI2YzZjNmMyA3NSUsICNjMmM3ZGUgMTAwJSk7O1xuICAgIH1cbn0iLCJuYXYge1xuICBkaXNwbGF5OiBmbGV4O1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5uYXYgYSB7XG4gIGZsZXgtYmFzaXM6IDMwJTtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBwYWRkaW5nOiA1cHg7XG4gIGJvcmRlcjogc29saWQgMXB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5uYXYgYS5zZWxlY3RlZCB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCgxODBkZWcsICNmZmZmZmYgMCUsICNmM2YzZjMgNzUlLCAjYzJjN2RlIDEwMCUpO1xufSJdfQ== */"];



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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../enums/main-routes.enum */ "./src/app/common/enums/main-routes.enum.ts");


class MenuPrimaryComponent {
    constructor() {
        this.MAIN_ROUTES_DOM_REF = _enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_1__["MainRoutes"];
    }
    ngOnInit() { }
}


/***/ }),

/***/ "./src/app/common/components/menu-secondary/menu-secondary.component.ngfactory.js":
/*!****************************************************************************************!*\
  !*** ./src/app/common/components/menu-secondary/menu-secondary.component.ngfactory.js ***!
  \****************************************************************************************/
/*! exports provided: RenderType_MenuSecondaryComponent, View_MenuSecondaryComponent_0, View_MenuSecondaryComponent_Host_0, MenuSecondaryComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_MenuSecondaryComponent", function() { return RenderType_MenuSecondaryComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_MenuSecondaryComponent_0", function() { return View_MenuSecondaryComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_MenuSecondaryComponent_Host_0", function() { return View_MenuSecondaryComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuSecondaryComponentNgFactory", function() { return MenuSecondaryComponentNgFactory; });
/* harmony import */ var _menu_secondary_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu-secondary.component.scss.shim.ngstyle */ "./src/app/common/components/menu-secondary/menu-secondary.component.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _menu_secondary_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./menu-secondary.component */ "./src/app/common/components/menu-secondary/menu-secondary.component.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 





var styles_MenuSecondaryComponent = [_menu_secondary_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_MenuSecondaryComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_MenuSecondaryComponent, data: {} });

function View_MenuSecondaryComponent_1(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 17, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 16, "nav", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, null, 7, "a", [], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](3, 671744, [[2, 4]], 0, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["LocationStrategy"]], { routerLink: [0, "routerLink"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](4, 2), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](5, 1720320, null, 2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkActive"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]]], { routerLinkActive: [0, "routerLinkActive"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 1, { links: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 2, { linksWithHrefs: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](8, 1), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Custom Geometry "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](10, 0, null, null, 7, "a", [], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](11, 671744, [[4, 4]], 0, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["LocationStrategy"]], { routerLink: [0, "routerLink"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](12, 2), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](13, 1720320, null, 2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkActive"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]]], { routerLinkActive: [0, "routerLinkActive"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 3, { links: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 4, { linksWithHrefs: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](16, 1), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Animations "]))], function (_ck, _v) { var _co = _v.component; var currVal_2 = _ck(_v, 4, 0, _co.MAIN_ROUTES_DOM_REF.base3d, _co.BASE_3D_ROUTES.customGeometry); _ck(_v, 3, 0, currVal_2); var currVal_3 = _ck(_v, 8, 0, "selected"); _ck(_v, 5, 0, currVal_3); var currVal_6 = _ck(_v, 12, 0, _co.MAIN_ROUTES_DOM_REF.base3d, _co.BASE_3D_ROUTES.animations); _ck(_v, 11, 0, currVal_6); var currVal_7 = _ck(_v, 16, 0, "selected"); _ck(_v, 13, 0, currVal_7); }, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).target; var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).href; _ck(_v, 2, 0, currVal_0, currVal_1); var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11).target; var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11).href; _ck(_v, 10, 0, currVal_4, currVal_5); }); }
function View_MenuSecondaryComponent_2(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 0, "div", [], null, null, null, null, null))], null, null); }
function View_MenuSecondaryComponent_3(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 0, "div", [], null, null, null, null, null))], null, null); }
function View_MenuSecondaryComponent_4(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 9, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 8, "nav", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, null, 7, "a", [], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](3, 671744, [[6, 4]], 0, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["LocationStrategy"]], { routerLink: [0, "routerLink"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](4, 2), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](5, 1720320, null, 2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkActive"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]]], { routerLinkActive: [0, "routerLinkActive"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 5, { links: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 6, { linksWithHrefs: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](8, 1), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Group Layout "]))], function (_ck, _v) { var _co = _v.component; var currVal_2 = _ck(_v, 4, 0, _co.MAIN_ROUTES_DOM_REF.networkGraph, _co.NETWORK_GRAPH_ROUTES.groupLayout); _ck(_v, 3, 0, currVal_2); var currVal_3 = _ck(_v, 8, 0, "selected"); _ck(_v, 5, 0, currVal_3); }, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).target; var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).href; _ck(_v, 2, 0, currVal_0, currVal_1); }); }
function View_MenuSecondaryComponent_5(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 17, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 16, "nav", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, null, 7, "a", [], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](3, 671744, [[8, 4]], 0, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["LocationStrategy"]], { routerLink: [0, "routerLink"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](4, 2), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](5, 1720320, null, 2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkActive"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]]], { routerLinkActive: [0, "routerLinkActive"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 7, { links: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 8, { linksWithHrefs: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](8, 1), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" globe raycaster "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](10, 0, null, null, 7, "a", [], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](11, 671744, [[10, 4]], 0, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["LocationStrategy"]], { routerLink: [0, "routerLink"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](12, 2), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](13, 1720320, null, 2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkActive"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]]], { routerLinkActive: [0, "routerLinkActive"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 9, { links: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 10, { linksWithHrefs: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](16, 1), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" globe gl package "]))], function (_ck, _v) { var _co = _v.component; var currVal_2 = _ck(_v, 4, 0, _co.MAIN_ROUTES_DOM_REF.globeVisualization, _co.GLOBE_MODULE_ROUTES.globeRaycaster); _ck(_v, 3, 0, currVal_2); var currVal_3 = _ck(_v, 8, 0, "selected"); _ck(_v, 5, 0, currVal_3); var currVal_6 = _ck(_v, 12, 0, _co.MAIN_ROUTES_DOM_REF.globeVisualization, _co.GLOBE_MODULE_ROUTES.globeGlPackage); _ck(_v, 11, 0, currVal_6); var currVal_7 = _ck(_v, 16, 0, "selected"); _ck(_v, 13, 0, currVal_7); }, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).target; var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).href; _ck(_v, 2, 0, currVal_0, currVal_1); var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11).target; var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11).href; _ck(_v, 10, 0, currVal_4, currVal_5); }); }
function View_MenuSecondaryComponent_6(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 49, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 48, "nav", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, null, 7, "a", [], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](3, 671744, [[12, 4]], 0, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["LocationStrategy"]], { routerLink: [0, "routerLink"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](4, 2), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](5, 1720320, null, 2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkActive"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]]], { routerLinkActive: [0, "routerLinkActive"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 11, { links: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 12, { linksWithHrefs: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](8, 1), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" three Globe 2D "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](10, 0, null, null, 7, "a", [], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](11, 671744, [[14, 4]], 0, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["LocationStrategy"]], { routerLink: [0, "routerLink"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](12, 2), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](13, 1720320, null, 2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkActive"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]]], { routerLinkActive: [0, "routerLinkActive"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 13, { links: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 14, { linksWithHrefs: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](16, 1), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" three Globe 3d "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](18, 0, null, null, 7, "a", [], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](19, 671744, [[16, 4]], 0, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["LocationStrategy"]], { routerLink: [0, "routerLink"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](20, 2), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](21, 1720320, null, 2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkActive"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]]], { routerLinkActive: [0, "routerLinkActive"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 15, { links: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 16, { linksWithHrefs: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](24, 1), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" globe Package "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](26, 0, null, null, 7, "a", [], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](27, 671744, [[18, 4]], 0, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["LocationStrategy"]], { routerLink: [0, "routerLink"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](28, 2), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](29, 1720320, null, 2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkActive"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]]], { routerLinkActive: [0, "routerLinkActive"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 17, { links: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 18, { linksWithHrefs: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](32, 1), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" globe Countries "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](34, 0, null, null, 7, "a", [], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](35, 671744, [[20, 4]], 0, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["LocationStrategy"]], { routerLink: [0, "routerLink"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](36, 2), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](37, 1720320, null, 2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkActive"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]]], { routerLinkActive: [0, "routerLinkActive"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 19, { links: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 20, { linksWithHrefs: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](40, 1), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" connected Nodes "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](42, 0, null, null, 7, "a", [], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 43).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](43, 671744, [[22, 4]], 0, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["LocationStrategy"]], { routerLink: [0, "routerLink"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](44, 2), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](45, 1720320, null, 2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkActive"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]]], { routerLinkActive: [0, "routerLinkActive"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 21, { links: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 22, { linksWithHrefs: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](48, 1), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" object3d /Group "]))], function (_ck, _v) { var _co = _v.component; var currVal_2 = _ck(_v, 4, 0, _co.MAIN_ROUTES_DOM_REF.threeBasics, _co.THREE_MODULE_ROUTES.threeGlobeComponent); _ck(_v, 3, 0, currVal_2); var currVal_3 = _ck(_v, 8, 0, "selected"); _ck(_v, 5, 0, currVal_3); var currVal_6 = _ck(_v, 12, 0, _co.MAIN_ROUTES_DOM_REF.threeBasics, _co.THREE_MODULE_ROUTES.threeGlobe3dComponent); _ck(_v, 11, 0, currVal_6); var currVal_7 = _ck(_v, 16, 0, "selected"); _ck(_v, 13, 0, currVal_7); var currVal_10 = _ck(_v, 20, 0, _co.MAIN_ROUTES_DOM_REF.threeBasics, _co.THREE_MODULE_ROUTES.globePackageComponent); _ck(_v, 19, 0, currVal_10); var currVal_11 = _ck(_v, 24, 0, "selected"); _ck(_v, 21, 0, currVal_11); var currVal_14 = _ck(_v, 28, 0, _co.MAIN_ROUTES_DOM_REF.threeBasics, _co.THREE_MODULE_ROUTES.globeCounteriesComponent); _ck(_v, 27, 0, currVal_14); var currVal_15 = _ck(_v, 32, 0, "selected"); _ck(_v, 29, 0, currVal_15); var currVal_18 = _ck(_v, 36, 0, _co.MAIN_ROUTES_DOM_REF.threeBasics, _co.THREE_MODULE_ROUTES.connectedNodesComponent); _ck(_v, 35, 0, currVal_18); var currVal_19 = _ck(_v, 40, 0, "selected"); _ck(_v, 37, 0, currVal_19); var currVal_22 = _ck(_v, 44, 0, _co.MAIN_ROUTES_DOM_REF.threeBasics, _co.THREE_MODULE_ROUTES.objectGroupComponent); _ck(_v, 43, 0, currVal_22); var currVal_23 = _ck(_v, 48, 0, "selected"); _ck(_v, 45, 0, currVal_23); }, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).target; var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).href; _ck(_v, 2, 0, currVal_0, currVal_1); var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11).target; var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11).href; _ck(_v, 10, 0, currVal_4, currVal_5); var currVal_8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19).target; var currVal_9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19).href; _ck(_v, 18, 0, currVal_8, currVal_9); var currVal_12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).target; var currVal_13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).href; _ck(_v, 26, 0, currVal_12, currVal_13); var currVal_16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).target; var currVal_17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).href; _ck(_v, 34, 0, currVal_16, currVal_17); var currVal_20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 43).target; var currVal_21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 43).href; _ck(_v, 42, 0, currVal_20, currVal_21); }); }
function View_MenuSecondaryComponent_7(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 41, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](1, 0, null, null, 40, "nav", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, null, null, 7, "a", [], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](3, 671744, [[24, 4]], 0, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["LocationStrategy"]], { routerLink: [0, "routerLink"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](4, 2), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](5, 1720320, null, 2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkActive"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]]], { routerLinkActive: [0, "routerLinkActive"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 23, { links: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 24, { linksWithHrefs: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](8, 1), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Unoptimized cubes "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](10, 0, null, null, 7, "a", [], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](11, 671744, [[26, 4]], 0, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["LocationStrategy"]], { routerLink: [0, "routerLink"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](12, 2), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](13, 1720320, null, 2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkActive"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]]], { routerLinkActive: [0, "routerLinkActive"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 25, { links: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 26, { linksWithHrefs: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](16, 1), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" WebGl Shaders "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](18, 0, null, null, 7, "a", [], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](19, 671744, [[28, 4]], 0, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["LocationStrategy"]], { routerLink: [0, "routerLink"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](20, 2), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](21, 1720320, null, 2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkActive"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]]], { routerLinkActive: [0, "routerLinkActive"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 27, { links: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 28, { linksWithHrefs: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](24, 1), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Three Instancing "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](26, 0, null, null, 7, "a", [], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](27, 671744, [[30, 4]], 0, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["LocationStrategy"]], { routerLink: [0, "routerLink"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](28, 2), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](29, 1720320, null, 2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkActive"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]]], { routerLinkActive: [0, "routerLinkActive"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 29, { links: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 30, { linksWithHrefs: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](32, 1), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Instancing Raycast "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](34, 0, null, null, 7, "a", [], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](35, 671744, [[32, 4]], 0, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["LocationStrategy"]], { routerLink: [0, "routerLink"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](36, 2), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](37, 1720320, null, 2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkActive"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]]], { routerLinkActive: [0, "routerLinkActive"] }, null), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 31, { links: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](603979776, 32, { linksWithHrefs: 1 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵpad"](40, 1), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Instancing Layout "]))], function (_ck, _v) { var _co = _v.component; var currVal_2 = _ck(_v, 4, 0, _co.MAIN_ROUTES_DOM_REF.threeOptimized, _co.THREE_OPTIMIZED_ROUTES.unoptimizedCubes); _ck(_v, 3, 0, currVal_2); var currVal_3 = _ck(_v, 8, 0, "selected"); _ck(_v, 5, 0, currVal_3); var currVal_6 = _ck(_v, 12, 0, _co.MAIN_ROUTES_DOM_REF.threeOptimized, _co.THREE_OPTIMIZED_ROUTES.webglShaders); _ck(_v, 11, 0, currVal_6); var currVal_7 = _ck(_v, 16, 0, "selected"); _ck(_v, 13, 0, currVal_7); var currVal_10 = _ck(_v, 20, 0, _co.MAIN_ROUTES_DOM_REF.threeOptimized, _co.THREE_OPTIMIZED_ROUTES.instancingBasic); _ck(_v, 19, 0, currVal_10); var currVal_11 = _ck(_v, 24, 0, "selected"); _ck(_v, 21, 0, currVal_11); var currVal_14 = _ck(_v, 28, 0, _co.MAIN_ROUTES_DOM_REF.threeOptimized, _co.THREE_OPTIMIZED_ROUTES.instancingRaycast); _ck(_v, 27, 0, currVal_14); var currVal_15 = _ck(_v, 32, 0, "selected"); _ck(_v, 29, 0, currVal_15); var currVal_18 = _ck(_v, 36, 0, _co.MAIN_ROUTES_DOM_REF.threeOptimized, _co.THREE_OPTIMIZED_ROUTES.instancingLayout); _ck(_v, 35, 0, currVal_18); var currVal_19 = _ck(_v, 40, 0, "selected"); _ck(_v, 37, 0, currVal_19); }, function (_ck, _v) { var currVal_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).target; var currVal_1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 3).href; _ck(_v, 2, 0, currVal_0, currVal_1); var currVal_4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11).target; var currVal_5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 11).href; _ck(_v, 10, 0, currVal_4, currVal_5); var currVal_8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19).target; var currVal_9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 19).href; _ck(_v, 18, 0, currVal_8, currVal_9); var currVal_12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).target; var currVal_13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 27).href; _ck(_v, 26, 0, currVal_12, currVal_13); var currVal_16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).target; var currVal_17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵnov"](_v, 35).href; _ck(_v, 34, 0, currVal_16, currVal_17); }); }
function View_MenuSecondaryComponent_8(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["output2"]))], null, null); }
function View_MenuSecondaryComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 17, "div", [], null, null, null, null, null)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgSwitch"], [], { ngSwitch: [0, "ngSwitch"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_MenuSecondaryComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](3, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgSwitchCase"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgSwitch"]], { ngSwitchCase: [0, "ngSwitchCase"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_MenuSecondaryComponent_2)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](5, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgSwitchCase"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgSwitch"]], { ngSwitchCase: [0, "ngSwitchCase"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_MenuSecondaryComponent_3)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](7, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgSwitchCase"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgSwitch"]], { ngSwitchCase: [0, "ngSwitchCase"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_MenuSecondaryComponent_4)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](9, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgSwitchCase"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgSwitch"]], { ngSwitchCase: [0, "ngSwitchCase"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_MenuSecondaryComponent_5)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](11, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgSwitchCase"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgSwitch"]], { ngSwitchCase: [0, "ngSwitchCase"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_MenuSecondaryComponent_6)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](13, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgSwitchCase"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgSwitch"]], { ngSwitchCase: [0, "ngSwitchCase"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_MenuSecondaryComponent_7)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](15, 278528, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgSwitchCase"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgSwitch"]], { ngSwitchCase: [0, "ngSwitchCase"] }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵand"](16777216, null, null, 1, null, View_MenuSecondaryComponent_8)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](17, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgSwitchDefault"], [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgSwitch"]], null, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.currentMainRoute; _ck(_v, 1, 0, currVal_0); var currVal_1 = _co.MAIN_ROUTES_DOM_REF.base3d; _ck(_v, 3, 0, currVal_1); var currVal_2 = _co.MAIN_ROUTES_DOM_REF.forceGraph; _ck(_v, 5, 0, currVal_2); var currVal_3 = _co.MAIN_ROUTES_DOM_REF.canvas; _ck(_v, 7, 0, currVal_3); var currVal_4 = _co.MAIN_ROUTES_DOM_REF.networkGraph; _ck(_v, 9, 0, currVal_4); var currVal_5 = _co.MAIN_ROUTES_DOM_REF.globeVisualization; _ck(_v, 11, 0, currVal_5); var currVal_6 = _co.MAIN_ROUTES_DOM_REF.threeBasics; _ck(_v, 13, 0, currVal_6); var currVal_7 = _co.MAIN_ROUTES_DOM_REF.threeOptimized; _ck(_v, 15, 0, currVal_7); }, null); }
function View_MenuSecondaryComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-menu-secondary", [], null, null, null, View_MenuSecondaryComponent_0, RenderType_MenuSecondaryComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 114688, null, 0, _menu_secondary_component__WEBPACK_IMPORTED_MODULE_4__["MenuSecondaryComponent"], [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var MenuSecondaryComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-menu-secondary", _menu_secondary_component__WEBPACK_IMPORTED_MODULE_4__["MenuSecondaryComponent"], View_MenuSecondaryComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/common/components/menu-secondary/menu-secondary.component.scss.shim.ngstyle.js":
/*!************************************************************************************************!*\
  !*** ./src/app/common/components/menu-secondary/menu-secondary.component.scss.shim.ngstyle.js ***!
  \************************************************************************************************/
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
var styles = ["nav[_ngcontent-%COMP%] {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  margin-top: 10px;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n}\nnav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  flex-basis: 30%;\n  text-decoration: none;\n  padding: 5px;\n  border: solid 1px;\n  text-align: center;\n}\nnav[_ngcontent-%COMP%]   a.selected[_ngcontent-%COMP%] {\n  background-image: -webkit-gradient(linear, left top, left bottom, from(#ffffff), color-stop(75%, #f3f3f3), to(#c2c7de));\n  background-image: linear-gradient(180deg, #ffffff 0%, #f3f3f3 75%, #c2c7de 100%);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zdW1pdC5rdW1hci9Xb3Jrc3BhY2UvZ2l0aHViL3NvdXJjZWNvZGUvVGhyZWVKc1ByaW1lci9zcmMvYXBwL2NvbW1vbi9jb21wb25lbnRzL21lbnUtc2Vjb25kYXJ5L21lbnUtc2Vjb25kYXJ5LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9jb21tb24vY29tcG9uZW50cy9tZW51LXNlY29uZGFyeS9tZW51LXNlY29uZGFyeS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDRCQUFBO0VBQUEsNkJBQUE7VUFBQSxzQkFBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtBQ0NKO0FEQUk7RUFDSSxlQUFBO0VBQ0EscUJBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtBQ0VSO0FEQUk7RUFDSSx1SEFBQTtFQUFBLGdGQUFBO0FDRVIiLCJmaWxlIjoic3JjL2FwcC9jb21tb24vY29tcG9uZW50cy9tZW51LXNlY29uZGFyeS9tZW51LXNlY29uZGFyeS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIm5hdiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGEge1xuICAgICAgICBmbGV4LWJhc2lzOiAzMCU7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgICAgcGFkZGluZzogNXB4O1xuICAgICAgICBib3JkZXI6IHNvbGlkIDFweDtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIH1cbiAgICBhLnNlbGVjdGVke1xuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjZmZmZmZmIDAlLCAjZjNmM2YzIDc1JSwgI2MyYzdkZSAxMDAlKTs7XG4gICAgfVxufSIsIm5hdiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcbn1cbm5hdiBhIHtcbiAgZmxleC1iYXNpczogMzAlO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIHBhZGRpbmc6IDVweDtcbiAgYm9yZGVyOiBzb2xpZCAxcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbm5hdiBhLnNlbGVjdGVkIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgI2ZmZmZmZiAwJSwgI2YzZjNmMyA3NSUsICNjMmM3ZGUgMTAwJSk7XG59Il19 */"];



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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _enums_base3d_routes_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../enums/base3d-routes.enum */ "./src/app/common/enums/base3d-routes.enum.ts");
/* harmony import */ var _enums_globe_module_routes_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../enums/globe-module-routes.enum */ "./src/app/common/enums/globe-module-routes.enum.ts");
/* harmony import */ var _enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../enums/main-routes.enum */ "./src/app/common/enums/main-routes.enum.ts");
/* harmony import */ var _enums_network_graph_routes_enum__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../enums/network-graph-routes.enum */ "./src/app/common/enums/network-graph-routes.enum.ts");
/* harmony import */ var _enums_three_module_routes_enum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../enums/three-module-routes.enum */ "./src/app/common/enums/three-module-routes.enum.ts");
/* harmony import */ var _enums_three_optimized_routes_enum__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../enums/three-optimized-routes.enum */ "./src/app/common/enums/three-optimized-routes.enum.ts");








class MenuSecondaryComponent {
    constructor(router) {
        this.router = router;
        this.currentMainRoute = "";
        this.THREE_OPTIMIZED_ROUTES = _enums_three_optimized_routes_enum__WEBPACK_IMPORTED_MODULE_7__["ThreeOptimizedRoutes"];
        this.BASE_3D_ROUTES = _enums_base3d_routes_enum__WEBPACK_IMPORTED_MODULE_2__["Base3dRoutes"];
        this.THREE_MODULE_ROUTES = _enums_three_module_routes_enum__WEBPACK_IMPORTED_MODULE_6__["ThreeModuleRoutes"];
        this.GLOBE_MODULE_ROUTES = _enums_globe_module_routes_enum__WEBPACK_IMPORTED_MODULE_3__["GlobeModuleRoutes"];
        this.MAIN_ROUTES_DOM_REF = _enums_main_routes_enum__WEBPACK_IMPORTED_MODULE_4__["MainRoutes"];
        this.NETWORK_GRAPH_ROUTES = _enums_network_graph_routes_enum__WEBPACK_IMPORTED_MODULE_5__["NetworkGraphRoutes"];
    }
    ngOnInit() {
        this.routerSubscription = this.router.events.subscribe((event) => {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"] && event.url) {
                this.currentMainRoute = event.url.split("/")[1] || "three-optimized";
            }
        });
    }
}


/***/ }),

/***/ "./src/app/common/enums/base3d-routes.enum.ts":
/*!****************************************************!*\
  !*** ./src/app/common/enums/base3d-routes.enum.ts ***!
  \****************************************************/
/*! exports provided: Base3dRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Base3dRoutes", function() { return Base3dRoutes; });
var Base3dRoutes;
(function (Base3dRoutes) {
    Base3dRoutes["customGeometry"] = "custom-geometry";
    Base3dRoutes["animations"] = "animations";
})(Base3dRoutes || (Base3dRoutes = {}));


/***/ }),

/***/ "./src/app/common/enums/globe-module-routes.enum.ts":
/*!**********************************************************!*\
  !*** ./src/app/common/enums/globe-module-routes.enum.ts ***!
  \**********************************************************/
/*! exports provided: GlobeModuleRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobeModuleRoutes", function() { return GlobeModuleRoutes; });
var GlobeModuleRoutes;
(function (GlobeModuleRoutes) {
    GlobeModuleRoutes["globeRaycaster"] = "globeRaycasterEvent";
    GlobeModuleRoutes["globeGlPackage"] = "globeGlPackage";
})(GlobeModuleRoutes || (GlobeModuleRoutes = {}));


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
    MainRoutes["threeOptimized"] = "three-optimized";
    MainRoutes["threeBasics"] = "three-basics";
    MainRoutes["globeVisualization"] = "globe-visualization";
    MainRoutes["forceGraph"] = "force-graph";
    MainRoutes["canvas"] = "canvas";
    MainRoutes["base3d"] = "base3d";
    MainRoutes["networkGraph"] = "network-graph";
})(MainRoutes || (MainRoutes = {}));


/***/ }),

/***/ "./src/app/common/enums/network-graph-routes.enum.ts":
/*!***********************************************************!*\
  !*** ./src/app/common/enums/network-graph-routes.enum.ts ***!
  \***********************************************************/
/*! exports provided: NetworkGraphRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetworkGraphRoutes", function() { return NetworkGraphRoutes; });
var NetworkGraphRoutes;
(function (NetworkGraphRoutes) {
    NetworkGraphRoutes["groupLayout"] = "group-layout";
})(NetworkGraphRoutes || (NetworkGraphRoutes = {}));


/***/ }),

/***/ "./src/app/common/enums/three-module-routes.enum.ts":
/*!**********************************************************!*\
  !*** ./src/app/common/enums/three-module-routes.enum.ts ***!
  \**********************************************************/
/*! exports provided: ThreeModuleRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThreeModuleRoutes", function() { return ThreeModuleRoutes; });
var ThreeModuleRoutes;
(function (ThreeModuleRoutes) {
    ThreeModuleRoutes["threeGlobeComponent"] = "threeGlobe";
    ThreeModuleRoutes["threeGlobe3dComponent"] = "threeGlobe3d";
    ThreeModuleRoutes["globePackageComponent"] = "GlobePackage";
    ThreeModuleRoutes["globeCounteriesComponent"] = "GlobeCountries";
    ThreeModuleRoutes["connectedNodesComponent"] = "ConnectedNodes";
    ThreeModuleRoutes["objectGroupComponent"] = "ObjectGroup";
    ThreeModuleRoutes["instanceMeshComponent"] = "InstanceMesh";
})(ThreeModuleRoutes || (ThreeModuleRoutes = {}));


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
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_app_module_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module.ngfactory */ "./src/app/app.module.ngfactory.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModuleFactory(_app_app_module_ngfactory__WEBPACK_IMPORTED_MODULE_2__["AppModuleNgFactory"])
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