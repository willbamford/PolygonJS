define(
    ['polygonjs/lib', 'polygonjs/geom/Vector3', 'polygonjs/math'],
    function (lib, Vector3, math) {

        "use strict";

        var Renderer = function (opts) {
            this.surface = null;
            this.scale = 1;

            var self = this;
            
            this.surface = opts.surface;
            this.scale = opts.scale;
            this.camera = opts.camera;
            return this;
        };

        Renderer.create = function (opts) {
            return new Renderer(opts);
        };

        Renderer.prototype = {

            clear: function () {
                this.surface.clear();
            },

            vertex: function (vertex) {
                var point = this.project(vertex);
                this.surface.circle(point[0], point[1], 1);
            },

            vertices: function (vertices) {
                var self = this;
                lib.each(vertices, function (vertex) {
                    self.vertex(vertex);
                });
            },

            face: function (vertices, normal) {
                var self = this;
                var points = [];
                var camera = this.camera;
                lib.each(vertices, function (vertex) {
                    points.push(camera.project(vertex));
                });
                var dp = camera.facingVector.dotProduct(normal);
                var backfaceCull = true;
                if (backfaceCull ? dp < 0 : true) {
                    var b = Math.floor(math.clamp(normal.dotProduct(Vector3.X) * 255, 0, 255));
                    var g = Math.floor(math.clamp(normal.dotProduct(Vector3.Y) * 255, 0, 255));
                    var r = Math.floor(math.clamp(normal.dotProduct(Vector3.Z) * 255, 0, 255));
                    var style = 'rgba(' + r + ',' + g + ',' + b + ', 1.0)';
                    this.surface.polygon(points, style);
                    // points.forEach(function (point) {
                    //     self.surface.circle(point.x, point.y, 0.2);
                    // });
                }
            },

            mesh: function (mesh) {
                var self = this;
                var camera = this.camera;
                var faceVertices = mesh.faces.map(function (face, faceIndex) {
                    var a = [];
                    lib.each(face, function (vertexIndex) {
                        a.push(mesh.vertices[vertexIndex]);
                    });
                    return Vector3.mean(a);
                });
                var sortedIndices = camera.distanceSort(faceVertices);
                lib.each(sortedIndices, function (index) {
                    self.face(mesh.getVerticesForFace(mesh.faces[index]), mesh.normals[index]);
                });
            }
        };

        return Renderer;
    }
);