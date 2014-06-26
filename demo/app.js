require(
    [
        'polygonjs/lib',
        'polygonjs/Surface',
        'polygonjs/Camera',
        'polygonjs/Renderer',
        'polygonjs/meshes/Mesh',
        'polygonjs/meshes/Icosahedron',
        'polygonjs/meshes/Cube',
        'polygonjs/meshes/Sphere',
        'polygonjs/format/object-file-format'/*,
        'text!polygonjs/meshes/data/princeton/m103.off'*/
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

        console.time('Render time');

        var surface = Surface.create({});
        var camera = Camera.create({
            zoom: 100,
            mode: Camera.ISOMETRIC
        });
        var renderer = Renderer.create({
            surface: surface,
            camera: camera
        });

        // var mesh = objectFileFormat.loadMesh(meshData);
        // mesh.normalise();
        // renderer.mesh(mesh);

        var mesh = Sphere.create({
            levelOfDetail: 3,
            spikiness: 0.1
        });
        renderer.mesh(mesh);

        console.timeEnd('Render time');

        console.log('Vertices count: ' + mesh.vertices.length);
        console.log('Faces count: ' + mesh.faces.length);

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