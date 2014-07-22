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
                var lights = scene.lights, light;
                var material, lightColor, materialColor, materialEmissive, polygonColor;
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
                polygons.sort(function (a, b) {
                    return a.distanceToCamera - b.distanceToCamera;
                });

                // Lighting
                i = polygons.length;
                while (--i >= 0) {
                    polygon = polygons[i];
                    if (!polygon.isCulled) {

                        material = polygon.material;
                        polygonColor = polygon.color;
                        
                        materialColor = material.color;
                        materialEmissive = material.emissive;

                        polygonColor.setRGB(0, 0, 0);

                        j = lights.length;
                        while (--j >= 0) {
                            light = lights[j];
                            lightColor = light.color;
                            
                            dp = light.forward.dotProduct(polygon.worldNormal);
                            if (dp < 0)
                                dp = 0;

                            polygonColor.r += materialColor.r * lightColor.r * dp;
                            polygonColor.g += materialColor.g * lightColor.g * dp;
                            polygonColor.b += materialColor.b * lightColor.b * dp;
                        }

                        polygonColor.add(materialEmissive);

                        polygonColor.clamp();
                    }
                }

                // Project (view-space and clip-space)
                i = models.length;
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

                        screenVertex.x *= surfaceWidth;
                        screenVertex.y *= surfaceHeight;
                    }
                }

                // Render
                i = polygons.length;
                while (--i >= 0) {
                    polygon = polygons[i];
                    if (!polygon.isCulled) {
                        surface.polygon(polygon.screenVertices, polygon.color.getHex());
                    }
                }

                surface.render();
            }
        };

        return Renderer;
    }
);