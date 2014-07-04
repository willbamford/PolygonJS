define(['polygonjs/entities/Camera-archive'], function (Camera) {

    var tempCamera = Camera.create({
        zoom: 20
    });

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

            var polygons = this.scene.polygons,
                surface = this.surface,
                i = polygons.length, j, vertex, viewVertex;

            surface.clear();

            while (--i >= 0) {
                polygon = polygons[i];
                j = polygon.worldVertices.length;
                while (--j >= 0) {
                    vertex = polygon.worldVertices[j];
                    viewVertex = tempCamera.project(vertex);
                    surface.dot(viewVertex, 'white');
                }

                // polygon.updateViewVertices(camera.projection);
            }


           // var polygons = this.scene.polygons; 

            // var polygons = this.scene.polygons;
            // var polygon;
            // var i = polygons.length;
            // while (--i >= 0) {
            //     polygon = polygons[i];


            //     // polygon.updateViewVertices(camera.projection);
            // }

            /*
                TODO:
                =====

                // Assuming polygon / camera / light world vertices have been
                // calculated properly.

                var camera = scene.mainCamera;
                scene.polygons.each(function (polygon) {
                    // camera.updateViewVertices(polygon);
                    polygon.updateScreenVertices(camera.projection); // M.

                    if (polygon.isVisible)
                        polygon.updateLighting(scene.lights);

                    // polygon.isVisible (based on backface cull and facing of normal)
                    // Note: there may be a "z" component to screen vertex
                    // which can be used for sorting.
                    // polygon.worldVertices.each(function (wv, index) {
                    //    polygon.screenVertices[index] = camera.project(wv);
                    //});
                });

                sortPolygonsByDepth(scene.polygons); // M.

                scene.polygons.each(function (polygon) {
                    if (polygon.isVisible) {
                        surface.drawPolygon(polygon.screenVertices, material);
                    }
                });
             */

        }
    };

    return Renderer;
});