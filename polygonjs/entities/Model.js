define(
    [
        'polygonjs/Entity',
        'polygonjs/entities/Polygon',
        'polygonjs/Fn',
        'polygonjs/math/Vector3'
    ],
    function (Entity, Polygon, Fn, Vector3) {

        "use strict";

        var Model = function (opts) {
            var self = this;
            opts = opts || {};
            Entity.call(this, opts);
            this.type = 'model';

            this.vertices = opts.vertices || [];             // Object Space
            this.worldVertices = opts.worldVertices || [];   // World Space
            this.viewVertices = opts.viewVertices || [];     // View Space
            this.screenVertices = opts.screenVertices || []; // Clip Space

            this.polygons = opts.polygons || [];
            Fn.each(this.polygons, function (polygon) {
                self.addChild(polygon);
            });
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

            Fn.each(vertices, function () {
                worldVertices.push(Vector3.create(0, 0, 0));
                viewVertices.push(Vector3.create(0, 0, 0));
                screenVertices.push(Vector3.create(0, 0, 0));
            });

            var polygons = [];

            mesh.eachFace(function (vertices, normal, vertexIndices) {
                var vs = [], wvs = [], vvs = [], svs = [];
                Fn.each(vertexIndices, function (index) {
                    vs.push(vertices[index]);
                    wvs.push(worldVertices[index]);
                    vvs.push(viewVertices[index]);
                    svs.push(screenVertices[index]);
                });
                var polygon = Polygon.create({
                    vertices: vs,
                    worldVertices: wvs,
                    viewVertices: vvs,
                    screenVertices: svs,
                    normal: normal
                });
                polygons.push(polygon);
            });

            opts = Fn.merge(opts, {
                vertices: mesh.vertices,
                worldVertices: worldVertices,
                viewVertices: viewVertices,
                screenVertices: screenVertices,
                polygons: polygons
            });

            return Model.create(opts);
        };

        Model.prototype = Object.create(Entity.prototype);

        Model.prototype.update = function (delta) {
            
            var vertices = this.vertices;
            var worldVertices = this.worldVertices;
            var worldTransform = this.worldTransform;

            Entity.prototype.update.call(this, delta);

            var i = this.vertices.length;
            while (--i >= 0) {
                worldVertices[i].copy(vertices[i]).applyProjection(worldTransform);
            }
        };

        return Model;
    }
);