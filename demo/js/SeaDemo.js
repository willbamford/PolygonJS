define(
    [
        'polygonjs/PolygonJS',
        'demo/js/SeaModel'
    ],
    function (P, SeaModel) {

        "use strict";

        var SeaDemo = function (containerId, opts) {

            opts = opts || {};

            var container = document.querySelector('#' + containerId);
            var surfaceElement = container.querySelector('.demo__surface');

            var seaModel = SeaModel.create();

            var sceneWidth = 640;
            var sceneHeight = 640;
            var aspectRatio = sceneWidth / sceneHeight;

            var surface = P.CanvasSurface.create({
                container: surfaceElement,
                width: sceneWidth,
                height: sceneHeight
            });

            var scene = P.Scene.create({});

            var cameraMode = opts.cameraMode || "orthographic";
            var camera;

            switch (cameraMode) {
                case "perspective":
                    camera = P.PerspectiveCamera.create({
                        aspectRatio: aspectRatio
                    });
                    break;
                case "orthographic":
                    camera = P.OrthographicCamera.create({
                        width: sceneWidth / 100,
                        height: sceneHeight / 100
                    });
                    break;
            }

            var greenLight = P.Light.create({
                color: P.Color.GREEN.clone(),
                intensity: 1,
                forward: P.Vector3.create(0, 1, 1).normalise()
            });

            var whiteLight = P.Light.create({
                color: P.Color.WHITE.clone(),
                intensity: 1,
                forward: P.Vector3.create(1, 1, 0).normalise()
            });

            var root = P.Entity.create();
            root.addChild(seaModel).addChild(camera);
            root.addChild(whiteLight);
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
                if (!engine.isRunning)
                    engine.start();
                else
                    engine.stop();
            });
        };

        SeaDemo.create = function (containerId) {
            return new SeaDemo(containerId);
        };

        return SeaDemo;
    }
);
