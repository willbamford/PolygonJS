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

        var sphere = Sphere.create(
            {
                levelOfDetail: 3,
                spikiness: 0.1
            }
        );
        projector.mesh(sphere);

        // var cube = Cube.create();
        // projector.mesh(cube);
    }
);