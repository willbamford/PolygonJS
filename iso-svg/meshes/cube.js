define(['iso-svg/mesh'], function (mesh) {

    var cube = mesh.create({
        vertices: [
            [-1, -1, -1],
            [-1,  1, -1],
            [1,   1, -1],
            [1,  -1, -1],
            [-1, -1,  1],
            [-1,  1,  1],
            [1,   1,  1],
            [1,  -1,  1]
        ],
        faces: []
    });

    return cube;
});