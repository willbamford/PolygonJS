define(
    [
        'polygonjs/entities/PerspectiveCamera',
        'polygonjs/entities/OrthographicCamera',
        'polygonjs/geom/Matrix4',
        'polygonjs/geom/Vector3'
    ],
    function (PerspectiveCamera, OrthographicCamera, Matrix4, Vector3) {

        "use strict";

        var Renderer = function (opts) {
            opts = opts || {};
            this.surface = opts.surface;
            this.scene = opts.scene;
        };

        Renderer.create = function (opts) {
            return new Renderer(opts);
        };

        Renderer.prototype = {
            draw: function (delta) {

                var scene = this.scene;
                var camera = scene.mainCamera;
                var viewTransform = camera.viewTransform;
                var projectionTransform = camera.projectionTransform;
                var models = scene.models, model;
                var polygons = scene.polygons, polygon;
                var worldVertices, worldVertex;
                var viewVertices, viewVertex;
                var screenVertices, screenVertex;
                var surface = this.surface;
                var normal, viewNormal;

                surface.clear();

                var i = models.length, j;
                while (--i >= 0) {
                    model = models[i];
                    worldVertices = model.worldVertices;
                    viewVertices = model.viewVertices;
                    screenVertices = model.screenVertices;
                    j = worldVertices.length;
                    while (--j >= 0) {
                        worldVertex = worldVertices[j];
                        viewVertex = viewVertices[j];
                        screenVertex = screenVertices[j]; // TODO: TEMP.

                        // Apply transform
                        //Vector3.transform(worldVertex, viewTransform, viewVertex);
                        viewVertex.copy(worldVertex).applyProjection(viewTransform);

                        //// BEGIN: MOVE

                        // Temp.
                        screenVertex.copy(viewVertex).applyProjection(projectionTransform);
                        //Vector3.transform(viewVertex, projectionTransform, screenVertex);

                        // Temp.
                        screenVertex.x *= 640;
                        screenVertex.y *= 480;

                        //// END: MOVE
                    }
                }

                // Recalculate polygon normals and perform back-face cull
                i = polygons.length;
                while (--i >= 0) {
                    polygon = polygons[i];
                    normal = polygon.normal;
                    viewNormal = polygon.viewNormal;
                    // Vector3.transform(normal, viewTransform, viewNormal); // Assume uniform scaling!
                    
                    polygon.isCulled = false;

                    // Work out dot product between
                }
                // ...

                // SORT POLYGONS!!!
                // ...

                // APPLY PROJECTION TRANSFORM
                // ...

                i = polygons.length;
                while (--i >= 0) {
                    polygon = polygons[i];
                    surface.polygon(polygon.screenVertices, 'red');
                }

                // APPLY VIEW TRANSFORM (to models)








                // SORT

                // EACH POLYGON - DRAW

                // var scene = this.scene,
                //     model = scene.root.findFirst('cube'),
                //     surface = this.surface,
                //     i = model.length, j,
                //     worldVertex, viewVertex, screenVertex;

                // surface.clear();

                // var viewTransform = scene.mainCamera.viewTransform;
                // var projectionTransform = Camera.createPerspectiveProjectionTransform(
                //     60, 640 / 480, 1, 100
                // );
                // // var projectionTransform = Camera.createOrthographicProjectionTransform(
                // //    6.4, 4.8, 0, 100
                // // );

                // // while (--i >= 0) {
                //     // polygon = model[i];
                //     j = model.worldVertices.length;
                //     while (--j >= 0) {
                //         worldVertex = model.worldVertices[j];
                //         var projectionViewTransform = projectionTransform.multiply(viewTransform);
                //         var screenVertex = worldVertex.transform(projectionViewTransform);
                //         screenVertex.x *= 640;
                //         screenVertex.y *= 480;
                //         surface.dot(screenVertex, 'red');
                //     }
                // // }
            }
        };

        return Renderer;
    }
);