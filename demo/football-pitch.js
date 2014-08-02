require(
    [
        'polygonjs/surfaces/WebGLSurface',
        'polygonjs/cameras/PerspectiveCamera',
        'polygonjs/Scene',
        'polygonjs/Renderer',
        'polygonjs/Mesh',
        'polygonjs/entities/Model',
        'polygonjs/math/Color',
        'polygonjs/Material',   
        'polygonjs/lights/Light',
        'polygonjs/Engine',
        'polygonjs/meshes/Sphere',
        'polygonjs/math/Vector3',
        'polygonjs/Entity',
        'polygonjs/Profiler',
        'demo/FootballPitchModel'
    ],
    function (
        Surface,
        PerspectiveCamera,
        Scene,
        Renderer,
        Mesh,
        Model,
        Color,
        Material,
        Light,
        Engine,
        Sphere,
        Vector3,
        Entity,
        Profiler,
        FootballPitchModel
    ) {

        "use strict";

        var ballModel = Model.createFromMesh(Sphere.create({
            levelOfDetail: 1,
            spikiness: 0.0
        }));

        var footballPitchModel = FootballPitchModel.create();
        // var footballPitchModel2 = FootballPitchModel.create();
        // var footballPitchModel3 = FootballPitchModel.create();
        // var footballPitchModel4 = FootballPitchModel.create();
        var surface = Surface.create({});
        var scene = Scene.create({});
        var camera = PerspectiveCamera.create({
            fieldOfViewY: 60,
            aspectRatio: (4 / 3),
            nearZ: 1,
            farZ: 1000
        });

        var whiteLight = Light.create({
            color: Color.create({r: 1, g: 1, b: 1}),
            forward: Vector3.create(0, 1, 0),
            intensity: 1
        });

        // footballPitchModel2.position.y -= 20;
        // footballPitchModel3.position.y -= 30;
        // footballPitchModel4.position.y -= 40;

        ballModel.position.y = 0.5;

        var root = Entity.create();
        // ballModel.scale = Vector3.create(2, 2, 2);
        root.addChild(footballPitchModel);
        root.addChild(ballModel);
        // root.addChild(footballPitchModel2);
        // root.addChild(footballPitchModel3);
        // root.addChild(footballPitchModel4);
        root.addChild(camera);
        root.addChild(whiteLight);

        scene.root = root;
        scene.revalidate();

        var renderer = Renderer.create({
            surface: surface,
            scene: scene
        });

        var eye = Vector3.create(0, 50, 80);
        var target = Vector3.create(0, 0, 0);
        
        var angle = 0.00;

        var profiler = Profiler.create({scene: scene});

        profiler.measure();
        profiler.toConsole();

        var onTick = function (delta) {
            scene.update(delta);
                
            angle += delta / 2000;
            if (angle > 360) angle -= 360;

            // var delta = 10;

            // profiler.measure().toConsole();

            var s = Math.sin(angle / Math.PI) + 2;
            // footballPitchModel.position.y += 1;
            footballPitchModel.rotation.setRotationY(Math.PI / 2);
            ballModel.position.x += delta / 300;
            // footballPitchModel2.rotation.setRotationY(angle / 2);
            // footballPitchModel3.rotation.setRotationY(angle / 3);
            // footballPitchModel4.rotation.setRotationY(angle / 4);
            // footballPitchModel.scale.setScalar(s);


            // eye.y = Math.max(50, eye.y - (eye.y / 100));
            // eye.z = Math.max(50, eye.z - (eye.z / 200));

            camera.position = eye;
            camera.lookAt(target); //ballModel.worldPosition);

            renderer.render(delta);
        };

        var engine = Engine.create({ onTick: onTick });
        engine.start();

        window.setTimeout(function () {
            engine.stop();
        }, 10000);
    }
);