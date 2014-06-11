define(['iso-svg/mesh'], function (mesh) {

    var cube = mesh.create({
        vertices: [
            [ 1,  1,  1],
            [ 1,  1, -1],
            [ 1, -1,  1],
            [ 1, -1, -1],
            [-1,  1,  1],
            [-1,  1, -1],
            [-1, -1,  1],
            [-1, -1, -1],
        ],
        faces: [
            [0, 2, 1], // Front
            [0, 3, 2],
            [5, 7, 4], // Back
            [5, 6, 7],
            [4, 3, 0], // Left
            [4, 7, 3],
            [1, 6, 5], // Right
            [1, 2, 6],
            [4, 1, 5], // Top
            [4, 6, 1],
            [3, 2, 6], // Bottom
            [3, 7, 6]
        ]
    });

    return cube;
});