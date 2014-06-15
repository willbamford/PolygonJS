require(
    [
        'iso-svg/lib',
        'iso-svg/Surface',
        'iso-svg/Camera',
        'iso-svg/Projector',
        'iso-svg/meshes/Icosahedron',
        'iso-svg/meshes/Cube',
        'iso-svg/meshes/Sphere'
    ],
    function (lib, Surface, Camera, Projector, Icosahedron, Cube, Sphere) {

        "use strict";

        var surface = Surface.create({});
        var camera = Camera.create({
            zoom: 100,
            mode: Camera.ISOMETRIC
        });
        var projector = Projector.create({
            surface: surface,
            camera: camera
        });

        var sphere = Sphere.create();
        sphere.eachFace(function (vertices, normal) {
            projector.face(vertices, normal);
        });
    }
);