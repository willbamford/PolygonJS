define(['iso-svg/mesh'], function (mesh) {

    var X = 0.525731112119133606;
    var Z = 0.850650808352039932;

    var icosahedron = mesh.create({
        vertices: [
            [-X,  0,  Z],
            [ X,  0,  Z],
            [-X,  0, -Z],
            [ X,  0, -Z],
            [ 0,  Z,  X],
            [ 0,  Z, -X],
            [ 0, -Z,  X],
            [ 0, -Z, -X],
            [ Z,  X,  0],
            [-Z,  X,  0],
            [ Z, -X,  0],
            [-Z, -X,  0]
        ],
        faces: []
    });

    return icosahedron;
});