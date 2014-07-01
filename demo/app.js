require(
    [
        'polygonjs/lib',
        'polygonjs/surfaces/Canvas',
        'polygonjs/entities/Camera',
        'polygonjs/Renderer',
        'polygonjs/Mesh',
        'polygonjs/geom/Matrix3',
        'polygonjs/meshes/Icosahedron',
        'polygonjs/meshes/Cube',
        'polygonjs/meshes/Sphere',
        'polygonjs/format/object-file-format',
        'polygonjs/Engine'/*,
        'text!polygonjs/meshes/data/princeton/m100.off'*/
    ],
    function (
        lib,
        Surface,
        Camera,
        Renderer,
        Mesh,
        Matrix3,
        Icosahedron,
        Cube,
        Sphere,
        objectFileFormat,
        Engine,
        meshData
    ) {

        var surface = Surface.create({});
        var camera = Camera.create({
            zoom: 120,
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
            levelOfDetail: 2,
            spikiness: 0.1
        });

        var frame = 0;

        // var loop = function (delta) {

        //     var m1 = Matrix3.createRotationZ(delta * 0.001);
        //     var m2 = Matrix3.createRotationY(delta * 0.0005);
        //     var m3 = m1.multiply(m2);

        //     renderer.clear();
        //     frame++;
        //     var i = mesh.vertices.length;
        //     var vertex;
        //     while (--i >= 0) {
        //         vertex = mesh.vertices[i];
        //         mesh.vertices[i] = m3.multiplyPoint(vertex);
        //     }
        //     mesh.updateNormals();
        //     renderer.mesh(mesh);
        // };

        var loop = function (delta) {
            // scene.update();
            // renderer.drawScene();
        };

        var engine = Engine.create({
            onTick: loop
        });
        engine.start();

        window.setTimeout(function () {
            engine.stop();
        }, 10000);

        console.log('Vertices count: ' + mesh.vertices.length);
        console.log('Faces count: ' + mesh.faces.length);
    }
);