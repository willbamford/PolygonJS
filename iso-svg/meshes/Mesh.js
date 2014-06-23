define(
    [
        'iso-svg/lib',
        'iso-svg/geom/Vector3',
        'iso-svg/math'
    ],
    function (lib, Vector3, math) {

        "use strict";

        var Mesh = function (opts) {

            //   Y
            //   |
            //   |
            //   0-- X
            //  /
            // Z

            this.normals = []; // Per face, not vertex

            this.vertices = opts.vertices || [];
            this.faces = opts.faces || [];

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
                    var minX = Number.MAX_VALUE;
                    var maxX = Number.MIN_VALUE;
                    var minY = Number.MAX_VALUE;
                    var maxY = Number.MIN_VALUE;
                    var minZ = Number.MAX_VALUE;
                    var maxZ = Number.MIN_VALUE;
                    lib.each(this.vertices, function (vertex) {
                        if (vertex.x < minX) minX = vertex.x;
                        if (vertex.x > maxX) maxX = vertex.x;
                        if (vertex.y < minY) minY = vertex.y;
                        if (vertex.y > maxY) maxY = vertex.y;
                        if (vertex.z < minZ) minZ = vertex.z;
                        if (vertex.z > maxZ) maxZ = vertex.z;
                    });
                    var dx = maxX - minX;
                    var dy = maxY - minY;
                    var dz = maxZ - minZ;
                    // console.log('minX: ' + minX + ', maxX: ' + maxX);
                    // console.log('minY: ' + minY + ', maxY: ' + maxY);
                    // console.log('minZ: ' + minZ + ', maxZ: ' + maxZ);
                    // console.log('dx: ' + dx + ', dy: ' + dy + ', dz: ' + dz);
                    var dmax = Math.max(dx, Math.max(dy, dz));
                    var tx = 0.5 * (minX + maxX);
                    var ty = 0.5 * (minY + maxY);
                    var tz = 0.5 * (minZ + maxZ);
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