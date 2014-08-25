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

            this.axes = {
                show: opts.showAxes || false,
                len: 1,
                o: Vector3.create(0, 0, 0),
                x: Vector3.create(0, 0, 0),
                y: Vector3.create(0, 0, 0),
                z: Vector3.create(0, 0, 0)
            };
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
                this.light(polygons, lights, camera);
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
                    return b.distanceToCamera - a.distanceToCamera;
                };
                polygons.sort(sorter);
            },

            light: function () {

                var reflect = Vector3.create(0, 0, 0);

                return function (polygons, lights, camera) {

                    var i = polygons.length, j;
                    var polygon, polygonColor;
                    var light, lightColor, lightIntensity, lightSpecular;
                    var material, materialColor, materialEmissive, materialSpecular, materialShininess;
                    var dp;
                    var polygonNormal;
                    var specularK;

                    while (--i >= 0) {
                        polygon = polygons[i];
                        if (!polygon.isCulled) {

                            material = polygon.material;
                            polygonColor = polygon.color;
                            polygonNormal = polygon.worldNormal;

                            materialColor = material.color;
                            materialEmissive = material.emissive;
                            materialSpecular = material.specular;
                            materialShininess = material.shininess;

                            polygonColor.setRGB(0, 0, 0);

                            j = lights.length;
                            while (--j >= 0) {
                                light = lights[j];
                                lightColor = light.color;
                                lightIntensity = light.intensity;
                                lightSpecular = light.specular;

                                // Diffuse
                                dp = light.forward.dotProduct(polygonNormal);

                                if (dp < 0) dp = 0;

                                lightIntensity *= dp;

                                polygonColor.r += materialColor.r * lightColor.r * lightIntensity;
                                polygonColor.g += materialColor.g * lightColor.g * lightIntensity;
                                polygonColor.b += materialColor.b * lightColor.b * lightIntensity;

                                // Specular
                                if (dp > 0 && lightSpecular && materialSpecular) {
                                    dp = -camera.forward.dotProduct(reflect.copy(light.forward).reflect(polygonNormal));
                                    if (dp > 0) {
                                        specularK = Math.max(Math.pow(dp, materialShininess), 0);
                                        polygonColor.r += specularK * lightSpecular.r * materialSpecular.r;
                                        polygonColor.g += specularK * lightSpecular.g * materialSpecular.g;
                                        polygonColor.b += specularK * lightSpecular.b * materialSpecular.b;
                                    }
                                }
                            }

                            polygonColor.add(materialEmissive);
                            polygonColor.clamp();
                        }
                    }
                }
            }(),

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

                var axes = this.axes;
                if (axes.show) {
                    axes.o.set(0, 0, 0).applyProjection(viewTransform).applyProjection(projectionTransform);
                    axes.x.set(axes.len, 0, 0).applyProjection(viewTransform).applyProjection(projectionTransform);
                    axes.y.set(0, axes.len, 0).applyProjection(viewTransform).applyProjection(projectionTransform);
                    axes.z.set(0, 0, axes.len).applyProjection(viewTransform).applyProjection(projectionTransform);
                    axes.x.x *= surfaceWidth;
                    axes.x.y *= surfaceHeight;
                    axes.y.x *= surfaceWidth;
                    axes.y.y *= surfaceHeight;
                    axes.z.x *= surfaceWidth;
                    axes.z.y *= surfaceHeight;
                }
            },

            draw: function (polygons, surface) {

                var i, len = polygons.length, polygon;
                for (i = 0; i < len; i++) {
                    polygon = polygons[i];
                    if (!polygon.isCulled)
                        surface.polygon(polygon.screenVertices, polygon.color.getHex());
                }

                var axes = this.axes;
                if (axes.show) {
                    surface.line(axes.o, axes.x, 0xff0000);
                    surface.line(axes.o, axes.y, 0x00ff00);
                    surface.line(axes.o, axes.z, 0x0000ff);
                }
            }
        };

        return Renderer;
    }
);
