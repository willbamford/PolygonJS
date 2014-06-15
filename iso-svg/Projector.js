define(['iso-svg/lib', 'iso-svg/math'], function (lib, math) {

    "use strict";

    var Projector = function (opts) {
        this.surface = null;
        this.scale = 1;
        this.eye = null;

        var self = this;
        
        this.surface = opts.surface;
        this.scale = opts.scale;
        this.camera = opts.camera;
        return this;
    };

    Projector.create = function (opts) {
        return new Projector(opts);
    };

    Projector.prototype = {

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

            var dp = math.dotProduct(normal, camera.facingVector);
            if (true /*dp <= 0*/) {
                var r = Math.floor(math.dotProduct(normal, [1, 0, 0]) * 255);
                var g = Math.floor(math.dotProduct(normal, [0, 1, 0]) * 255);
                var b = Math.floor(math.dotProduct(normal, [0, 0, 1]) * 255);
                var style = 'fill: rgba(' + r + ',' + g + ',' + b + ', 1)';
                this.surface.polygon(points, style);
            }
        },

        mesh: function (mesh) {
            var self = this;
            var camera = this.camera;
            var faceVertices = mesh.faces.map(function (face, faceIndex) {
                console.log(faceIndex);
                var a = [];
                lib.each(face, function (vertexIndex) {
                    a.push(mesh.vertices[vertexIndex]);
                });
                return math.mean(a);
            });

            console.log(faceVertices);

            var sortedIndices = camera.distanceSort(faceVertices);

            console.log(sortedIndices);

            lib.each(sortedIndices, function (index) {
                self.face(mesh.getVerticesForFace(mesh.faces[index]), mesh.normals[index]);
            });
        }
    };

    return Projector;
});