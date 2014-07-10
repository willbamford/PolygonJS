define(
    [
        'polygonjs/lib',
        'polygonjs/geom/Vector3',
        'polygonjs/math'
    ],
    function (lib, Vector3, math) {

        "use strict";

        var Mesh = function (opts) {

            this.vertices = opts.vertices || [];
            this.faces = opts.faces || [];
            this.normals = []; // Per face, not vertex

            this.updateNormals();
            return this;
        };

        Mesh.create = function (opts) {
            return new Mesh(opts);
        };

        Mesh.prototype = {

            updateNormals: function () {
                var self = this, vertices;
                var normal;
                this.normals = [];
                lib.each(this.faces, function (face) {
                    vertices = self.getVerticesForFace(face);
                    normal = Vector3.normalFromPositionVectors(
                        vertices[0], vertices[1], vertices[2]
                    );
                    self.normals.push(normal);
                });
            },

            eachFace: function (fn) {
                var self = this, vertices, normal;
                lib.each(this.faces, function (face, faceIndex) {
                    fn(self.getVerticesForFace(face), self.normals[faceIndex]);
                });
            },

            getVerticesForFace: function (face) {
                var self = this, vertices = [];
                lib.each(face, function (index) {
                    vertices.push(self.vertices[index]);
                });
                return vertices;
            },

            normalise: function () {
                if (this.vertices && this.vertices.length > 0) {
                    var minX = Number.MAX_VALUE, maxX = Number.MIN_VALUE;
                    var minY = Number.MAX_VALUE, maxY = Number.MIN_VALUE;
                    var minZ = Number.MAX_VALUE, maxZ = Number.MIN_VALUE;
                    lib.each(this.vertices, function (vertex) {
                        if (vertex.x < minX) minX = vertex.x;
                        if (vertex.x > maxX) maxX = vertex.x;
                        if (vertex.y < minY) minY = vertex.y;
                        if (vertex.y > maxY) maxY = vertex.y;
                        if (vertex.z < minZ) minZ = vertex.z;
                        if (vertex.z > maxZ) maxZ = vertex.z;
                    });
                    var dx = maxX - minX, dy = maxY - minY, dz = maxZ - minZ;
                    var dmax = Math.max(dx, Math.max(dy, dz));
                    var tx = 0.5 * (minX + maxX), ty = 0.5 * (minY + maxY), tz = 0.5 * (minZ + maxZ);
                    var scale = 2 / dmax;
                    lib.each(this.vertices, function (vertex) {
                        vertex.x -= tx;
                        vertex.y -= ty;
                        vertex.z -= tz;
                        vertex.x *= scale;
                        vertex.y *= scale;
                        vertex.z *= scale;
                    });
                }
            }
        };

        return Mesh;
    }
);