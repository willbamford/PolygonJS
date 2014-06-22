define(
    ['iso-svg/lib', 'iso-svg/geom/Vector3', 'iso-svg/math'],
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

        Mesh.load = function (data, format) {
            var lines;
            switch (format) {
                case Mesh.OBJECT_FILE_FORMAT:
                    return Mesh.loadFromObjectFileFormat(data);
                    break;
                default:
                    console.log('Unrecognised mesh format: ' + format);
            }
        };

        Mesh.loadFromObjectFileFormat = function (data) {
            if (data) {
                var lines = data.split('\n'),
                    counts, vertexCount, faceCount, edgeCount,
                    verticesRemaining, facesRemaining,
                    mode, vertexMode = 'vertex', faceMode = 'face',
                    vertex, face,
                    vertices = [], faces = [],
                    faceVertexCount, faceIndices,
                    i;
                lib.each(lines, function (line) {
                    line = lib.trim(line).replace(/\s{2,}/g, ' ');
                    if (
                        !line || line.length === 0 ||   // Empty line
                        line === 'OFF' ||               // Format header
                        line[0] === '#') {              // Comment
                    } else {
                        if (!counts) {
                            counts = line.split(' ');
                            verticesRemaining = vertexCount = counts[0];
                            facesRemaining = faceCount = counts[1];
                            edgeCount = counts.length > 2 ? counts[2] : -1;
                        } else if (verticesRemaining > 0) {
                            vertex = line.split(' ');
                            vertices.push(Vector3.create(
                                parseFloat(vertex[0]),
                                parseFloat(vertex[1]),
                                parseFloat(vertex[2])
                            ));
                            verticesRemaining--;
                        } else if (facesRemaining > 0) {
                            face = line.split(' ');
                            faceVertexCount = parseInt(face[0]);
                            faceIndices = [];
                            for (i = 1; i < faceVertexCount + 1; i++)
                                faceIndices.push(parseInt(face[i]));
                            faces.push(faceIndices);
                            facesRemaining--;
                        }
                    }
                });
                return Mesh.create({
                    vertices: vertices,
                    faces: faces
                });
            }
            return null;
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
            }
        };

        Mesh.OBJECT_FILE_FORMAT = 'off';

        return Mesh;
    }
);