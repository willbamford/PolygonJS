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

                var i = polygons.length;
                var polygon;
                var dotProduct;
                var cameraPosition = camera.worldPosition;
                while (--i >= 0) {
                    polygon = polygons[i];
                    dotProduct = polygon.worldNormal.dotProduct(camera.forward);
                    polygon.isCulled = dotProduct < 0;
                    polygon.distanceToCamera = polygon.worldPosition.distanceTo(cameraPosition);
                }
            },

            depthSort: function (polygons) {

                var sorter = function (a, b) {
                    return a.distanceToCamera - b.distanceToCamera;
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

                var i = models.length, j;
                var model;

                var viewTransform = camera.viewTransform;
                var projectionTransform = camera.projectionTransform;

                var worldVertices, worldVertex;
                var viewVertices, viewVertex;
                var screenVertices, screenVertex;

                var surfaceWidth = surface.width;
                var surfaceHeight = surface.height;

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
            },

            draw: function (polygons, surface) {

                var i = polygons.length, polygon;
                while (--i >= 0) {
                    polygon = polygons[i];
                    if (!polygon.isCulled)
                        surface.polygon(polygon.screenVertices, polygon.color.getHex());
                }
            }
        };

        return Renderer;
    }
);