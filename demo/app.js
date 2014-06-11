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

        icosahedron.eachFace(function (vertices, normal) {
            console.log('vertices.length: ' + vertices.length);
            console.log('normal: ' + normal);
            p.face(vertices, normal);
        });
    }
);