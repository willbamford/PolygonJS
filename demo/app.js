require(
    [
        'polygonjs/lib',
        'polygonjs/surfaces/Canvas',
        'polygonjs/entities/Camera',
        'polygonjs/Scene',
        'polygonjs/Renderer',
        'polygonjs/Mesh',
        'polygonjs/geom/Matrix3',
        'polygonjs/meshes/Icosahedron',
        'polygonjs/meshes/Cube',
        'polygonjs/meshes/Sphere',
        'polygonjs/format/object-file-format',
        'polygonjs/Engine',
        'polygonjs/entities/Polygons'
        /*'text!polygonjs/meshes/data/princeton/m100.off'*/
    ],
    function (
        lib,
        Surface,
        Camera,
        Scene,
        Renderer,
        Mesh,
        Matrix3,
        Icosahedron,
        Cube,
        Sphere,
        objectFileFormat,
        Engine,
        Polygons,
        meshData
    ) {

        var surface = Surface.create({});
        var scene = Scene.create();

        var entity = Polygons.createFromMesh(Sphere.create({
            levelOfDetail: 1,
            spikiness: 0
        }));
        scene.root = entity;
        scene.revalidate();

        console.dir(scene);

        var renderer = Renderer.create({
            surface: surface,
            scene: scene
        });

        var engine = Engine.create({
            onTick: function (delta) {
                scene.update(delta);
                renderer.draw(delta);
            }
        });
        engine.start();

        window.setTimeout(function () {
            engine.stop();
        }, 10000);

        // var mesh = Sphere.create({
        //     levelOfDetail: 2,
        //     spikiness: 0.1
        // });

        // var camera = Camera.create({
        //     zoom: 120,
        //     mode: Camera.ISOMETRIC
        // });

        // console.log('Vertices count: ' + mesh.vertices.length);
        // console.log('Faces count: ' + mesh.faces.length);

        // var mesh = objectFileFormat.loadMesh(meshData);
        // mesh.normalise();
        // renderer.mesh(mesh);

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

        // var renderer = Renderer.create({
        //     surface: surface,
        //     camera: camera
        // });
    }
);