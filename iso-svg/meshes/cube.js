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

    return cube;
});