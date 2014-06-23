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

            fitToBounds: function (min, max) {
                return null;
            }
        };

        return Mesh;
    }
);