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
                var lights = scene.lights;
                var models = scene.models;
                var polygons = scene.polygons;
                var surface = this.surface;

                surface.clear();

                this.cull(polygons, camera);
                this.depthSort(polygons);
                this.light(polygons, lights);
                this.project(models, camera, surface);
                this.draw(polygons, surface);

                surface.render();
            },

            cull: function (polygons, camera) {

                var i = 0, len = polygons.length;
                var polygon;
                var dotProduct;
                var cameraPosition = camera.worldPosition;
                for (i = 0; i < len; i++) {
                    polygon = polygons[i];
                    dotProduct = polygon.worldNormal.dotProduct(camera.forward);
                    polygon.isCulled = dotProduct < 0;
                    polygon.distanceToCamera = polygon.worldPosition.distanceTo(cameraPosition);
                }
            },

            depthSort: function (polygons) {
                var sorter = function (a, b) {
                    if (a.shouldSort && b.shouldSort)
                        return b.distanceToCamera - a.distanceToCamera;
                    else if (a.shouldSort)
                        return 1;
                    else if (b.shouldSort)
                        return -1;
                    else
                        return 0;
                }
                polygons.sort(sorter);
            },

            light: function (polygons, lights) {

                var i = polygons.length, j;
                var polygon, polygonColor;
                var light, lightColor, lightIntensity;
                var material, materialColor, materialEmissive;
                var dotProduct;
                var polygonNormal;
                while (--i >= 0) {
                    polygon = polygons[i];
                    if (!polygon.isCulled) {

                        material = polygon.material;
                        polygonColor = polygon.color;
                        polygonNormal = polygon.worldNormal;
                        
                        materialColor = material.color;
                        materialEmissive = material.emissive;

                        polygonColor.setRGB(0, 0, 0);

                        j = lights.length;
                        while (--j >= 0) {
                            light = lights[j];
                            lightColor = light.color;
                            lightIntensity = light.intensity;
                            
                            dotProduct = light.forward.dotProduct(polygonNormal);
                            
                            if (dotProduct < 0)
                                dotProduct = 0;

                            lightIntensity *= dotProduct;

                            polygonColor.r += materialColor.r * lightColor.r * lightIntensity;
                            polygonColor.g += materialColor.g * lightColor.g * lightIntensity;
                            polygonColor.b += materialColor.b * lightColor.b * lightIntensity;
                        }

                        polygonColor.add(materialEmissive);
                        polygonColor.clamp();
                    }
                }
            },

            project: function (models, camera, surface) {

                var i, ilen = models.length, j, jlen;
                var model;

                var viewTransform = camera.viewTransform;
                var projectionTransform = camera.projectionTransform;

                var worldVertices, worldVertex;
                var viewVertices, viewVertex;
                var screenVertices, screenVertex;

                var surfaceWidth = surface.width;
                var surfaceHeight = surface.height;

                for (i = 0; i < ilen; i++) {

                    model = models[i];
                    worldVertices = model.worldVertices;
                    viewVertices = model.viewVertices;
                    screenVertices = model.screenVertices;

                    jlen = worldVertices.length;
                    for (j = 0; j < jlen; j++) {

                        worldVertex = worldVertices[j];
                        viewVertex = viewVertices[j];
                        screenVertex = screenVertices[j];

                        viewVertex.copy(worldVertex).applyProjection(viewTransform);
                        screenVertex.copy(viewVertex).applyProjection(projectionTransform);

                        screenVertex.x *= surfaceWidth;
                        screenVertex.y *= surfaceHeight;
                    }
                }
            },

            draw: function (polygons, surface) {

                var i, len = polygons.length, polygon;
                for (i = 0; i < len; i++) {
                    polygon = polygons[i];
                    if (!polygon.isCulled)
                        surface.polygon(polygon.screenVertices, polygon.color.getHex());
                }
            }
        };

        return Renderer;
    }
);