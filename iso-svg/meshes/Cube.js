define(
    ['iso-svg/lib', 'iso-svg/geom/Vector3', 'iso-svg/meshes/Mesh'],
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
                    [4, 0, 1], // Left
                    [4, 1, 5],
                    [2, 6, 7], // Right
                    [2, 7, 3],
                    [4, 6, 2], // Top
                    [4, 2, 0],
                    [1, 3, 7], // Bottom
                    [1, 7, 5]
                ]
            });
            return instance;
        };

        return Cube;
    }
);