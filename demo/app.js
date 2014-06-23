require(
    [
        'iso-svg/lib',
        'iso-svg/Surface',
        'iso-svg/Camera',
        'iso-svg/Renderer',
        'iso-svg/meshes/Mesh',
        'iso-svg/meshes/Icosahedron',
        'iso-svg/meshes/Cube',
        'iso-svg/meshes/Sphere',
        'iso-svg/format/object-file-format',
        'text!iso-svg/meshes/data/ball-of-doom.off'
    ],
    function (
        lib,
        Surface,
        Camera,
        Renderer,
        Mesh,
        Icosahedron,
        Cube,
        Sphere,
        objectFileFormat,
        meshData
    ) {
        var surface = Surface.create({});
        var camera = Camera.create({
            zoom: 100,
            mode: Camera.ISOMETRIC
        });
        var renderer = Renderer.create({
            surface: surface,
            camera: camera
        });

        var mesh = objectFileFormat.loadMesh(meshData);
        renderer.mesh(mesh);

        // var sphere = Sphere.create({
        //     levelOfDetail: 3,
        //     spikiness: 0.1
        // });
        // renderer.mesh(sphere);

        // console.log(objectFileFormat.saveMesh(sphere));

        // lib.each(mesh.faces, function (face) {
        //     face = face.reverse();
        // });
        // mesh.updateNormals();

        // var icosahedron = Icosahedron.create();
        // renderer.mesh(icosahedron);

        // var icosahedron = Sphere.create({
        //     levelOfDetail: 3,
        //     spikiness: 0.1
        // });
        // renderer.mesh(icosahedron);
    }
);