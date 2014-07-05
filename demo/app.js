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
        'polygonjs/Entity',
        'polygonjs/Engine',
        'polygonjs/entities/Polygons',
        'polygonjs/geom/Vector3'
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
        Entity,
        Engine,
        Polygons,
        Vector3,
        meshData
    ) {

        var surface = Surface.create({});
        var scene = Scene.create();

        var root = Entity.create();
        var camera = Camera.create();
        root.addChild(camera);

        // Sun
        var theSun = Polygons.createFromMesh(Sphere.create({
            levelOfDetail: 1,
            spikiness: 0
        }));
        theSun.scale = Vector3.create(2, 2, 2);
        root.addChild(theSun);

        // Earth
        var theEarth = Polygons.createFromMesh(Sphere.create({
            levelOfDetail: 1,
            spikiness: 0
        }));
        theEarth.position.x = 8;
        root.addChild(theEarth);

        // Moon
        var theMoon = Polygons.createFromMesh(Sphere.create({
            levelOfDetail: 1,
            spikiness: 0
        }));
        theMoon.position.y = 4;
        theEarth.addChild(theMoon);

        scene.root = root;
        scene.revalidate();

        var renderer = Renderer.create({
            surface: surface,
            scene: scene
        });

        var rotation = 0;

        var engine = Engine.create({
            onTick: function (delta) {

                rotation += delta;

                var m1 = Matrix3.createRotationZ(rotation * 0.001);
                var m2 = Matrix3.createRotationY(rotation * 0.0005);
                var m3 = m1.multiply(m2);

                // scene.root.rotation = m3;

                theEarth.rotation = m1;
                theMoon.rotation = m2;

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