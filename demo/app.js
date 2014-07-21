require(
    [
        'polygonjs/Fn',
        'polygonjs/surfaces/WebGLSurface',
        'polygonjs/cameras/OrthographicCamera',
        'polygonjs/cameras/PerspectiveCamera',
        'polygonjs/Scene',
        'polygonjs/Renderer',
        'polygonjs/Mesh',
        'polygonjs/math/Matrix3',
        'polygonjs/meshes/Icosahedron',
        'polygonjs/meshes/Cube',
        'polygonjs/meshes/Sphere',
        'polygonjs/formats/ObjectFileFormat',
        'polygonjs/Entity',
        'polygonjs/Engine',
        'polygonjs/entities/Model',
        'polygonjs/math/Vector3',
        'polygonjs/Profiler',
        'polygonjs/math/Color',
        'polygonjs/Material',
        'polygonjs/lights/Light'
    ],
    function (
        Fn,
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
        ObjectFileFormat,
        Entity,
        Engine,
        Model,
        Vector3,
        Profiler,
        Color,
        Material,
        Light
    ) {
        // var model = Model.createFromMesh(Cube.create());
        var model = Model.createFromMesh(Sphere.create({
            levelOfDetail: 4,
            spikiness: 0.0
        }));

        model.tags = ['sphere'];
        model.scale = Vector3.create(2, 2, 2);
        var surface = Surface.create({});
        var scene = Scene.create({});
        var camera = PerspectiveCamera.create({});
        var light = Light.create({
            forward: Vector3.create(1, 0, 0)
        });

        var root = Entity.create();
        root.addChild(model);
        root.addChild(camera);
        root.addChild(light);
        scene.root = root;
        scene.revalidate();

        scene.polygons.forEach(function (polygon) {
            polygon.material = Material.create({
                diffuse: Color.create().randomise()
            });
        });

        var renderer = Renderer.create({
            surface: surface,
            scene: scene
        });

        var eye = Vector3.create(5, 5, 5);
        var target = Vector3.create(0, 0, 0);
        
        var angle = 0.00;

        var profiler = Profiler.create({scene: scene});

        profiler.measure();
        profiler.toConsole();

        var engine = Engine.create({
            onTick: function (delta) {
                scene.update(delta);
                
                angle += delta / 10000;
                if (angle > 360) angle -= 360;

                // profiler.measure();
                // profiler.toConsole();

                model.rotation.setRotationY(angle);

                camera.position = eye;
                camera.lookAt(target);

                renderer.render(delta);
            }
        });
        engine.start();

        window.setTimeout(function () {
            engine.stop();
        }, 10000);
    }
);