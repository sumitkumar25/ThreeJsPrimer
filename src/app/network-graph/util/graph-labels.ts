import * as THREE from "three";
console.log(THREE.Object3D.prototype);
const _prototype = Object.create(THREE.Object3D.prototype);
export class RemoveInvisibleGroup extends _prototype {
  camera: any;
  removeInvisible: boolean;
  checkBounds: boolean;
  removedObjGroup: THREE.Object3D;
  tmpVector: THREE.Vector3;
  tmpMatrix: THREE.Matrix4;
  tmpFrustum: THREE.Frustum;

  constructor(camera) {
    super();
    this.camera = camera;
    this.removeInvisible = true;
    this.checkBounds = true;
    this.removedObjGroup = new THREE.Object3D();
    this.tmpVector = new THREE.Vector3();
    this.tmpMatrix = new THREE.Matrix4();
    this.tmpFrustum = new THREE.Frustum();
  }

  update() {
    var i, obj;
    if (this.removeInvisible) {
      for (i = 0; i < this.children.length; i++) {
        obj = this.children[i];

        if (!this.isInFrustrum(obj)) {
          this.removedObjGroup.add(obj);
          this.remove(obj);
        }
      }
      for (i = 0; i < this.removedObjGroup.children.length; i++) {
        obj = this.removedObjGroup.children[i];
        if (this.isInFrustrum(obj)) {
          this.add(obj);
          this.removedObjGroup.remove(obj);
        }
      }
    } else {
      // ensure removedObjGroup is empty after removeInvisible flag changed
      for (i = 0; i < this.removedObjGroup.children.length; i++) {
        obj = this.removedObjGroup.children[i];
        this.add(obj);
        this.removedObjGroup.remove(obj);
      }
    }

    console.log(
      "visible: " + this.children.length,
      " invisble: ",
      this.removedObjGroup.children.length
    );
  }

  isInFrustrum(obj) {
    if (this.checkBounds) {
      if (obj.geometry.boundingBox == null) {
        obj.geometry.computeBoundingBox(); // for a sprite -0.5 -0.5 to 0.5 0.5
      }
      // top left and bottom right are checked, top right and bottom left can be added to make it smooth for all movement dirs
      if (
        this.isPosInFrustrum(
          this.tmpVector.addVectors(obj.position, obj.geometry.boundingBox.min)
        )
      ) {
        return true;
      } else {
        return this.isPosInFrustrum(
          this.tmpVector.addVectors(obj.position, obj.geometry.boundingBox.max)
        );
      }
    } else {
      return this.isPosInFrustrum(obj.position);
    }
  }

  isPosInFrustrum(position) {
    this.camera.updateMatrix();
    this.camera.updateMatrixWorld();
    this.tmpFrustum.setFromProjectionMatrix(
      this.tmpMatrix.multiplyMatrices(
        this.camera.projectionMatrix,
        this.camera.matrixWorldInverse
      )
    );
    return this.tmpFrustum.containsPoint(position);
  }
}

RemoveInvisibleGroup.prototype = Object.create(THREE.Object3D.prototype);
RemoveInvisibleGroup.prototype.constructor = RemoveInvisibleGroup;
