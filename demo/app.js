require(
    [
        'iso-svg/lib',
        'iso-svg/surface',
        'iso-svg/projector',
        'iso-svg/meshes/icosahedron',
        'iso-svg/meshes/cube'
    ],
    function (lib, surface, projector, icosahedron, cube) {

        var s = surface.create({});
        var p = projector.create({
            surface: s,
            scale: 40
        });

        // lib.each(cube.faces, function (face) {
        //     var vertices = cube.getFaceVertices(face);
        //     p.polygon(vertices);
        // });

        lib.each(icosahedron.faces, function (face) {
            var vertices = icosahedron.getFaceVertices(face);
            p.polygon(vertices);
        });
    }
);