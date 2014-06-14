require(
    [
        'iso-svg/lib',
        'iso-svg/surface',
        'iso-svg/Projector',
        'iso-svg/meshes/icosahedron',
        'iso-svg/meshes/cube'
    ],
    function (lib, surface, Projector, icosahedron, cube) {

        "use strict";

        var s = surface.create({});
        var p = Projector.create({
            surface: s,
            scale: 40
        });

        icosahedron.eachFace(function (vertices, normal) {
            console.log('vertices.length: ' + vertices.length);
            console.log('normal: ' + normal);
            p.face(vertices, normal);
        });
    }
);