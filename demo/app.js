require(
    [
        'iso-svg/lib',
        'iso-svg/Surface',
        'iso-svg/Camera',
        'iso-svg/Renderer',
        'iso-svg/meshes/Icosahedron',
        'iso-svg/meshes/Cube',
        'iso-svg/meshes/Sphere'
    ],
    function (lib, Surface, Camera, Renderer, Icosahedron, Cube, Sphere) {

        "use strict";

        var surface = Surface.create({});
        var camera = Camera.create({
            zoom: 100,
            mode: Camera.ISOMETRIC
        });
        var renderer = Renderer.create({
            surface: surface,
            camera: camera
        });

        var icosahedron = Icosahedron.create();
        renderer.mesh(icosahedron);

        // var icosahedron = Sphere.create({
        //     levelOfDetail: 4,
        //     spikiness: -0.03
        // });
        // renderer.mesh(icosahedron);

        // var cube = Cube.create();
        // renderer.mesh(cube);
    }
);