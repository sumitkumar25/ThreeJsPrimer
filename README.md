# ThreeJsPrimer

Code snippets for Three Js, Canvas (Two nodes and a connection).
three globe (<https://www.npmjs.com/package/three-globe>) and globe.gl demos. Instancing , Instance Mesh and Instance mesh positioned on a geometry
## Preview

(<https://sumitkumar25.github.io/ThreeJsPrimer/>) : ghPages
## Contents

### THREE JS

   1. Spherical geometry, Basic Line geometry, Raycaster for mouseclick.
   2. Globe Points Rendering with sized points and labels.
   3. Coordinate Points and labels.
   4. 3D canvas globe rendering - No controls.
   5. 2D canvas globe(Map) rendering.
   6. Three Js groups and Object3D combinations.
   7. Drag and drop of objects.

      1. <https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_drag.html>

   8. Rendering Optimization.

      1. The “brute force”.

         1. Combining into groups and 1 step rendering.

            1. Remove a matrix multiplication from the shader. TODO.

         2. Drawbacks:

            1. Lose the ability to adjust individual items as there is no individual item.
            2. This approach is a memory hog as GPU has to store much more data i.e. count(CombinedGeometry) = 1 but size(CombinedGeometry) = n(Geometry)*size(Geometry).
            3. Merge operation itself may be slow and cause a lot of GC (Garbage collection) activity.
            4. Complicated to update individual instances within the cluster
      2. Instancing .

         1. <https://velasquezdaniel.com/blog/rendering-100k-spheres-instantianing-and-draw-calls/> instancing starter reference.

         2. smaller set of data to describe OBJECTS and render it the same.
         3. 1 extra matrix multiplication for (attribute mat4 instanceMatrix), but in the case of all unique nodes, it will be done on the GPU not the CPU. GPUs might be idle waiting for the draw call to be issued, performance gain can be made here by keeping them busier at the same overhead cost (draw call).

            Simple Shader

            ``` javascript
                        void main() {
                           gl_Position =
                              projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);
                        }
            ```

            Instanced Shader

            ``` javascript
                        void main() {

                           gl_Position = projectionMatrix * viewMatrix * //from THREE.Camera
                              modelMatrix * //from THREE.Mesh
                              instanceMatrix * //we add this to the chain,
                              vec4(position, 1.); //from THREE.BufferGeometry
                        }
            ```

         4. InstancedBufferAttribute
            An array of numbers formatted in such a way that they correspond to the data you would otherwise draw with a unique draw call.
         5. Single draw call then draws many vertices the same, over and over for each instance, with each instance, it accesses a different value:

            ``` javascript
            void main() {
               vec3 myPosition = position + offset;
               //offset will change value 25 times during the draw call
            }
            ```

         6. InstancedBufferGeometry ends up doing the job of both Geometry and Object3D ( Group ).
         7. Shaders.
             1. A shader is essentially a function required to draw something on the screen. Shaders run on a GPU (graphics processing unit), which is optimized for such operations.
         8. Vertex Shaders 
             1. Vertex shaders manipulate coordinates in a 3D space and are  called once per vertex.
             2. Set up the gl_Position variable, a global variable used to store the position of the current vertex.
             3. Fourth vertex of a vec4 is used to manipulate the clipping of the vertex position in the 3D space, but we don't need in our case.
         9. Instance mesh and Vertices based on Cone, Hedron and spherical Geometry class.

### 3D globe npm package

   1. Colors dependent on lightning.
   2. Request Animation frame for rendering required. Single render execution not working.
   3. TODO: How to set userData.

### Globe.gl npm package

   1. Display aws region and intersected objects in console.

### Canvas

Path 2d, isPointInPath, isPointInStroke.

### Base 3d

Custom geometry class and manual addition of vertex and faces.

### Project Build

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.2.
**No Test scripts available.**
