(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["three-optimized-three-optimized-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/three-optimized/components/instance-mesh/instance-mesh.component.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/three-optimized/components/instance-mesh/instance-mesh.component.html ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>instance-mesh works!</p>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/three-optimized/components/three-optimized/three-optimized.component.html":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/three-optimized/components/three-optimized/three-optimized.component.html ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-unoptimized-cubes></app-unoptimized-cubes>\n<!-- <app-instance-mesh></app-instance-mesh> -->"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/three-optimized/components/unoptimized-cubes/unoptimized-cubes.component.html":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/three-optimized/components/unoptimized-cubes/unoptimized-cubes.component.html ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h3>UnOptimized cubes</h3>\n<canvas height=\"500\" width=\"1000\" #canvasEl (mousemove)=\"mouseMoveHandler($event)\"></canvas>\n"

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

/***/ "./src/app/three-optimized/components/instance-mesh/instance-mesh.component.scss":
/*!***************************************************************************************!*\
  !*** ./src/app/three-optimized/components/instance-mesh/instance-mesh.component.scss ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3RocmVlLW9wdGltaXplZC9jb21wb25lbnRzL2luc3RhbmNlLW1lc2gvaW5zdGFuY2UtbWVzaC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/three-optimized/components/instance-mesh/instance-mesh.component.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/three-optimized/components/instance-mesh/instance-mesh.component.ts ***!
  \*************************************************************************************/
/*! exports provided: InstanceMeshComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstanceMeshComponent", function() { return InstanceMeshComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let InstanceMeshComponent = class InstanceMeshComponent {
    constructor() { }
    ngOnInit() {
    }
};
InstanceMeshComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-instance-mesh',
        template: __webpack_require__(/*! raw-loader!./instance-mesh.component.html */ "./node_modules/raw-loader/index.js!./src/app/three-optimized/components/instance-mesh/instance-mesh.component.html"),
        styles: [__webpack_require__(/*! ./instance-mesh.component.scss */ "./src/app/three-optimized/components/instance-mesh/instance-mesh.component.scss")]
    })
], InstanceMeshComponent);



/***/ }),

/***/ "./src/app/three-optimized/components/three-optimized/three-optimized.component.scss":
/*!*******************************************************************************************!*\
  !*** ./src/app/three-optimized/components/three-optimized/three-optimized.component.scss ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3RocmVlLW9wdGltaXplZC9jb21wb25lbnRzL3RocmVlLW9wdGltaXplZC90aHJlZS1vcHRpbWl6ZWQuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/three-optimized/components/three-optimized/three-optimized.component.ts":
/*!*****************************************************************************************!*\
  !*** ./src/app/three-optimized/components/three-optimized/three-optimized.component.ts ***!
  \*****************************************************************************************/
/*! exports provided: ThreeOptimizedComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThreeOptimizedComponent", function() { return ThreeOptimizedComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let ThreeOptimizedComponent = class ThreeOptimizedComponent {
    constructor() { }
    ngOnInit() {
    }
};
ThreeOptimizedComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-three-optimized',
        template: __webpack_require__(/*! raw-loader!./three-optimized.component.html */ "./node_modules/raw-loader/index.js!./src/app/three-optimized/components/three-optimized/three-optimized.component.html"),
        styles: [__webpack_require__(/*! ./three-optimized.component.scss */ "./src/app/three-optimized/components/three-optimized/three-optimized.component.scss")]
    })
], ThreeOptimizedComponent);



/***/ }),

/***/ "./src/app/three-optimized/components/unoptimized-cubes/unoptimized-cubes.component.scss":
/*!***********************************************************************************************!*\
  !*** ./src/app/three-optimized/components/unoptimized-cubes/unoptimized-cubes.component.scss ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3RocmVlLW9wdGltaXplZC9jb21wb25lbnRzL3Vub3B0aW1pemVkLWN1YmVzL3Vub3B0aW1pemVkLWN1YmVzLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/three-optimized/components/unoptimized-cubes/unoptimized-cubes.component.ts":
/*!*********************************************************************************************!*\
  !*** ./src/app/three-optimized/components/unoptimized-cubes/unoptimized-cubes.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: UnoptimizedCubesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnoptimizedCubesComponent", function() { return UnoptimizedCubesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_three_services_three_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/three/services/three.service */ "./src/app/three/services/three.service.ts");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _node_modules_stats_js_build_stats_min_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../node_modules/stats.js/build/stats.min.js */ "./node_modules/stats.js/build/stats.min.js");
/* harmony import */ var _node_modules_stats_js_build_stats_min_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_stats_js_build_stats_min_js__WEBPACK_IMPORTED_MODULE_4__);





let UnoptimizedCubesComponent = class UnoptimizedCubesComponent {
    constructor(threeService) {
        this.threeService = threeService;
        this.mouse = new three__WEBPACK_IMPORTED_MODULE_3__["Vector2"]();
        this.raycaster = new three__WEBPACK_IMPORTED_MODULE_3__["Raycaster"]();
        this.theta = 0;
        this.radius = 1000;
    }
    resizeEvent() {
        this.threeCommon.camera.aspect = this.canvasEl.nativeElement.offsetWidth / this.canvasEl.nativeElement.offsetHeight;
        this.threeCommon.camera.updateProjectionMatrix();
        this.threeCommon.renderer.setSize(this.canvasEl.nativeElement.offsetWidth, this.canvasEl.nativeElement.offsetHeight);
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.setUpStats();
        this.threeCommon = this.threeService.getThreeCommon(this.canvasEl.nativeElement);
        this.threeCommon.camera.position.z = 0;
        this.threeCommon.camera.aspect = this.canvasEl.nativeElement.offsetWidth / this.canvasEl.nativeElement.offsetHeight;
        this.threeCommon.renderer.setPixelRatio(window.devicePixelRatio);
        this.threeCommon.camera.updateProjectionMatrix();
        this.threeCommon.scene.background = new three__WEBPACK_IMPORTED_MODULE_3__["Color"](0xf0f0f0);
        this.viewController();
    }
    mouseMoveHandler(event) {
        event.preventDefault();
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    setUpStats() {
        this.stats = new _node_modules_stats_js_build_stats_min_js__WEBPACK_IMPORTED_MODULE_4__();
        this.stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(this.stats.dom);
    }
    viewController() {
        const geometry = new three__WEBPACK_IMPORTED_MODULE_3__["BoxBufferGeometry"](20, 20, 20);
        for (var i = 0; i < 2000; i++) {
            var object = new three__WEBPACK_IMPORTED_MODULE_3__["Mesh"](geometry, new three__WEBPACK_IMPORTED_MODULE_3__["MeshLambertMaterial"]({ color: Math.random() * 0xffffff }));
            object.position.x = Math.random() * this.canvasEl.nativeElement.offsetWidth - this.canvasEl.nativeElement.offsetHeight;
            object.position.y = Math.random() * this.canvasEl.nativeElement.offsetWidth - this.canvasEl.nativeElement.offsetHeight;
            object.position.z = Math.random() * this.canvasEl.nativeElement.offsetWidth - this.canvasEl.nativeElement.offsetHeight;
            object.rotation.x = Math.random() * 2 * Math.PI;
            object.rotation.y = Math.random() * 2 * Math.PI;
            object.rotation.z = Math.random() * 2 * Math.PI;
            object.scale.x = Math.random() + 0.5;
            object.scale.y = Math.random() + 0.5;
            object.scale.z = Math.random() + 0.5;
            this.threeCommon.scene.add(object);
        }
        this.renderView();
    }
    renderView(calleeAnimationFrame) {
        this.theta += 0.01;
        this.threeCommon.camera.position.x = this.radius * Math.sin(three__WEBPACK_IMPORTED_MODULE_3__["MathUtils"].degToRad(this.theta));
        this.threeCommon.camera.position.y = this.radius * Math.sin(three__WEBPACK_IMPORTED_MODULE_3__["MathUtils"].degToRad(this.theta));
        this.threeCommon.camera.position.z = this.radius * Math.cos(three__WEBPACK_IMPORTED_MODULE_3__["MathUtils"].degToRad(this.theta));
        this.threeCommon.camera.lookAt(this.threeCommon.scene.position);
        this.stats.update();
        this.raycaster.setFromCamera(this.mouse, this.threeCommon.camera);
        var intersects = this.raycaster.intersectObjects(this.threeCommon.scene.children);
        if (intersects.length > 0) {
            if (this.intersected != intersects[0].object) {
                if (this.intersected)
                    this.intersected.material.emissive.setHex(this.intersected.currentHex);
                this.intersected = intersects[0].object;
                this.intersected.currentHex = this.intersected.material.emissive.getHex();
                this.intersected.material.emissive.setHex(0xff0000);
            }
        }
        else {
            if (this.intersected)
                this.intersected.material.emissive.setHex(this.intersected.currentHex);
            this.intersected = null;
        }
        this.threeCommon.renderer.render(this.threeCommon.scene, this.threeCommon.camera);
        window.requestAnimationFrame(this.renderView.bind(this));
    }
};
UnoptimizedCubesComponent.ctorParameters = () => [
    { type: src_app_three_services_three_service__WEBPACK_IMPORTED_MODULE_2__["ThreeService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('resize')
], UnoptimizedCubesComponent.prototype, "resizeEvent", null);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('canvasEl', { static: false, read: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] })
], UnoptimizedCubesComponent.prototype, "canvasEl", void 0);
UnoptimizedCubesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-unoptimized-cubes',
        template: __webpack_require__(/*! raw-loader!./unoptimized-cubes.component.html */ "./node_modules/raw-loader/index.js!./src/app/three-optimized/components/unoptimized-cubes/unoptimized-cubes.component.html"),
        styles: [__webpack_require__(/*! ./unoptimized-cubes.component.scss */ "./src/app/three-optimized/components/unoptimized-cubes/unoptimized-cubes.component.scss")]
    })
], UnoptimizedCubesComponent);



/***/ }),

/***/ "./src/app/three-optimized/three-optimized-routing.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/three-optimized/three-optimized-routing.module.ts ***!
  \*******************************************************************/
/*! exports provided: ThreeOptimizedRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThreeOptimizedRoutingModule", function() { return ThreeOptimizedRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _components_three_optimized_three_optimized_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/three-optimized/three-optimized.component */ "./src/app/three-optimized/components/three-optimized/three-optimized.component.ts");




const routes = [
    {
        path: '',
        component: _components_three_optimized_three_optimized_component__WEBPACK_IMPORTED_MODULE_3__["ThreeOptimizedComponent"]
    }
];
let ThreeOptimizedRoutingModule = class ThreeOptimizedRoutingModule {
};
ThreeOptimizedRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], ThreeOptimizedRoutingModule);



/***/ }),

/***/ "./src/app/three-optimized/three-optimized.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/three-optimized/three-optimized.module.ts ***!
  \***********************************************************/
/*! exports provided: ThreeOptimizedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThreeOptimizedModule", function() { return ThreeOptimizedModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _three_optimized_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./three-optimized-routing.module */ "./src/app/three-optimized/three-optimized-routing.module.ts");
/* harmony import */ var _components_instance_mesh_instance_mesh_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/instance-mesh/instance-mesh.component */ "./src/app/three-optimized/components/instance-mesh/instance-mesh.component.ts");
/* harmony import */ var _components_three_optimized_three_optimized_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/three-optimized/three-optimized.component */ "./src/app/three-optimized/components/three-optimized/three-optimized.component.ts");
/* harmony import */ var _components_unoptimized_cubes_unoptimized_cubes_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/unoptimized-cubes/unoptimized-cubes.component */ "./src/app/three-optimized/components/unoptimized-cubes/unoptimized-cubes.component.ts");







let ThreeOptimizedModule = class ThreeOptimizedModule {
};
ThreeOptimizedModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_components_instance_mesh_instance_mesh_component__WEBPACK_IMPORTED_MODULE_4__["InstanceMeshComponent"], _components_three_optimized_three_optimized_component__WEBPACK_IMPORTED_MODULE_5__["ThreeOptimizedComponent"], _components_unoptimized_cubes_unoptimized_cubes_component__WEBPACK_IMPORTED_MODULE_6__["UnoptimizedCubesComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _three_optimized_routing_module__WEBPACK_IMPORTED_MODULE_3__["ThreeOptimizedRoutingModule"]
        ]
    })
], ThreeOptimizedModule);



/***/ })

}]);
//# sourceMappingURL=three-optimized-three-optimized-module-es2015.js.map