require(
    [
        'iso-svg/lib',
        'iso-svg/Surface',
        'iso-svg/Camera',
        'iso-svg/Projector',
        'iso-svg/meshes/icosahedron',
        'iso-svg/meshes/cube'
    ],
    function (lib, Surface, Camera, Projector, icosahedron, cube) {

        "use strict";

        var surface = Surface.create({});
        var camera = Camera.create({
            zoom: 80,
            mode: Camera.ISOMETRIC
        });
        var projector = Projector.create({
            surface: surface,
            camera: camera
        });

        icosahedron.eachFace(function (vertices, normal) {
            projector.face(vertices, normal);
        });
    }
);