define(
    ['polygonjs/lib', 'polygonjs/geom/Vector3', 'polygonjs/Mesh'],
    function (lib, Vector3, Mesh) {

        "use strict";

        var Cube = {};

        Cube.create = function () {
            var vertices = Vector3.createFromArrays([
                [ 1,  1,  1], // 0
                [ 1,  1, -1], // 1
                [ 1, -1,  1], // 2
                [ 1, -1, -1], // 3
                [-1,  1,  1], // 4
                [-1,  1, -1], // 5
                [-1, -1,  1], // 6
                [-1, -1, -1]  // 7
            ]);
            
            var instance = Mesh.create({
                vertices: vertices,
                faces: [
                    [0, 2, 3, 1], // Right
                    [5, 7, 6, 4], // Left
                    [4, 6, 2, 0], // Front
                    [1, 3, 7, 5], // Back
                    [0, 1, 5, 4], // Top
                    [7, 3, 2, 6], // Bottom
                ]
            });

            return instance;
        };

        return Cube;
    }
);