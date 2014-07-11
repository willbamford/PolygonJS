define(
    [
        'polygonjs/Entity',
        'polygonjs/entities/Polygon',
        'polygonjs/lib',
        'polygonjs/geom/Vector3'
    ],
    function (Entity, Polygon, lib, Vector3) {

        "use strict";

        var Model = function (opts) {
            opts = opts || {};
            Entity.call(this, opts);
            this.type = 'model';

            this.vertices = opts.vertices || [];             // Object Space
            this.worldVertices = opts.worldVertices || [];   // World Space
            this.viewVertices = opts.viewVertices || [];     // View Space
            this.screenVertices = opts.screenVertices || []; // Clip Space

            this.polygons = opts.polygons || [];
        };

        Model.create = function (opts) {
            return new Model(opts);
        };

        Model.createFromMesh = function (mesh, opts) {

            var normals = mesh.normals;
            var faces = mesh.faces;
            var vertices = mesh.vertices;
            var worldVertices = [];
            var viewVertices = [];
            var screenVertices = [];

            lib.each(vertices, function () {
                worldVertices.push(Vector3.create(0, 0, 0));
                viewVertices.push(Vector3.create(0, 0, 0));
                screenVertices.push(Vector3.create(0, 0, 0));
            });

            var polygons = [];

            // i = faces.length;
            // while (--i >= 0) {
            //     var face = faces[i];
            //     j = face.length;
            //     while (j++ < )
            //     var polygon = Polygon.create();
            // }

            opts = lib.merge(opts, {
                vertices: mesh.vertices,
                worldVertices: worldVertices,
                viewVertices: viewVertices,
                screenVertices: screenVertices,
                polygons: polygons
            });

            return Model.create(opts);
        };

        Model.prototype = Object.create(Entity.prototype);

        return Model;
    }
);