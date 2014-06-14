define(['iso-svg/lib', 'iso-svg/math'], function (lib, math) {

    "use strict";

    var Mesh = function (opts) {

        //   Z
        //   |
        //   |
        //   0-- X
        //  /
        // Y

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
            this.normals = [];
            lib.each(this.faces, function (face) {
                vertices = self.getVerticesForFace(face);
                self.normals.push(math.normalFromVertices(
                    vertices[0],
                    vertices[1],
                    vertices[2]
                ));
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
        }
    };

    return Mesh;
});