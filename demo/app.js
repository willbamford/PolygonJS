require(
    [
        'iso-svg/surface',
        'iso-svg/projector',
        'iso-svg/meshes/icosahedron'
    ],
    function (surface, projector, icosahedron) {

        var s = surface.create({});
        var p = projector.create({
            surface: s,
            scale: 40
        });

        p.vertices(icosahedron.vertices);
    }
);