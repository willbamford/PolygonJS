require(
    [
        'polygonjs/lib',
        'polygonjs/surfaces/Canvas',
        'polygonjs/entities/OrthographicCamera',
        'polygonjs/entities/PerspectiveCamera',
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
        'polygonjs/geom/Vector3',
        'polygonjs/Profiler'
    ],
    function (
        lib,
        Surface,
        OrthographicCamera,
        PerspectiveCamera,
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
        Vector3,
        Profiler
    ) {

        var profiler = new Profiler();

        var cube = Model.createFromMesh(Cube.create());
        // var sphere = Model.createFromMesh(Sphere.create({
        //     levelOfDetail: 1
        // }));
        // sphere.position = Vector3.create(10, 0, 0);

        cube.tags = ['cube'];
        var surface = Surface.create({});
        var scene = Scene.create({});
        var camera = PerspectiveCamera.create({});

        var root = Entity.create();
        root.addChild(cube);
        // root.addChild(sphere);
        root.addChild(camera);
        scene.root = root;
        scene.revalidate();

        var renderer = Renderer.create({
            surface: surface,
            scene: scene
        });

        var eye = Vector3.create(5, 5, 5);
        var target = Vector3.create(0, 0, 0);
        
        var angle = 0.00;

        var engine = Engine.create({
            onTick: function (delta) {
                scene.update(delta);
                
                angle += delta / 1000;
                if (angle > 360) angle -= 360;

                profiler.measure();
                profiler.toConsole();

                cube.rotation = Matrix3.createRotationX(angle);

                camera.position = eye;
                camera.lookAt(target);

                renderer.draw(delta);
            }
        });
        engine.start();

        window.setTimeout(function () {
            engine.stop();
        }, 3000);
    }
);