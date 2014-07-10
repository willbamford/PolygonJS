define(
    [
        'polygonjs/entities/Camera',
        'polygonjs/geom/Matrix4'
    ],
    function (Camera, Matrix4) {

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

                var scene = this.scene,
                    model = scene.root.findFirst('cube'),
                    surface = this.surface,
                    i = model.length, j,
                    worldVertex, viewVertex, screenVertex;

                surface.clear();

                var viewTransform = scene.mainCamera.viewTransform;
                var projectionTransform = Camera.createPerspectiveProjectionTransform(
                    60, 640 / 480, 1, 100
                );
                // var projectionTransform = Camera.createOrthographicProjectionTransform(
                //    6.4, 4.8, 0, 100
                // );

                // while (--i >= 0) {
                    // polygon = model[i];
                    j = model.vertices.length;
                    while (--j >= 0) {
                        vertex = model.vertices[j];
                        var projectionViewTransform = projectionTransform.multiply(viewTransform);
                        var screenVertex = vertex.transform(projectionViewTransform);
                        screenVertex.x *= 640;
                        screenVertex.y *= 480;
                        surface.dot(screenVertex, 'red');
                    }
                // }
            }
        };

        return Renderer;
    }
);