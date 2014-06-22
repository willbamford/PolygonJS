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
        'text!iso-svg/meshes/data/princeton/m91.off'
    ],
    function (lib, Surface, Camera, Renderer, Mesh, Icosahedron, Cube, Sphere, meshData) {

        var surface = Surface.create({});
        var camera = Camera.create({
            zoom: 100,
            mode: Camera.ISOMETRIC
        });
        var renderer = Renderer.create({
            surface: surface,
            camera: camera
        });

        var mesh = Mesh.load(meshData, Mesh.OBJECT_FILE_FORMAT);
        renderer.mesh(mesh);

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