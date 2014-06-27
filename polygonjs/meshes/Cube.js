define(
    ['polygonjs/lib', 'polygonjs/geom/Vector3', 'polygonjs/Mesh'],
    function (lib, Vector3, Mesh) {

        "use strict";

        var Cube = {};

        Cube.create = function () {
            var vertices = Vector3.createFromArrays([
                [ 1,  1,  1],
                [ 1,  1, -1],
                [ 1, -1,  1],
                [ 1, -1, -1],
                [-1,  1,  1],
                [-1,  1, -1],
                [-1, -1,  1],
                [-1, -1, -1]
            ]);
            var instance = Mesh.create({
                vertices: vertices,
                faces: [
                    [0, 2, 3], // Front
                    [0, 3, 1],
                    [6, 4, 5], // Back
                    [6, 5, 7],
                    [4, 0, 1], // Top
                    [4, 1, 5],
                    [2, 6, 7], // Bottom
                    [2, 7, 3],
                    [4, 6, 2], // Left
                    [4, 2, 0],
                    [1, 3, 7], // Right
                    [1, 7, 5]
                ]
            });
            return instance;
        };

        return Cube;
    }
);