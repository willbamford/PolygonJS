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
        'polygonjs/entities/Model',
        'polygonjs/geom/Vector3'
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
        Model,
        Vector3
    ) {
        var cube = Model.createFromMesh(Cube.create());
        cube.tags = ['cube'];
        var surface = Surface.create({});
        var scene = Scene.create({});
        var camera = Camera.create({});

        var root = Entity.create();
        root.addChild(cube);
        root.addChild(camera);
        scene.root = root;
        scene.revalidate();

        var renderer = Renderer.create({
            surface: surface,
            scene: scene
        });

        var eye = Vector3.create(5, 5, 5);
        var target = Vector3.create(0, 0, 0);
        
        var engine = Engine.create({
            onTick: function (delta) {
                scene.update(delta);
                
                camera.position = eye;
                camera.lookAt(target);
                renderer.draw(delta);
            }
        });
        engine.start();

        window.setTimeout(function () {
            engine.stop();
        }, 5000);
    }
);