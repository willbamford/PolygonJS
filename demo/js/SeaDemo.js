define(
    [
        'polygonjs/PolygonJS',
        'demo/js/SeaModel'
    ],
    function (P, SeaModel) {

        "use strict";

        var SeaDemo = function (containerId) {

            var container = document.querySelector('#' + containerId);
            var surfaceElement = container.querySelector('.demo__surface');

            var seaModel = SeaModel.create();
            var odd = false;
            P.Fn.each(seaModel.polygons, function (polygon) {
                polygon.material = P.Material.create({
                    emissive: null // odd ? P.Color.BLUE.clone() : P.Color.GREEN.clone()
                });
                odd = !odd;
            });

            var sceneWidth = 640;
            var sceneHeight = 640;
            var aspectRatio = sceneWidth / sceneHeight;

            var surface = P.WebGLSurface.create({
                container: surfaceElement,
                width: sceneWidth,
                height: sceneHeight
            });

            var scene = P.Scene.create({});
            // var camera = P.PerspectiveCamera.create({
            //     aspectRatio: aspectRatio
            // });
            var camera = P.OrthographicCamera.create({
                width: sceneWidth / 100,
                height: sceneHeight / 100
            });

            // var redLight = P.Light.create({
            //     color: P.Color.RED.clone(),
            //     forward: P.Vector3.create(0, 1, 0),
            //     intensity: 0.5
            // });

            var greenLight = P.Light.create({
                color: P.Color.GREEN.clone(),
                forward: P.Vector3.create(1, 0, 0)
            });

            var blueLight = P.Light.create({
                color: P.Color.BLUE.clone(),
                forward: P.Vector3.create(0, 0, 1)
            });

            var whiteLight = P.Light.create({
                color: P.Color.WHITE.clone(),
                intensity: 0.5,
                forward: P.Vector3.create(0, 1, 0)
            });

            var root = P.Entity.create();
            root.addChild(seaModel).addChild(camera);
            root.addChild(whiteLight);
            root.addChild(greenLight).addChild(blueLight);
            scene.root = root;
            scene.revalidate();

            var renderer = P.Renderer.create({
                surface: surface,
                scene: scene,
                showAxes: true
            });

            var eye = P.Vector3.create(3, 3, 3);
            var target = P.Vector3.create(0, 0, 0);
            var angle = 0;

            camera.position = eye;

            var frame = function (delta) {

                angle += delta / 1000;
                if (angle > 360) angle -= 360;

                seaModel.rotation.setRotationY(angle);

                camera.lookAt(target);
                scene.update(delta);
                renderer.render(delta);
            };

            scene.update(0);
            frame(0);

            var engine = P.Engine.create({
                onTick: function (delta) {
                    frame(delta);
                }
            });

            surface.container.addEventListener('click', function () {
                container.className = container.className + ' demo--playing';
                engine.start();
                window.setTimeout(function () {
                    engine.stop();
                }, 5000);
            });
        };

        SeaDemo.create = function (containerId) {
            return new SeaDemo(containerId);
        };

        return SeaDemo;
    }
);
