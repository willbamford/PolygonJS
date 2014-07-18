define(
    ['polygonjs/Fn', 'polygonjs/math/Vector3', 'polygonjs/Mesh'],
    function (Fn, Vector3, Mesh) {

        "use strict";

        var line = function (s) {
            return s + "\n";
        };

        var objectFileFormat = {
            loadMesh: function (data) {
                if (data) {
                    var lines = data.split('\n'),
                        counts, vertexCount, faceCount, edgeCount,
                        verticesRemaining, facesRemaining,
                        mode, vertexMode = 'vertex', faceMode = 'face',
                        vertex, face,
                        vertices = [], faces = [],
                        faceVertexCount, faceIndices,
                        i;
                    Fn.each(lines, function (line) {
                        line = Fn.trim(line).replace(/\s{2,}/g, ' ');
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
            },
            saveMesh: function (mesh) {
                var s = '';
                s += line('OFF');
                s += line(mesh.vertices.length + ' ' + mesh.faces.length + ' 0');
                Fn.each(mesh.vertices, function (vertex) {
                    s += line(vertex.x + ' ' + vertex.y + ' ' + vertex.z);
                });
                Fn.each(mesh.faces, function (face) {
                    var ln = face.length + ' ';
                    Fn.each(face, function (index) {
                        ln += index + ' ';
                    });
                    s += line(ln);
                });
                return s;
            }
        };

        return objectFileFormat;
    }
);