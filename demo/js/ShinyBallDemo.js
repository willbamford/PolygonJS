define(
    ['polygonjs/PolygonJS'],
    function (P) {

        "use strict";

        var ShinyBallDemo = function (containerId) {

            var container = document.querySelector('#' + containerId);
            var surfaceElement = container.querySelector('.demo__surface');

            var mesh = P.Sphere.create({
                levelOfDetail: 3,
                spikiness: 0.0
            });
            var model = P.Model.createFromMesh(mesh);
            P.Fn.each(model.polygons, function (polygon) {
                polygon.material = P.Material.create({
                    specular: P.Color.create({r: 1, g: 1, b: 1}),
                    shininess: 10
                });
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
            var camera = P.PerspectiveCamera.create({
                aspectRatio: aspectRatio
            });

            var redLight = P.Light.create({
                color: P.Color.RED.clone(),
                specular: P.Color.create({r: 0.7, g: 0.7, b: 0.7}),
                forward: P.Vector3.create(0, 1, 0)
            });

            var greenLight = P.Light.create({
                color: P.Color.GREEN.clone(),
                specular: P.Color.create({r: 0.7, g: 0.7, b: 0.7}),
                forward: P.Vector3.create(1, 0, 0)
            });

            var blueLight = P.Light.create({
                color: P.Color.BLUE.clone(),
                specular: P.Color.create({r: 0.7, g: 0.7, b: 0.7}),
                forward: P.Vector3.create(0, 0, 1)
            });

            var root = P.Entity.create();
            root.addChild(model).addChild(camera);
            root.addChild(redLight).addChild(greenLight).addChild(blueLight);
            scene.root = root;
            scene.revalidate();

            var renderer = P.Renderer.create({
                surface: surface,
                scene: scene
            });

            var eye = P.Vector3.create(5, 5, 5);
            var target = P.Vector3.create(0, 0, 0);
            var angle = 0;
            var scale = 4;
            model.scale.setScalar(scale);

            camera.position = eye;

            var frame = function (delta) {

                angle += delta / 1000;
                if (angle > 360) angle -= 360;

                // scale = Math.max(1, scale - 0.0005 * delta);

                model.rotation.setRotationY(angle);
                // model.scale.setScalar(scale);

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

        ShinyBallDemo.create = function (containerId) {
            return new ShinyBallDemo(containerId);
        };

        return ShinyBallDemo;
    }
);
