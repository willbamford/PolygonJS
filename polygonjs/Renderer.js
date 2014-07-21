define(
    [
        'polygonjs/math/Matrix4',
        'polygonjs/math/Vector3'
    ],
    function (Matrix4, Vector3) {

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
            render: function (delta) {

                var scene = this.scene;
                var camera = scene.mainCamera;
                var cameraWorldPosition = camera.worldPosition;
                var viewTransform = camera.viewTransform;
                var projectionTransform = camera.projectionTransform;
                var models = scene.models, model;
                var polygons = scene.polygons, polygon;
                var worldVertices, worldVertex;
                var viewVertices, viewVertex;
                var screenVertices, screenVertex;
                var surface = this.surface;
                var surfaceWidth = surface.width;
                var surfaceHeight = surface.height;
                var worldNormal, viewNormal;
                var dp;
                var i, j, len;

                surface.clear();

                // Back-face cull
                i = polygons.length;
                while (--i >= 0) {
                    polygon = polygons[i];
                    dp = polygon.worldNormal.dotProduct(camera.forward);
                    polygon.isCulled = dp < 0;
                    polygon.distanceToCamera = polygon.worldPosition.distanceTo(cameraWorldPosition);
                }

                // Sort (slow!)
                // var count = 0;
                polygons.sort(function (a, b) {
                    // count++;
                    return a.distanceToCamera - b.distanceToCamera;
                });
                // console.log(count);

                // Project (view-space and clip-space)
                i = models.length, j;
                while (--i >= 0) {
                    model = models[i];
                    worldVertices = model.worldVertices;
                    viewVertices = model.viewVertices;
                    screenVertices = model.screenVertices;
                    j = worldVertices.length;
                    while (--j >= 0) {
                        worldVertex = worldVertices[j];
                        viewVertex = viewVertices[j];
                        screenVertex = screenVertices[j];

                        viewVertex.copy(worldVertex).applyProjection(viewTransform);
                        screenVertex.copy(viewVertex).applyProjection(projectionTransform);

                        // TODO: combine above?

                        screenVertex.x *= surfaceWidth;
                        screenVertex.y *= surfaceHeight;
                    }
                }

                // Render
                i = polygons.length;
                while (--i >= 0) {
                    polygon = polygons[i];
                    if (!polygon.isCulled) {
                        polygon.color.copy(polygon.material.diffuse);
                        surface.polygon(polygon.screenVertices, polygon.color.getHex());
                    }
                }

                surface.render();
            }
        };

        return Renderer;
    }
);