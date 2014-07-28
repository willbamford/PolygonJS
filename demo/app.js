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

        "use strict";

        // var model = Model.createFromMesh(Cube.create());
        var model = Model.createFromMesh(Sphere.create({
            levelOfDetail: 4,
            spikiness: 0.0
        }));

        // var model = Model.createFromMesh(Icosahedron.create());

        model.scale = Vector3.create(2, 2, 2);
        var surface = Surface.create({});
        var scene = Scene.create({});
        var camera = PerspectiveCamera.create({});

        var whiteLight = Light.create({
            color: Color.create({r: 1, g: 1, b: 1}),
            forward: Vector3.create(1, 0, 0),
            intensity: 1
        });

        /*
        var redLight = Light.create({
            color: Color.RED.clone(),
            forward: Vector3.create(1, 0, 0)
        });

        var greenLight = Light.create({
            color: Color.GREEN.clone(),
            forward: Vector3.create(0, 1, 0)
        });

        var blueLight = Light.create({
            color: Color.BLUE.clone(),
            forward: Vector3.create(0, 0, 1)
        });
        */

        var root = Entity.create();
        root.addChild(model);
        root.addChild(camera);
        root.addChild(whiteLight);
        scene.root = root;
        scene.revalidate();

        scene.polygons.forEach(function (polygon) {
            polygon.material = Material.create({
                color: Color.GREEN.clone(), //.randomise()
                emissive: Color.create({r: 0.0, g: 0.0, b: 0})
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
                
                angle += delta / 2000;
                if (angle > 360) angle -= 360;

                // profiler.measure();
                // profiler.toConsole();

                var s = Math.sin(angle / Math.PI) + 2;

                // redLight.color.b = Math.sin(angle * 30);

                model.rotation.setRotationY(angle);
                model.scale.setScalar(s);

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